'use client'

import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Users Say</h2>
          <p className="text-lg text-muted-foreground">Join thousands of professionals who've created amazing resumes</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="glass-card">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm mb-6 leading-relaxed">{testimonial.content}</p>
              <div className="pt-4 border-t border-white/10">
                <p className="font-semibold text-sm">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
