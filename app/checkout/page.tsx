'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Checkout } from '@/components/checkout'
import { PRODUCTS_USD, PRODUCTS_EUR } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD')
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const plan = searchParams.get('plan') || 'basic'
    const curr = (searchParams.get('currency') || 'USD').toUpperCase() as 'USD' | 'EUR'

    setSelectedPlan(plan)
    setCurrency(curr)
    setLoading(false)
  }, [searchParams])

  const products = currency === 'USD' ? PRODUCTS_USD : PRODUCTS_EUR

  // Find the product based on selected plan
  const planMap: Record<string, { usd: string; eur: string }> = {
    basic: { usd: 'resume-ai-basic-usd', eur: 'resume-ai-basic-eur' },
    pro: { usd: 'resume-ai-pro-usd', eur: 'resume-ai-pro-eur' },
    monthly: { usd: 'resume-ai-monthly-usd', eur: 'resume-ai-monthly-eur' },
  }

  const productId = planMap[selectedPlan]?.[currency.toLowerCase() as 'usd' | 'eur']
  const product = products.find((p) => p.id === productId)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Plan</h1>
          <Button asChild>
            <Link href="/#pricing">Go Back to Pricing</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button variant="ghost" asChild>
            <Link href="/#pricing">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Pricing
            </Link>
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <h1 className="text-3xl font-bold mb-8">Order Summary</h1>
            <div className="bg-card rounded-lg border border-border p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${(product.priceInCents / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-border pt-4">
                  <span>Total</span>
                  <span>${(product.priceInCents / 100).toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-sm">✓</span>
                  What's Included
                </h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {product.id.includes('basic') && (
                    <>
                      <li>✓ Create 1 CV</li>
                      <li>✓ All 6 templates</li>
                      <li>✓ PDF export</li>
                      <li>✓ Photo upload</li>
                    </>
                  )}
                  {product.id.includes('pro') && (
                    <>
                      <li>✓ Create 5 CVs</li>
                      <li>✓ All 6 templates</li>
                      <li>✓ PDF export</li>
                      <li>✓ Photo upload</li>
                      <li>✓ Unlimited edits</li>
                    </>
                  )}
                  {product.id.includes('monthly') && (
                    <>
                      <li>✓ Unlimited CVs</li>
                      <li>✓ All 6 templates</li>
                      <li>✓ PDF export</li>
                      <li>✓ Photo upload</li>
                      <li>✓ AI features</li>
                      <li>✓ Priority support</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="bg-destructive/10 border border-destructive/20 rounded p-4">
                <h3 className="font-semibold mb-2 text-sm">Money-Back Guarantee</h3>
                <p className="text-xs text-muted-foreground">
                  Not satisfied? Get a full refund within 30 days. No questions asked.
                </p>
              </div>

              {/* Currency Selector */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Currency</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`flex-1 py-2 px-4 rounded border transition ${
                      currency === 'USD'
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    USD ($)
                  </button>
                  <button
                    onClick={() => setCurrency('EUR')}
                    className={`flex-1 py-2 px-4 rounded border transition ${
                      currency === 'EUR'
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    EUR (€)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div>
            <h2 className="text-lg font-semibold mb-6">Complete Your Purchase</h2>
            {product && <Checkout productId={product.id} />}
          </div>
        </div>
      </div>
    </div>
  )
}
