'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AICVImporter } from './ai-cv-importer'
import { CVEnhancementPanel } from './cv-enhancement-panel'
import { Sparkles, FileDown } from 'lucide-react'
import { toast } from 'sonner'

interface CVData {
  personal: {
    name: string
    email?: string
    phone?: string
    location?: string
    photoUrl?: string
  }
  summary?: string
  experience?: Array<{
    position: string
    company: string
    startDate?: string
    endDate?: string
    description?: string[]
  }>
  education?: Array<{
    degree: string
    school: string
    field?: string
    graduationDate?: string
  }>
  skills?: string[]
}

interface AICVGeneratorProps {
  onCVComplete: (cv: CVData) => void
}

export function AICVGenerator({ onCVComplete }: AICVGeneratorProps) {
  const [step, setStep] = useState<'import' | 'enhance' | 'complete'>('import')
  const [cvData, setCvData] = useState<CVData | null>(null)
  const [enhancedData, setEnhancedData] = useState<CVData | null>(null)

  const handleDataExtracted = (data: CVData) => {
    console.log('[v0] CV data extracted:', data)
    setCvData(data)
    setEnhancedData(JSON.parse(JSON.stringify(data))) // Deep copy
    setStep('enhance')
  }

  const handleExperienceEnhanced = (index: number, enhanced: string) => {
    if (!enhancedData?.experience) return
    const updated = { ...enhancedData }
    updated.experience[index].description = [enhanced]
    setEnhancedData(updated)
    toast.success('Experience updated!')
  }

  const handleSummaryEnhanced = (enhanced: string) => {
    if (!enhancedData) return
    setEnhancedData({ ...enhancedData, summary: enhanced })
    toast.success('Summary updated!')
  }

  const handleComplete = () => {
    if (!enhancedData) {
      toast.error('No CV data')
      return
    }
    onCVComplete(enhancedData)
    setStep('complete')
    toast.success('CV ready to use!')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2 mb-8">
        <div className="flex items-center justify-center gap-2 text-2xl font-bold">
          <Sparkles className="w-6 h-6 text-primary" />
          AI CV Assistant
        </div>
        <p className="text-muted-foreground">
          Upload your old CV and let AI create an improved version
        </p>
      </div>

      {step === 'import' && (
        <AICVImporter onDataExtracted={handleDataExtracted} />
      )}

      {step === 'enhance' && cvData && enhancedData && (
        <div className="space-y-6">
          {/* Summary Enhancement */}
          {cvData.summary && (
            <CVEnhancementPanel
              section="summary"
              content={cvData.summary}
              onAccept={handleSummaryEnhanced}
            />
          )}

          {/* Experience Enhancement */}
          {cvData.experience && cvData.experience.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Enhance Work Experience
              </h3>
              {cvData.experience.map((exp, idx) => (
                <CVEnhancementPanel
                  key={idx}
                  section="experience"
                  content={`${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})\n${
                    exp.description?.join('\n') || ''
                  }`}
                  onAccept={(enhanced) =>
                    handleExperienceEnhanced(idx, enhanced)
                  }
                />
              ))}
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preview Enhanced CV</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">{enhancedData.personal.name}</h3>
                <div className="text-sm text-muted-foreground space-x-2">
                  {enhancedData.personal.email && (
                    <span>{enhancedData.personal.email}</span>
                  )}
                  {enhancedData.personal.phone && (
                    <span>{enhancedData.personal.phone}</span>
                  )}
                  {enhancedData.personal.location && (
                    <span>{enhancedData.personal.location}</span>
                  )}
                </div>
              </div>

              {enhancedData.summary && (
                <div>
                  <p className="font-semibold text-sm mb-1">Summary</p>
                  <p className="text-sm text-muted-foreground">
                    {enhancedData.summary}
                  </p>
                </div>
              )}

              <Button
                onClick={handleComplete}
                className="w-full gap-2"
                size="lg"
              >
                <FileDown className="w-4 h-4" />
                Use This CV & Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 'complete' && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Sparkles className="w-12 h-12 mx-auto text-primary" />
              <div>
                <h3 className="font-semibold text-lg">CV Ready!</h3>
                <p className="text-muted-foreground">
                  Your enhanced CV is ready. Continue to the editor to customize
                  and export.
                </p>
              </div>
              <Button
                onClick={() => {
                  setStep('import')
                  setCvData(null)
                  setEnhancedData(null)
                }}
                variant="outline"
              >
                Start Another CV
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
