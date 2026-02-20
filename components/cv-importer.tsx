'use client'

import { useState } from 'react'
import { Upload, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export function CVImporter() {
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFileUpload = async (file: File) => {
    if (!file) return

    setIsLoading(true)
    setFileName(file.name)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/cv/import', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Failed to import CV')
        setIsLoading(false)
        return
      }

      toast.success('CV imported successfully!')
      
      // Store the imported data in session/state
      sessionStorage.setItem('importedCVData', JSON.stringify(data.data))
      
      // Redirect to resume editor
      window.location.href = '/dashboard/resume?imported=true'
    } catch (error) {
      console.error('[v0] Upload error:', error)
      toast.error('Failed to upload CV. Please try again.')
      setIsLoading(false)
      setFileName(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="glass-card border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors cursor-pointer">
        <label className="flex flex-col items-center justify-center py-8 cursor-pointer">
          {isLoading ? (
            <>
              <Loader2 className="w-8 h-8 text-primary mb-2 animate-spin" />
              <p className="text-sm text-muted-foreground">Processing {fileName}...</p>
            </>
          ) : fileName ? (
            <>
              <CheckCircle2 className="w-8 h-8 text-primary mb-2" />
              <p className="text-sm font-semibold">{fileName}</p>
              <p className="text-xs text-muted-foreground mt-1">Ready to import</p>
            </>
          ) : (
            <>
              <Upload className="w-8 h-8 text-primary mb-2" />
              <p className="text-sm font-semibold">Upload your existing CV</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, or TXT format (max 5MB)</p>
            </>
          )}
          <input
            type="file"
            accept=".pdf,.docx,.txt,.doc"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileUpload(e.target.files[0])
              }
            }}
            disabled={isLoading}
            className="hidden"
          />
        </label>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Our AI will parse your CV and help you format it beautifully
      </p>
    </div>
  )
}
