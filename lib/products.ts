export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  period?: 'one-time' | 'monthly'
  currency: 'USD' | 'EUR'
}

// USD Products
export const PRODUCTS_USD: Product[] = [
  {
    id: 'resume-ai-basic-usd',
    name: 'Basic Plan',
    description: 'One-time purchase - Create and download 1 CV',
    priceInCents: 199, // $1.99
    period: 'one-time',
    currency: 'USD',
  },
  {
    id: 'resume-ai-pro-usd',
    name: 'Pro Plan',
    description: 'One-time purchase - Create and download 5 CVs',
    priceInCents: 259, // $2.59
    period: 'one-time',
    currency: 'USD',
  },
  {
    id: 'resume-ai-monthly-usd',
    name: 'Monthly Subscription',
    description: 'Unlimited CVs, templates, and AI features',
    priceInCents: 1399, // $13.99
    period: 'monthly',
    currency: 'USD',
  },
]

// EUR Products
export const PRODUCTS_EUR: Product[] = [
  {
    id: 'resume-ai-basic-eur',
    name: 'Basic Plan',
    description: 'One-time purchase - Create and download 1 CV',
    priceInCents: 199, // €1.99
    period: 'one-time',
    currency: 'EUR',
  },
  {
    id: 'resume-ai-pro-eur',
    name: 'Pro Plan',
    description: 'One-time purchase - Create and download 5 CVs',
    priceInCents: 259, // €2.59
    period: 'one-time',
    currency: 'EUR',
  },
  {
    id: 'resume-ai-monthly-eur',
    name: 'Monthly Subscription',
    description: 'Unlimited CVs, templates, and AI features',
    priceInCents: 999, // €9.99
    period: 'monthly',
    currency: 'EUR',
  },
]

export const PRODUCTS = [...PRODUCTS_USD, ...PRODUCTS_EUR]
