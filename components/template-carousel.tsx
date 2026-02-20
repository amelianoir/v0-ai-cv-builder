'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface CarouselItem {
  id: string
  title: string
  description: string
}

interface TemplateCarouselProps {
  items: CarouselItem[]
}

export function TemplateCarousel({ items }: TemplateCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlay, items.length])

  const next = () => {
    setCurrent((prev) => (prev + 1) % items.length)
    setIsAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length)
    setIsAutoPlay(false)
  }

  return (
    <div className="relative w-full" onMouseEnter={() => setIsAutoPlay(false)} onMouseLeave={() => setIsAutoPlay(true)}>
      <div className="overflow-hidden rounded-2xl">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
          {items.map((item) => (
            <div key={item.id} className="min-w-full">
              <div className="glass-card">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-lg font-semibold text-primary">{item.title}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 backdrop-blur-md"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-md"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i)
              setIsAutoPlay(false)
            }}
            className={`h-2 rounded-full transition-all ${
              i === current ? 'bg-primary w-8' : 'bg-muted w-2'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
