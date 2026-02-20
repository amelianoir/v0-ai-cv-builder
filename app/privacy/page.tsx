'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/30">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-primary hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mt-2">Last updated: January 2025</p>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground">
              ResumeAI ("we", "our", "us", or "Company") operates the ResumeAI website and mobile application. This Privacy Policy explains our practices regarding the collection, use, and disclosure of your personal information through our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">2.1 Account Information</h3>
                <p className="text-muted-foreground">
                  When you create an account, we collect your email address and password. You may also provide additional profile information like your name.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">2.2 Resume Content</h3>
                <p className="text-muted-foreground">
                  We store all content you create in your resume(s), including personal information, work experience, education, skills, and achievements.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">2.3 Photos and Files</h3>
                <p className="text-muted-foreground">
                  When you upload a profile photo or attach files, we store them securely on our servers.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">2.4 Payment Information</h3>
                <p className="text-muted-foreground">
                  Payment processing is handled by Stripe. We do not store full credit card numbers, but we may store transaction history.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">2.5 Usage Data</h3>
                <p className="text-muted-foreground">
                  We collect information about how you use ResumeAI, including pages visited, time spent, and interactions with features.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>To provide and maintain our service</li>
              <li>To process payments and send receipts</li>
              <li>To send you service-related announcements</li>
              <li>To respond to your inquiries and support requests</li>
              <li>To improve our service and develop new features</li>
              <li>To detect and prevent fraud and abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement industry-standard security measures to protect your personal information. Your data is encrypted in transit and at rest. However, no security system is impenetrable, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your personal data while your account is active and for a reasonable period afterward to comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>Under GDPR and similar regulations, you have the right to:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Restrict processing of your data</li>
                <li>Port your data to another service</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at privacy@resumeai.com.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Third-Party Services</h2>
            <p className="text-muted-foreground mb-3">
              We use the following third-party services:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li><strong>Supabase:</strong> For authentication and data storage</li>
              <li><strong>Stripe:</strong> For payment processing</li>
              <li><strong>Vercel Blob:</strong> For file storage</li>
              <li><strong>Resend:</strong> For email communications</li>
              <li><strong>OpenAI:</strong> For AI-powered content suggestions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Cookies and Tracking</h2>
            <p className="text-muted-foreground">
              We use cookies and similar tracking technologies to enhance your experience, remember preferences, and analyze usage patterns. You can control cookie settings through your browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-muted-foreground mt-2">
              Email: privacy@resumeai.com<br />
              Address: Available upon request
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
