'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Loader2, Copy, Check } from 'lucide-react'
import { toast } from 'sonner'

interface CVEnhancementPanelProps {
  section: 'experience' | 'summary' | 'skills'
  content: string
  onAccept: (enhanced: string) => void
}

export function CVEnhancementPanel({
  section,
  content,
  onAccept,
}: CVEnhancementPanelProps) {
  const [enhancement, setEnhancement] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleEnhance = async () => {
    setIsStreaming(true)
    setEnhancement('')

    try {
      console.log('[v0] Starting enhancement stream for:', section)
      const response = await fetch('/api/ai/enhance-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, content }),
      })

      if (!response.ok) {
        throw new Error('Enhancement failed')
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        fullText += chunk
        setEnhancement(fullText)
        console.log('[v0] Streaming token:', chunk)
      }

      toast.success('Enhancement complete!')
    } catch (error) {
      console.error('[v0] Enhancement error:', error)
      toast.error('Failed to enhance content')
    } finally {
      setIsStreaming(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(enhancement)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.success('Copied to clipboard')
  }

  const sectionLabels = {
    experience: 'Job Description',
    summary: 'Professional Summary',
    skills: 'Skills',
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Enhance {sectionLabels[section]}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-sm text-muted-foreground">Original:</p>
          <p className="text-sm mt-1 line-clamp-2">{content}</p>
        </div>

        {enhancement && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
            <p className="text-sm text-muted-foreground mb-2">AI Enhancement:</p>
            <p className="text-sm text-foreground whitespace-pre-wrap">{enhancement}</p>
          </div>
        )}

        {isStreaming && !enhancement && (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">
              AI is thinking...
            </span>
          </div>
        )}

        <div className="flex gap-2">
          {!enhancement && (
            <Button
              onClick={handleEnhance}
              disabled={isStreaming}
              className="flex-1 gap-2"
            >
              {isStreaming ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enhancing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Enhance with AI
                </>
              )}
            </Button>
          )}

          {enhancement && (
            <>
              <Button
                onClick={handleCopy}
                variant="outline"
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
              <Button
                onClick={() => onAccept(enhancement)}
                className="flex-1"
              >
                Use This
              </Button>
              <Button
                onClick={() => setEnhancement('')}
                variant="outline"
              >
                Regenerate
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
