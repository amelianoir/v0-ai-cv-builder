'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/30">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold">Refund Policy</h1>
          <p className="text-sm text-muted-foreground mt-2">Last updated: January 2025</p>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Refund Eligibility</h2>
            <p className="text-muted-foreground">
              We offer a 30-day refund guarantee for one-time purchases (Basic and Pro plans). Subscription payments are processed monthly and are non-refundable, but you may cancel your subscription at any time, and you will not be charged for the next billing cycle.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. One-Time Purchase Refunds</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Eligibility Criteria:</h3>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Refund request must be made within 30 days of purchase</li>
                  <li>You must not have created more than 2 resumes</li>
                  <li>The payment method used must be verifiable</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Non-Refundable Situations:</h3>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Refund requests made more than 30 days after purchase</li>
                  <li>If you have created multiple resumes and exported them</li>
                  <li>If the purchase was disputed without contacting us first</li>
                  <li>Duplicate purchases (we will refund the duplicate only)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Subscription Refunds</h2>
            <p className="text-muted-foreground mb-3">
              Monthly subscription payments are non-refundable. However, you have the following options:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>Cancel your subscription anytime to stop future charges</li>
              <li>Contact us within 7 days of billing if you were charged in error</li>
              <li>Request a prorated refund if billing occurred due to a technical error</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. How to Request a Refund</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>To request a refund, please contact us with the following information:</p>
              <div className="bg-card/50 p-4 rounded">
                <p>Email: support@resumeai.com</p>
                <p>Subject: "Refund Request"</p>
                <p className="mt-3">Include in your email:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Your account email address</li>
                  <li>Transaction ID (if available)</li>
                  <li>Date of purchase</li>
                  <li>Reason for requesting a refund</li>
                </ul>
              </div>
              <p>
                We will review your request and respond within 5-7 business days. If approved, the refund will be processed within 5-10 business days to your original payment method.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Refund Processing Time</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>After approval:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li><strong>Stripe Refunds:</strong> 5-10 business days</li>
                <li><strong>Bank Transfers:</strong> 5-15 business days depending on your bank</li>
                <li><strong>Credit/Debit Cards:</strong> Typically 3-5 business days</li>
              </ul>
              <p className="mt-3">
                Note: Processing times may vary depending on your financial institution.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Cancelling Your Subscription</h2>
            <p className="text-muted-foreground mb-3">
              To cancel your monthly subscription:
            </p>
            <ol className="space-y-2 text-muted-foreground list-decimal list-inside">
              <li>Log in to your ResumeAI account</li>
              <li>Navigate to Account Settings → Billing</li>
              <li>Click "Cancel Subscription"</li>
              <li>Confirm the cancellation</li>
            </ol>
            <p className="mt-3 text-muted-foreground">
              You will retain access to all features until the end of your current billing cycle.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Contacting Support</h2>
            <p className="text-muted-foreground">
              If you have questions about refunds or need assistance, please contact us:
            </p>
            <p className="text-muted-foreground mt-2">
              Email: support@resumeai.com<br />
              Response Time: Within 24-48 hours on business days
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting to our website. Your continued use of ResumeAI following the posting of revised terms means that you accept and agree to the changes.
            </p>
          </section>
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
