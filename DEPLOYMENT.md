# Deployment Guide

## Prerequisites

- GitHub account
- Vercel account
- Supabase account
- Stripe account
- Resend account
- Vercel Blob token

## Step 1: Prepare for Deployment

### Local Testing
```bash
# Install dependencies
pnpm install

# Create .env.local with all required variables
cp .env.example .env.local

# Start development server
pnpm dev

# Test all features locally
```

### Git Setup
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: ResumeAI CV Builder"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/resumeai.git
git branch -M main
git push -u origin main
```

## Step 2: Set Up Supabase

1. Go to [Supabase Dashboard](https://supabase.com)
2. Create new project or use existing
3. Note your:
   - Project URL: `NEXT_PUBLIC_SUPABASE_URL`
   - Anon Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Database Setup (Already Done)
The migration scripts have created:
- `profiles` table
- `resumes` table
- `payments` table

With Row Level Security (RLS) enabled.

## Step 3: Configure Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Get your:
   - Publishable Key: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret Key: `STRIPE_SECRET_KEY`
3. Create webhook for: `https://yourdomain.com/api/webhooks/stripe`
4. Get webhook signing secret: `STRIPE_WEBHOOK_SECRET`

### Stripe Products
Create products in Stripe:
- Basic ($1.99 or €1.99)
- Pro ($2.59 or €2.59)
- Monthly ($13.99 or €9.99)

## Step 4: Set Up Resend

1. Go to [Resend](https://resend.com)
2. Create account and verify domain
3. Get API Key: `RESEND_API_KEY`

### Update Email Settings
In `lib/email.ts`, update sender email:
```typescript
from: 'ResumeAI <noreply@yourdomain.com>'
```

## Step 5: Configure Vercel

### Connect GitHub Repository
1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Choose "Next.js" framework

### Add Environment Variables
In Vercel Project Settings → Environment Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key
STRIPE_SECRET_KEY=your_key
STRIPE_WEBHOOK_SECRET=your_secret
BLOB_READ_WRITE_TOKEN=your_token
RESEND_API_KEY=your_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://yourdomain.com/protected
```

### Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Visit your new site

## Step 6: Post-Deployment Configuration

### Update Stripe Webhook
1. Go to Stripe Dashboard → Webhooks
2. Update webhook URL to your Vercel domain:
   ```
   https://yourdomain.vercel.app/api/webhooks/stripe
   ```
3. Add events: `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.deleted`

### Update Supabase Redirect URL
In Supabase → Authentication → URL Configuration:
```
Redirect URLs: https://yourdomain.vercel.app/protected
```

### Test Payment Flow
1. Use Stripe test card: `4242 4242 4242 4242`
2. Complete a test checkout
3. Verify payment is recorded in database
4. Check email receipt was sent

### Verify Email Setup
1. Create new account
2. Check inbox for welcome email
3. Verify email verification link works

## Step 7: Custom Domain (Optional)

1. In Vercel → Project Settings → Domains
2. Add custom domain
3. Follow DNS configuration instructions
4. Update Supabase and Stripe URLs if using custom domain

## Monitoring & Maintenance

### Daily
- Monitor Stripe dashboard for failed payments
- Check Resend email delivery stats
- Monitor Vercel analytics

### Weekly
- Review database backups
- Check error logs
- Monitor application performance

### Monthly
- Review payment records
- Audit database size
- Check security logs

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
vercel rebuild
```

### Deployment Issues
- Check Vercel logs: `vercel logs`
- Verify all env variables are set
- Check GitHub connection status

### Runtime Errors
- Check Vercel function logs
- Review error tracking (if enabled)
- Check Supabase logs

### Payment Issues
- Verify Stripe webhook is receiving events
- Check webhook signing secret
- Review Stripe API logs

## Rollback

If issues occur after deployment:

1. Vercel automatically keeps previous deployments
2. Go to Vercel Dashboard → Deployments
3. Click "..."  on previous working version
4. Select "Promote to Production"

## SSL/Security

- Vercel provides free SSL certificate
- Auto-renewal enabled
- HTTPS enforced in production

## Performance Optimization

### Enable Caching
The app uses Next.js caching strategies:
- Static pages cached at edge
- API responses cached where safe
- Images optimized automatically

### Monitor Performance
In Vercel Analytics:
- View Core Web Vitals
- Monitor response times
- Check deployment status

## Scaling

The app is built to scale:
- Database: Supabase auto-scales
- Storage: Vercel Blob handles any size
- Email: Resend scales automatically
- API: Vercel functions scale on demand

## Cost Estimation

**Monthly costs (rough estimates):**
- Supabase: $0-100 (based on usage)
- Stripe: 2.9% + $0.30 per transaction
- Vercel: $20/month Pro or usage-based
- Resend: ~$20 for email volume
- Vercel Blob: $0.15 per GB stored

Total: $50-200/month depending on usage

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Configure all services
3. ✅ Test payment flow
4. ✅ Verify email delivery
5. ✅ Monitor performance
6. ✅ Set up custom domain
7. ✅ Launch!

## Support & Resources

- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)

## Maintenance Checklist

- [ ] Database backups enabled
- [ ] Error tracking configured
- [ ] Analytics enabled
- [ ] SSL certificate auto-renewal
- [ ] API rate limiting enabled
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Sensitive data protected

---

Happy deploying! Your ResumeAI app is ready to launch.
