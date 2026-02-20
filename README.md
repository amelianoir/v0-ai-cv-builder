# ResumeAI - AI-Powered CV Builder

A modern, full-stack resume/CV builder application built with Next.js, Supabase, Stripe, and AI capabilities. Create professional resumes in minutes with AI-powered content suggestions, beautiful templates, and instant PDF export.

## Features

- **6 Professional Templates**: Choose from Classic, Modern, Minimal, Executive, Tech-Focused, and Creative designs
- **AI-Powered Content Generation**: Get smart suggestions for job descriptions, summaries, and skills using GPT-4o
- **Photo Upload**: Upload and manage profile photos securely with Vercel Blob
- **PDF Export**: Export your resume as a beautifully formatted PDF using browser print
- **Multi-Language Support**: Create resumes in English, Spanish, and German
- **Secure Authentication**: Supabase authentication with email verification
- **Flexible Pricing**: 
  - Basic: $1.99 (1 CV)
  - Pro: $2.59 (5 CVs)
  - Monthly: $13.99/month (Unlimited)
- **Dark Theme**: Premium dark design with vibrant purple/blue accent colors
- **GDPR Compliant**: Privacy policy, terms of service, and refund policy included
- **Email Notifications**: Welcome, receipts, and confirmation emails via Resend

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19.2** - Latest React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS
- **shadcn/ui** - High-quality React components
- **Lucide React** - Modern icon library
- **Sonner** - Beautiful toast notifications

### Backend & APIs
- **Supabase** - PostgreSQL database, authentication, real-time features
- **Vercel AI SDK 6** - AI text generation with OpenAI
- **Stripe** - Payment processing
- **Vercel Blob** - File storage for photos
- **Resend** - Email service

### Infrastructure
- **Vercel** - Hosting and deployment
- **Middleware** - Session management and authentication

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm/pnpm/yarn
- Accounts for: Supabase, Stripe, Vercel Blob, Resend, OpenAI (via Vercel AI Gateway)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/resumeai.git
cd resumeai
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Fill in the `.env.local` file with your credentials:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Vercel Blob
BLOB_READ_WRITE_TOKEN=your_blob_token

# Resend
RESEND_API_KEY=your_resend_api_key
```

4. **Set up the database**

The database migrations have already been executed in Supabase, which create:
- `profiles` - User profile data with subscription information
- `resumes` - User resumes/CVs
- `payments` - Transaction history

5. **Run the development server**
```bash
pnpm dev
```

Visit `http://localhost:3000` to see your app!

## Project Structure

```
/app
  /auth              - Authentication pages (login, signup, errors)
  /checkout          - Stripe checkout page
  /dashboard         - Protected user dashboard
    /resume          - Resume editor
    /settings        - User settings
  /api
    /ai/generate     - AI content generation endpoint
    /upload          - Photo upload endpoint
    /webhooks/stripe - Stripe webhook handler
  /(marketing)       - Public pages (home, privacy, terms, refund)
  layout.tsx         - Root layout with theme provider
  page.tsx           - Homepage

/lib
  /supabase          - Supabase client setup
  stripe.ts          - Stripe configuration
  products.ts        - Product catalog (pricing)
  email.ts           - Email service (Resend)
  i18n.ts            - Internationalization utilities
  utils.ts           - Common utilities

/components
  /ui                - shadcn/ui components
  checkout.tsx       - Stripe checkout form

/middleware.ts       - Request authentication & routing
/scripts             - Database migration scripts
```

## Database Schema

### Profiles Table
```sql
- id (UUID, PK, references auth.users)
- first_name (TEXT)
- last_name (TEXT)
- email (TEXT)
- subscription_status (TEXT: active, cancelled, expired)
- subscription_id (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Resumes Table
```sql
- id (UUID, PK)
- user_id (UUID, FK → profiles)
- title (TEXT)
- template (TEXT: classic, modern, minimal, executive, tech-focused, creative)
- content (JSONB)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Payments Table
```sql
- id (UUID, PK)
- stripe_session_id (TEXT)
- stripe_invoice_id (TEXT)
- email (TEXT)
- amount (INTEGER, in cents)
- currency (TEXT: USD, EUR)
- status (TEXT: completed, pending, failed)
- product_id (TEXT)
- metadata (JSONB)
- created_at (TIMESTAMP)
```

## API Routes

### Photo Upload
- `POST /api/upload` - Upload profile photo to Vercel Blob
- `DELETE /api/upload` - Delete uploaded photo

### AI Generation
- `POST /api/ai/generate` - Generate content (summary, experience, skills)

### Stripe Webhooks
- `POST /api/webhooks/stripe` - Handle payment events

## Authentication Flow

1. User signs up with email/password
2. Supabase sends confirmation email
3. User verifies email and gains access
4. JWT token stored securely in httpOnly cookie
5. Middleware validates token on protected routes

## Payment Flow

1. User selects plan on pricing section
2. Redirected to checkout page
3. Stripe embedded checkout form
4. Payment processed securely
5. Stripe webhook confirms payment
6. Payment recorded in database
7. Receipt email sent to user
8. Access granted to purchased features

## Multi-Language Support

The app supports:
- **English (en)** - Default
- **Spanish (es)** - Full translation
- **German (de)** - Full translation

Language is detected from:
1. User's browser locale
2. localStorage preference
3. Defaults to English

Users can generate resumes in any language regardless of their UI language.

## Resume Templates

All templates include:
- Professional header with contact info
- Customizable sections (summary, experience, education, skills)
- Photo upload capability
- Real-time preview
- Print-to-PDF export

Templates designed to:
- Pass ATS (Applicant Tracking Systems)
- Look professional in any industry
- Fit standard paper sizes
- Print correctly

## PDF Export

To export as PDF:
1. Click "Download" button in resume editor
2. Browser print dialog opens
3. Select "Save as PDF"
4. Download formatted resume

Alternative: Use browser's built-in print preview for manual adjustment.

## Email Notifications

### Welcome Email
Sent when user signs up with account confirmation link

### Verification Email
Sent during signup for email verification

### Receipt Email
Sent after successful payment with plan details

### Transactional Emails
- Password reset
- Subscription updates
- Account changes

## Environment Variables

See `.env.example` for all required environment variables.

### Required for Production
- All Supabase credentials
- Stripe keys (test and live)
- Resend API key
- Vercel Blob token
- Webhook secret for Stripe

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# ... etc for all env vars
vercel
```

### Database & Services

- **Database**: Supabase (automatically synced)
- **Auth**: Supabase Auth (managed)
- **Storage**: Vercel Blob (serverless)
- **Payments**: Stripe (PCI compliant)
- **Email**: Resend (managed)

## Security Considerations

- Row Level Security (RLS) enabled on all tables
- Passwords hashed with bcrypt
- JWT tokens in httpOnly cookies
- CSRF protection
- SQL injection prevention (parameterized queries)
- Input validation and sanitization
- HTTPS only in production
- GDPR compliant data handling

## Performance Optimizations

- Next.js 16 with Turbopack
- React Compiler support
- Optimized images with next/image
- Code splitting and lazy loading
- Caching strategies
- Edge middleware for fast auth checks

## Troubleshooting

### "Unauthorized" error
- Check if logged in
- Verify Supabase credentials
- Check RLS policies

### Payment fails
- Verify Stripe keys are correct
- Check webhook configuration
- Review Stripe dashboard for errors

### Email not sending
- Verify Resend API key
- Check email domain verification
- Review Resend dashboard

### Photo upload issues
- File size must be < 5MB
- Only image files allowed
- Check Blob storage token

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

- **Email**: support@resumeai.com
- **Issues**: GitHub Issues
- **Docs**: Check the docs folder

## Roadmap

- [ ] Video tutorials
- [ ] Template customization
- [ ] Cover letter builder
- [ ] LinkedIn sync
- [ ] Job application tracker
- [ ] Collaboration features
- [ ] Mobile app

## Changelog

### v1.0.0 (Initial Release)
- Core functionality complete
- 6 templates
- AI content generation
- Payment processing
- Multi-language support
- Legal pages and policies

---

Built with care for professionals. Made with Next.js, Supabase, and Stripe.
