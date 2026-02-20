# ResumeAI Setup Guide

## Environment Variables Setup

### Required Variables

Create a `.env.local` file in the project root with these variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...

# OpenAI (already provided)
OPENAI_API_KEY=sk-proj-...

# Google Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Base URL
NEXT_PUBLIC_BASE_URL=https://resumeai.app
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/sign-up-success

# Vercel Blob
BLOB_READ_WRITE_TOKEN=your_blob_token
```

## Setting Up Google Analytics

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property for "ResumeAI"
3. Get your Measurement ID (format: G-XXXXXXXXXX)
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
   ```

## Deployment Steps

### 1. Connect to GitHub
```bash
git init
git add .
git commit -m "Initial ResumeAI commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Configure environment variables:
   - Add all variables from `.env.local`
   - Never commit `.env.local` to git

### 3. Configure Integrations

**Supabase:**
- Go to Project Settings → API
- Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Stripe:**
- Create account at [stripe.com](https://stripe.com)
- Go to Developers → API Keys
- Copy Publishable Key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Copy Secret Key → `STRIPE_SECRET_KEY`

**Vercel Blob:**
- Already integrated through Vercel dashboard
- Copy token → `BLOB_READ_WRITE_TOKEN`

### 4. Set Up Stripe Webhooks

1. In Stripe Dashboard, go to Webhooks
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `invoice.payment_succeeded`
5. Copy Signing Secret → `STRIPE_WEBHOOK_SECRET`

### 5. Setup Resend (Email)

1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Add to Vercel:
   ```
   RESEND_API_KEY=re_...
   ```

## Pre-Launch Checklist

- [ ] All environment variables set in Vercel
- [ ] Database migrations executed
- [ ] Google Analytics property created
- [ ] Stripe webhook configured
- [ ] Domain set up and SSL certificate
- [ ] SEO meta tags verified (check in browser DevTools)
- [ ] robots.txt accessible at `/robots.txt`
- [ ] sitemap.xml accessible at `/sitemap.xml`
- [ ] Test payment flow with Stripe test keys
- [ ] Test CV import with sample file
- [ ] Test email sending (if available)

## Local Development

```bash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your values

# Run dev server
pnpm dev

# Open http://localhost:3000
```

## Monitoring & Analytics

- **Vercel Analytics**: Built-in, shows performance metrics
- **Google Analytics**: Track user behavior, conversions
- **Stripe Dashboard**: Monitor payments and subscriptions

## Support

For issues or questions:
- Email: support@resumeai.com
- Documentation: See README.md
- Issues: GitHub Issues

## Important Security Notes

1. Never commit `.env.local` to git
2. Use different Stripe keys for test and production
3. Rotate API keys regularly
4. Enable 2FA on all service dashboards
5. Monitor Stripe webhooks for errors
