'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Sparkles, FileText, Lock, Zap, Globe } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">ResumeAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm hover:text-primary transition">Features</a>
            <a href="#templates" className="text-sm hover:text-primary transition">Templates</a>
            <a href="#pricing" className="text-sm hover:text-primary transition">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">AI-Powered Resume Builder</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Create Your Perfect Resume in Minutes
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Let AI help you write compelling content, choose from beautiful templates, and export to PDF instantly. Professional results, effortless process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/sign-up">Start Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-card/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">Everything you need to stand out</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'AI-Powered Writing',
                description: 'Get AI suggestions for your work experience, skills, and achievements',
              },
              {
                icon: FileText,
                title: '6 Premium Templates',
                description: 'Choose from professionally designed templates that match your style',
              },
              {
                icon: Zap,
                title: 'Instant PDF Export',
                description: 'Download your resume as a beautifully formatted PDF in seconds',
              },
              {
                icon: Lock,
                title: 'Secure & Private',
                description: 'Your data is encrypted and GDPR compliant. You own your content.',
              },
              {
                icon: Globe,
                title: 'Multi-Language',
                description: 'Create resumes in English, Spanish, German, and more',
              },
              {
                icon: CheckCircle2,
                title: 'Easy Editing',
                description: 'Intuitive interface with real-time preview of your changes',
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <Card key={i} className="border-border/50 hover:border-primary/30 transition">
                  <CardHeader>
                    <Icon className="w-8 h-8 text-primary mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Templates</h2>
            <p className="text-lg text-muted-foreground">Choose the template that matches your style</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {['Classic', 'Modern', 'Minimal', 'Executive', 'Tech-Focused', 'Creative'].map((template, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition cursor-pointer border-border/50">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-primary/50" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{template}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 bg-card/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-lg text-muted-foreground">Choose what works best for you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic',
                priceUSD: '$1.99',
                priceEUR: '€1.99',
                description: 'Perfect for one resume',
                features: ['Create 1 CV', 'All templates', 'PDF export', 'Photo upload'],
              },
              {
                name: 'Pro',
                priceUSD: '$2.59',
                priceEUR: '€2.59',
                description: 'For job seekers',
                features: ['Create 5 CVs', 'All templates', 'PDF export', 'Photo upload', 'Unlimited edits'],
                highlighted: true,
              },
              {
                name: 'Monthly',
                priceUSD: '$13.99',
                priceEUR: '€9.99',
                description: 'Unlimited access',
                features: ['Unlimited CVs', 'All templates', 'PDF export', 'Photo upload', 'AI features', 'Priority support'],
              },
            ].map((plan, i) => (
              <Card key={i} className={`border-border/50 ${plan.highlighted ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription className="text-lg font-semibold mt-2">
                    <span className="text-primary">{plan.priceUSD}</span>
                    <span className="text-xs text-muted-foreground ml-2">USD</span>
                  </CardDescription>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Create your professional resume now. It takes just a few minutes.
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/sign-up">Sign Up Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">ResumeAI</h3>
              <p className="text-sm text-muted-foreground">Create professional resumes with AI assistance.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-primary">Features</Link></li>
                <li><Link href="#templates" className="hover:text-primary">Templates</Link></li>
                <li><Link href="#pricing" className="hover:text-primary">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
                <li><Link href="/refund" className="hover:text-primary">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: support@resumeai.com</li>
                <li>Status: Operational</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 ResumeAI. All rights reserved.</p>
            <p>Made with care for professionals</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
