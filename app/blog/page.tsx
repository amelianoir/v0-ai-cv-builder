'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { blogPosts } from '@/lib/blog-data'
import { Calendar, Clock, ChevronRight, Search } from 'lucide-react'

const categories = ['All', 'CV Writing', 'Job Search', 'Career Tips', 'Interview', 'AI Tools']

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            CVDesign
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Career Insights & Tips</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Expert advice on resume writing, job search strategies, interviews, and career growth
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {searchTerm && (
            <div className="text-center mt-6 text-sm text-muted-foreground">
              Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} for "{searchTerm}"
            </div>
          )}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">No articles found</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <div className="glass-card h-full hover:bg-white/15 transition-all duration-300 flex flex-col">
                    {/* Image Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                      <div className="text-5xl opacity-20">{post.category.charAt(0)}</div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Category Tag */}
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{post.excerpt}</p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readingTime} min read
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded">
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs px-2 py-1 bg-white/5 rounded">+{post.tags.length - 2}</span>
                        )}
                      </div>

                      {/* Read More Link */}
                      <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                        Read More <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to create your perfect resume?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Use our AI-powered resume builder to create a professional CV in minutes
          </p>
          <Button size="lg" asChild>
            <Link href="/auth/sign-up">Get Started for Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border glass-card py-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 CVDesign. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
