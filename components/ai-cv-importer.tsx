'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Upload, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

interface CVImportProps {
  onDataExtracted: (data: any) => void
}

export function AICVImporter({ onDataExtracted }: CVImportProps) {
  const [cvText, setCvText] = useState('')
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDragActive, setIsDragActive] = useState(false)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file')
      return
    }

    setPhotoFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setPhotoPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    const files = e.dataTransfer.files
    if (files?.[0]?.type === 'text/plain') {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        setCvText(event.target?.result as string)
        toast.success('CV text loaded')
      }
      reader.readAsText(file)
    } else {
      toast.error('Please drop a text file with your CV')
    }
  }

  const handleParseCv = async () => {
    if (!cvText.trim()) {
      toast.error('Please paste or upload your CV content')
      return
    }

    setIsLoading(true)
    try {
      console.log('[v0] Sending CV text to parser...')
      const response = await fetch('/api/ai/parse-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText }),
      })

      if (!response.ok) {
        throw new Error('Failed to parse CV')
      }

      const result = await response.json()
      console.log('[v0] Parsed CV data:', result.data)

      if (photoPreview) {
        result.data.personal.photoUrl = photoPreview
      }

      toast.success('CV parsed successfully!')
      onDataExtracted(result.data)
    } catch (error) {
      console.error('[v0] Parse error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to parse CV')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Photo Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upload Your Photo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {photoPreview ? (
            <div className="flex items-center gap-4">
              <img
                src={photoPreview}
                alt="Profile preview"
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm text-green-600 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Photo uploaded
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPhotoPreview('')
                    setPhotoFile(null)
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <Input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="cursor-pointer"
            />
          )}
        </CardContent>
      </Card>

      {/* CV Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upload Your CV</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Paste your CV text or drag a .txt file. AI will extract your information.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/20'
            }`}
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag your CV here or paste below
            </p>
          </div>

          <Textarea
            placeholder="Paste your CV content here... Include your work experience, education, skills, and summary."
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            rows={12}
            className="font-mono text-sm"
          />

          <div className="flex gap-3">
            <Button
              onClick={handleParseCv}
              disabled={isLoading || !cvText.trim()}
              className="flex-1 gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing your CV...
                </>
              ) : (
                'Parse CV with AI'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
