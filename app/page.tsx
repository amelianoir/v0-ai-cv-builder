'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Sparkles, FileText, Lock, Zap, Globe, ArrowRight, Wand2 } from 'lucide-react'
import { TemplateCarousel } from '@/components/template-carousel'
import { Testimonials } from '@/components/testimonials'
import { useState } from 'react'

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
    content: 'The AI understood my background perfectly and created a CV that landed me 3 interviews.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    company: 'Fortune 500',
    content: 'Best investment for job hunting. The AI rewrites made my CV stand out instantly.',
    rating: 5,
  },
  {
    name: 'Emma Davis',
    role: 'Marketing Manager',
    company: 'E-commerce Co',
    content: 'Professional design meets intelligent content. Got hired in 2 weeks.',
    rating: 5,
  },
  {
    name: 'James Wilson',
    role: 'Data Analyst',
    company: 'Analytics Firm',
    content: 'Simple, powerful, and affordable. Exactly what I needed.',
    rating: 5,
  },
  {
    name: 'Lisa Martinez',
    role: 'UX Designer',
    company: 'Design Agency',
    content: 'The AI captures my design expertise better than I ever could.',
    rating: 5,
  },
  {
    name: 'David Kim',
    role: 'Project Manager',
    company: 'Construction Tech',
    content: 'Worth every euro. My CV is now my competitive advantage.',
    rating: 5,
  },
]

export default function HomePage() {
  const [jobTitle, setJobTitle] = useState('')
  const [experience, setExperience] = useState('')

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">CVDesign.Online</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#ai-generator" className="text-sm hover:text-primary transition">
              AI Generator
            </a>
            <a href="#templates" className="text-sm hover:text-primary transition">
              Templates
            </a>
            <a href="#pricing" className="text-sm hover:text-primary transition">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm hover:text-primary transition">
              Stories
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild className="gap-2 bg-primary hover:bg-primary/90">
              <Link href="/auth/sign-up">
                Start Free <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with AI Generator */}
      <section id="ai-generator" className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Headline & CTA */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glasmorph-light">
                  <Wand2 className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary">AI-Powered Generation</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
                  Create Your Perfect CV in Minutes
                </h1>
                <p className="text-lg text-muted-foreground text-balance max-w-md">
                  Type your job title and experience. Our AI writes a professional CV tailored to your target role. Then customize with premium templates.
                </p>
              </div>

              {/* Quick Generator */}
              <div className="space-y-4 glass-card">
                <div className="grid gap-3">
                  <div>
                    <label className="text-sm font-medium">Target Job Title</label>
                    <input
                      type="text"
                      placeholder="e.g., Senior Product Manager"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="w-full mt-2 px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Your Experience</label>
                    <textarea
                      placeholder="Describe your key experience, skills, and achievements..."
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      rows={3}
                      className="w-full mt-2 px-4 py-2 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground resize-none"
                    />
                  </div>
                </div>
                <Button className="w-full gap-2 bg-primary hover:bg-primary/90" asChild>
                  <Link href="/auth/sign-up">
                    Generate CV Now <Sparkles className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">Free to try. No credit card required.</p>
            </div>

            {/* Right: Visual Showcase */}
            <div className="relative h-96 hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
              <div className="relative glass-card h-full rounded-2xl p-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-primary">AI-Generated</span>
                  </div>
                  <h3 className="text-lg font-semibold">Your Professional CV</h3>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>Professional summary crafted by AI</p>
                  <p>Experience tailored to target role</p>
                  <p>Skills optimized for ATS</p>
                  <p>Ready to export as PDF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose CVDesign</h2>
            <p className="text-lg text-muted-foreground">Everything you need to stand out</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Wand2,
                title: 'AI-Powered Content',
                description: 'Let AI handle the writing. Generate compelling CV content instantly.',
              },
              {
                icon: FileText,
                title: '6 Professional Templates',
                description: 'Premium, handcrafted designs for every industry and career level.',
              },
              {
                icon: Zap,
                title: 'One-Click PDF Export',
                description: 'Download beautifully formatted CVs ready for any employer.',
              },
              {
                icon: Lock,
                title: '100% Secure & Private',
                description: 'Enterprise encryption, GDPR compliant, your data never sold.',
              },
              {
                icon: Globe,
                title: 'Multi-Language Support',
                description: 'Create CVs in English, Spanish, German, and more.',
              },
              {
                icon: CheckCircle2,
                title: 'ATS-Optimized',
                description: 'Designed to pass automated screening systems.',
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="glass-card group hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <Icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Premium Templates</h2>
            <p className="text-lg text-muted-foreground">Choose your perfect CV design</p>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">Pay once or subscribe for unlimited</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                priceUSD: '$1.99',
                priceEUR: '€1.99',
                description: 'Perfect for one resume',
                features: ['Create 1 CV', 'All 6 templates', 'AI content generation', 'PDF export', 'Photo upload'],
              },
              {
                name: 'Professional',
                priceUSD: '$2.59',
                priceEUR: '€2.59',
                description: 'For active job hunters',
                features: ['Create 5 CVs', 'All templates', 'AI generation', 'PDF export', 'Photo upload', 'Unlimited edits', 'Priority support'],
                highlighted: true,
              },
              {
                name: 'Premium Monthly',
                priceUSD: '$13.99/mo',
                priceEUR: '€9.99/mo',
                description: 'Unlimited everything',
                features: ['Unlimited CVs', 'All templates', 'AI generation', 'PDF export', 'Photo upload', 'Priority support', 'Early access to new features'],
              },
            ].map((plan, i) => (
              <div key={i} className={`glass-card transition-all duration-300 ${plan.highlighted ? 'ring-2 ring-primary scale-105' : 'hover:bg-white/20'}`}>
                {plan.highlighted && <div className="text-xs font-semibold text-primary mb-4 uppercase">Most Popular</div>}
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
                  <Link href="/auth/sign-up">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">30-day money-back guarantee. No questions asked.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join thousands of professionals who landed their dream jobs with CVDesign.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="gap-2">
              <Link href="/auth/sign-up">
                Create Free CV <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">Learn CV Tips</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 glass-card py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                CVDesign
              </h3>
              <p className="text-sm text-muted-foreground">AI-powered CV builder for professionals.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-primary transition">Features</Link></li>
                <li><Link href="#templates" className="hover:text-primary transition">Templates</Link></li>
                <li><Link href="#pricing" className="hover:text-primary transition">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/blog" className="hover:text-primary transition">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-primary transition">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary transition">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition">Terms</Link></li>
                <li><Link href="/refund" className="hover:text-primary transition">Refund</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="mailto:info@cvdesign.online" className="hover:text-primary transition">info@cvdesign.online</a></li>
                <li>Response: &lt;2h</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 CVDesign.Online. All rights reserved.</p>
            <p>Crafted for professionals, powered by AI</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
