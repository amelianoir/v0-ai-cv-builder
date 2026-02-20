'use server'

import { stripe } from '../../lib/stripe'
import { PRODUCTS_USD, PRODUCTS_EUR } from '../../lib/products'
import { createClient } from '@/lib/supabase/server'

export async function startCheckoutSession(productId: string) {
  const allProducts = [...PRODUCTS_USD, ...PRODUCTS_EUR]
  const product = allProducts.find((p) => p.id === productId)
  
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  // Get authenticated user
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  // Determine currency from product ID
  const currency = productId.includes('eur') ? 'eur' : 'usd'
  const mode = product.period === 'monthly' ? 'subscription' : 'payment'

  // Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    client_reference_id: user.id,
    ui_mode: 'embedded',
    redirect_on_completion: 'always',
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://cvdesign.online'}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    line_items: [
      {
        price_data: {
          currency: currency,
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
          recurring: product.period === 'monthly' ? { interval: 'month' } : undefined,
        },
        quantity: 1,
      },
    ],
    mode: mode,
    metadata: {
      product_id: productId,
      user_id: user.id,
    },
  })

  return session.client_secret
}

export async function getCheckoutSessionStatus(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  return {
    status: session.payment_status,
    customer: session.customer_email,
    amount_total: session.amount_total,
    currency: session.currency,
  }
}
