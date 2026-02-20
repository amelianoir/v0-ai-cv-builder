'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { blogPosts } from '@/lib/blog-data'
import { Calendar, Clock, Share2, ChevronLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])

  useEffect(() => {
    const foundPost = blogPosts.find((p) => p.slug === params.slug)
    if (!foundPost) {
      notFound()
    }
    setPost(foundPost)

    // Find related posts by category
    const related = blogPosts
      .filter((p) => p.category === foundPost.category && p.id !== foundPost.id)
      .slice(0, 3)
    setRelatedPosts(related)
  }, [params.slug])

  if (!post) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href="/blog">
              <ChevronLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-16">
        {/* Meta */}
        <div className="mb-8">
          <div className="inline-block px-4 py-2 mb-6 bg-primary/20 text-primary rounded-full text-sm font-semibold">
            {post.category}
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">{post.title}</h1>

          <div className="flex items-center gap-6 text-muted-foreground pb-8 border-b border-border">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readingTime} min read
            </div>
            <div className="text-sm">By {post.author}</div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag: string) => (
              <Link key={tag} href={`/blog?search=${encodeURIComponent(tag)}`}>
                <span className="px-3 py-1 text-sm bg-white/5 hover:bg-white/10 rounded-full transition cursor-pointer">
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Image Placeholder */}
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-12">
          <div className="text-9xl opacity-10">{post.category.charAt(0)}</div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-16">
          {post.content.split('\n\n').map((paragraph: string, index: number) => {
            if (paragraph.startsWith('#')) {
              const level = paragraph.match(/^#+/)?.[0].length || 1
              const text = paragraph.replace(/^#+\s/, '')
              const HeadingTag = `h${Math.min(level, 6)}` as any
              return (
                <HeadingTag key={index} className="mt-6 mb-4">
                  {text}
                </HeadingTag>
              )
            }
            if (paragraph.startsWith('-')) {
              const items = paragraph.split('\n').filter((line) => line.startsWith('-'))
              return (
                <ul key={index} className="list-disc list-inside space-y-2 mb-4">
                  {items.map((item, i) => (
                    <li key={i}>{item.replace(/^-\s/, '')}</li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={index} className="mb-4 leading-relaxed text-lg">
                {paragraph}
              </p>
            )
          })}
        </div>

        {/* Author Info */}
        <div className="glass-card p-6 mb-12">
          <h3 className="font-semibold mb-2">About the Author</h3>
          <p className="text-muted-foreground">
            {post.author} is a career development expert with years of experience helping professionals advance their careers.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 mb-16 text-center border border-primary/20">
          <h3 className="text-2xl font-bold mb-4">Ready to create your perfect resume?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Apply the insights from this article with our AI-powered resume builder.
          </p>
          <Button size="lg" asChild className="gap-2">
            <Link href="/auth/sign-up">
              Start Creating <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <div className="glass-card h-full hover:bg-white/15 transition-all">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center rounded-t-lg">
                      <div className="text-5xl opacity-20">{relatedPost.category.charAt(0)}</div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{relatedPost.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{relatedPost.excerpt}</p>
                      <div className="text-sm text-primary font-semibold">Read More →</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border glass-card py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 CVDesign. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
