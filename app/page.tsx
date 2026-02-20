'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Sparkles, FileText, Lock, Zap, Globe, ArrowRight } from 'lucide-react'
import { TemplateCarousel } from '@/components/template-carousel'
import { Testimonials } from '@/components/testimonials'

const templates = [
  {
    id: 'classic',
    title: 'Classic',
    description: 'Timeless and professional. Perfect for traditional industries.',
  },
  {
    id: 'modern',
    title: 'Modern',
    description: 'Contemporary design with clean lines and modern aesthetics.',
  },
  {
    id: 'minimal',
    title: 'Minimal',
    description: 'Stripped down to essentials. Let your content shine.',
  },
  {
    id: 'executive',
    title: 'Executive',
    description: 'Premium design for senior and C-level positions.',
  },
  {
    id: 'tech',
    title: 'Tech-Focused',
    description: 'Modern design ideal for tech and creative roles.',
  },
  {
    id: 'creative',
    title: 'Creative',
    description: 'Bold and vibrant for creative professionals.',
  },
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'Tech Startup',
    content: 'ResumeAI saved me hours. The AI suggestions were spot-on and helped me highlight my achievements better.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    company: 'Fortune 500',
    content: 'Finally, a resume builder that understands technical skills. Got interviews within a week.',
    rating: 5,
  },
  {
    name: 'Emma Davis',
    role: 'Marketing Manager',
    company: 'E-commerce Co',
    content: 'The templates are beautiful and professional. Already received two job offers!',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'Data Analyst',
    company: 'Analytics Firm',
    content: 'Simple, intuitive, and results-driven. Best $2.59 I\'ve ever spent.',
    rating: 5,
  },
  {
    name: 'Lisa Martinez',
    role: 'UX Designer',
    company: 'Design Agency',
    content: 'The AI features are incredible. It helped me articulate my design impact perfectly.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Project Manager',
    company: 'Construction Tech',
    content: 'Great value for money. The monthly plan is worth every euro for continuous updates.',
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">ResumeAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm hover:text-primary transition">
              Features
            </a>
            <a href="#templates" className="text-sm hover:text-primary transition">
              Templates
            </a>
            <a href="#pricing" className="text-sm hover:text-primary transition">
              Pricing
            </a>
            <a href="#faq" className="text-sm hover:text-primary transition">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild className="gap-2">
              <Link href="/auth/sign-up">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glasmorph">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI-Powered Resume Builder</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your Dream Job Starts Here
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Create a stunning professional resume in minutes with AI-powered suggestions. Choose from beautiful templates and land your next job.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="gap-2">
              <Link href="/auth/sign-up">
                Start Creating <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">See Features</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-6">No credit card required. Start free.</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">Everything you need to stand out</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'AI-Powered Writing',
                description: 'Get intelligent suggestions for your achievements and skills. AI learns your style.',
              },
              {
                icon: FileText,
                title: '6 Professional Templates',
                description: 'Handcrafted templates designed by professionals for every industry and career level.',
              },
              {
                icon: Zap,
                title: 'Instant PDF Export',
                description: 'Download beautifully formatted PDFs ready to send to recruiters and employers.',
              },
              {
                icon: Lock,
                title: 'Secure & Private',
                description: 'Your data is encrypted and GDPR compliant. Complete privacy and control.',
              },
              {
                icon: Globe,
                title: 'Multi-Language',
                description: 'Create resumes in English, Spanish, German, and more. Go global.',
              },
              {
                icon: CheckCircle2,
                title: 'Real-Time Preview',
                description: 'See exactly how your resume looks as you edit with instant live preview.',
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="glass-card group hover:bg-white/15 transition-all duration-300">
                  <Icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Templates Carousel Section */}
      <section id="templates" className="py-20 md:py-32 bg-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional Templates</h2>
            <p className="text-lg text-muted-foreground">Choose the template that matches your style and industry</p>
          </div>
          <TemplateCarousel items={templates} />
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials testimonials={testimonials} />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-lg text-muted-foreground">Choose the plan that works best for you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Basic',
                priceUSD: '$1.99',
                priceEUR: '€1.99',
                description: 'Perfect for one resume',
                features: ['Create 1 CV', 'All templates', 'PDF export', 'Photo upload', 'AI features'],
              },
              {
                name: 'Pro',
                priceUSD: '$2.59',
                priceEUR: '€2.59',
                description: 'For active job seekers',
                features: ['Create 5 CVs', 'All templates', 'PDF export', 'Photo upload', 'AI features', 'Unlimited edits'],
                highlighted: true,
              },
              {
                name: 'Monthly',
                priceUSD: '$13.99/mo',
                priceEUR: '€9.99/mo',
                description: 'Unlimited access',
                features: ['Unlimited CVs', 'All templates', 'PDF export', 'Photo upload', 'AI features', 'Priority support'],
              },
            ].map((plan, i) => (
              <div key={i} className={`glass-card transition-all duration-300 ${plan.highlighted ? 'ring-2 ring-primary scale-105' : 'hover:bg-white/15'}`}>
                {plan.highlighted && <div className="text-xs font-semibold text-primary mb-4">MOST POPULAR</div>}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-primary text-3xl font-bold mb-1">{plan.priceUSD}</p>
                <p className="text-xs text-muted-foreground mb-4">{plan.description}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.highlighted ? 'default' : 'outline'} asChild>
                  <Link href={`/auth/sign-up?plan=${plan.name.toLowerCase()}`}>Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Find answers to common questions about ResumeAI</p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: 'How long does it take to create a resume?',
                a: 'Most users create their first resume in 5-10 minutes. With our AI suggestions and templates, the process is incredibly fast.',
              },
              {
                q: 'Can I import my existing resume?',
                a: 'Yes! Upload your existing CV as a PDF or DOCX file, and our AI will parse and reformat it for you.',
              },
              {
                q: 'Can I create multiple resumes?',
                a: 'Yes. With our Pro plan ($2.59), you can create up to 5 resumes. Monthly subscription is unlimited.',
              },
              {
                q: 'Is my data secure?',
                a: 'Absolutely. We use enterprise-grade encryption, follow GDPR compliance, and never sell your data.',
              },
              {
                q: 'Can I edit after downloading?',
                a: 'Yes! You can always edit your resume in ResumeAI and download updated versions anytime.',
              },
              {
                q: 'What if I want a refund?',
                a: 'We offer a 30-day money-back guarantee. No questions asked. See our Refund Policy for details.',
              },
            ].map((item, i) => (
              <details key={i} className="glass-card group cursor-pointer">
                <summary className="flex items-center justify-between font-semibold p-6 select-none hover:text-primary transition">
                  <span>{item.q}</span>
                  <span className="text-xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 pt-2 text-muted-foreground border-t border-white/10">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to land your dream job?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join thousands of professionals who've created stunning resumes with ResumeAI.</p>
          <Button size="lg" asChild className="gap-2">
            <Link href="/auth/sign-up">
              Create Your Resume Now <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 glass-card py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                ResumeAI
              </h3>
              <p className="text-sm text-muted-foreground">Create professional resumes with AI assistance in minutes.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-primary transition">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#templates" className="hover:text-primary transition">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-primary transition">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-primary transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="hover:text-primary transition">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: support@resumeai.com</li>
                <li>Status: Fully Operational</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 ResumeAI. All rights reserved.</p>
            <p>Made with passion for professionals worldwide</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
