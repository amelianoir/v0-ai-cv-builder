'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react'
import { FormEvent, useState } from 'react'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitted(true)
        e.currentTarget.reset()
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">CVDesign</span>
          </Link>
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
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glasmorph">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Get in Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Contact Our Team
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Have questions about CVDesign.Online? Our team is here to help. Get in touch with us today.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              <div className="space-y-8">
                {/* Email */}
                <div className="glass-card">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Email</h3>
                      <a href="mailto:info@cvdesign.online" className="text-primary hover:underline break-all">
                        info@cvdesign.online
                      </a>
                      <p className="text-sm text-muted-foreground mt-2">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Support */}
                <div className="glass-card">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Support</h3>
                      <p className="text-sm text-muted-foreground">
                        For urgent issues, please send an email with "URGENT" in the subject line.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="glass-card">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Based In</h3>
                      <p className="text-sm text-muted-foreground">European Union</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">GDPR Compliant • EU Privacy Laws</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-12">
                <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-primary transition">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="block text-sm text-muted-foreground hover:text-primary transition">
                    Terms of Service
                  </Link>
                  <Link href="/refund" className="block text-sm text-muted-foreground hover:text-primary transition">
                    Refund Policy
                  </Link>
                  <Link href="/blog" className="block text-sm text-muted-foreground hover:text-primary transition">
                    Blog
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card">
              <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
              
              {submitted && (
                <div className="mb-6 p-4 bg-primary/20 border border-primary/30 rounded-lg">
                  <p className="text-sm font-medium text-primary">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    className="bg-white/10 border-white/20"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="bg-white/10 border-white/20"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="How can we help?"
                    required
                    className="bg-white/10 border-white/20"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                    className="bg-white/10 border-white/20 resize-none"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                We respect your privacy. See our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to build your CV?</h2>
          <p className="text-lg text-muted-foreground mb-8">Join thousands of professionals creating stunning resumes.</p>
          <Button size="lg" asChild>
            <Link href="/auth/sign-up">Get Started Free</Link>
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
                CVDesign
              </h3>
              <p className="text-sm text-muted-foreground">Create professional CVs with AI assistance.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-primary transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-primary transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition">
                    Contact
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
              <h4 className="font-semibold mb-4 text-sm">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="mailto:info@cvdesign.online" className="hover:text-primary transition">
                    info@cvdesign.online
                  </a>
                </li>
                <li>Based in EU</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 CVDesign.Online. All rights reserved.</p>
            <p>Made with passion for professionals worldwide</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
