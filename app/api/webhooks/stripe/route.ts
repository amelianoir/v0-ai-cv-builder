import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  try {
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    const supabase = await createClient()

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Record payment in database
        if (session.customer_email) {
          await supabase.from('payments').insert({
            stripe_session_id: session.id,
            email: session.customer_email,
            amount: session.amount_total,
            currency: session.currency,
            status: 'completed',
            product_id: session.metadata?.product_id || null,
            metadata: session.metadata,
          })
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice

        if (invoice.customer_email) {
          await supabase.from('payments').insert({
            stripe_invoice_id: invoice.id,
            email: invoice.customer_email,
            amount: invoice.amount_paid,
            currency: invoice.currency,
            status: 'completed',
            metadata: invoice.metadata,
          })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        if (subscription.customer_email) {
          // Update user subscription status
          const { data: profiles } = await supabase
            .from('profiles')
            .select('user_id')
            .eq('email', subscription.customer_email)

          if (profiles && profiles.length > 0) {
            await supabase
              .from('profiles')
              .update({
                subscription_status: 'cancelled',
                subscription_id: null,
              })
              .eq('user_id', profiles[0].user_id)
          }
        }
        break
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 400 })
  }
}
