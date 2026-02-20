'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  ClassicTemplate,
  ModernTemplate,
  MinimalTemplate,
  ExecutiveTemplate,
  TechTemplate,
  CreativeTemplate,
} from './cv-templates'

interface CarouselItem {
  id: string
  title: string
  description: string
  component: React.ComponentType
}

interface TemplateCarouselProps {
  items: CarouselItem[]
}

export function TemplateCarousel({ items }: TemplateCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Map template IDs to components
  const componentMap: Record<string, React.ComponentType> = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    executive: ExecutiveTemplate,
    tech: TechTemplate,
    creative: CreativeTemplate,
  }

  useEffect(() => {
    if (!isAutoPlay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length)
    }, 6000)
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

  const currentItem = items[current]
  const Component = componentMap[currentItem.id]

  return (
    <div className="relative w-full" onMouseEnter={() => setIsAutoPlay(false)} onMouseLeave={() => setIsAutoPlay(true)}>
      <div className="overflow-hidden rounded-2xl">
        {/* Template Preview Container */}
        <div className="bg-white rounded-2xl shadow-2xl" style={{ aspectRatio: '210/297' }}>
          <div className="w-full h-full overflow-hidden scale-[0.85] origin-top-left">
            {Component ? <Component /> : <div>Template not found</div>}
          </div>
        </div>

        {/* Template Info Below Preview */}
        <div className="mt-6 space-y-3">
          <div>
            <h3 className="text-2xl font-semibold text-white">{currentItem.title}</h3>
            <p className="text-muted-foreground">{currentItem.description}</p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-background/80 hover:bg-background"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-background/80 hover:bg-background"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrent(i)
              setIsAutoPlay(false)
            }}
            className={`h-2 rounded-full transition-all ${
              i === current ? 'bg-primary w-8' : 'bg-muted w-2 hover:bg-muted-foreground'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
