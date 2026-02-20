'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save, Download, Sparkles, Upload, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface ResumeData {
  id?: string
  title: string
  template: string
  personal: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    photoUrl?: string
  }
  summary: string
  experience: Array<{
    id: string
    position: string
    company: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    id: string
    degree: string
    school: string
    field: string
    graduationDate: string
  }>
  skills: string[]
}

export default function ResumePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateParam = searchParams.get('template')
  const resumeIdParam = searchParams.get('id')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [resume, setResume] = useState<ResumeData>({
    title: 'My Resume',
    template: templateParam || 'classic',
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
  })

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
        return
      }

      setUser(user)

      // If editing existing resume
      if (resumeIdParam) {
        const { data: resumeData } = await supabase
          .from('resumes')
          .select('*')
          .eq('id', resumeIdParam)
          .eq('user_id', user.id)
          .single()

        if (resumeData) {
          setResume(JSON.parse(resumeData.content))
        }
      } else {
        // Pre-fill with user data
        setResume((prev) => ({
          ...prev,
          personal: {
            ...prev.personal,
            firstName: user.user_metadata?.first_name || '',
            lastName: user.user_metadata?.last_name || '',
            email: user.email || '',
          },
        }))
      }

      setLoading(false)
    }

    loadData()
  }, [router, resumeIdParam])

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    try {
      const supabase = createClient()

      if (resume.id) {
        // Update existing
        await supabase
          .from('resumes')
          .update({
            title: resume.title,
            template: resume.template,
            content: JSON.stringify(resume),
            updated_at: new Date().toISOString(),
          })
          .eq('id', resume.id)
          .eq('user_id', user.id)
      } else {
        // Create new
        const { data } = await supabase
          .from('resumes')
          .insert({
            user_id: user.id,
            title: resume.title,
            template: resume.template,
            content: JSON.stringify(resume),
          })
          .select()
          .single()

        if (data) {
          setResume({ ...resume, id: data.id })
        }
      }

      toast.success('Resume saved successfully!')
    } catch (error: any) {
      toast.error('Failed to save resume: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleExportPDF = () => {
    // PDF export functionality will be implemented with a print-to-PDF
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid lg:grid-cols-[1fr_1fr] min-h-screen">
        {/* Editor Panel */}
        <div className="border-r border-border overflow-y-auto">
          <div className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur p-4 flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-8 max-w-2xl">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Resume Title</Label>
              <Input
                id="title"
                value={resume.title}
                onChange={(e) => setResume({ ...resume, title: e.target.value })}
                placeholder="My Resume"
              />
            </div>

            {/* Personal Information */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input
                      value={resume.personal.firstName}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personal: { ...resume.personal, firstName: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                      value={resume.personal.lastName}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personal: { ...resume.personal, lastName: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={resume.personal.email}
                    onChange={(e) =>
                      setResume({
                        ...resume,
                        personal: { ...resume.personal, email: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={resume.personal.phone}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personal: { ...resume.personal, phone: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={resume.personal.location}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personal: { ...resume.personal, location: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  Professional Summary
                  <Button variant="ghost" size="sm">
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={resume.summary}
                  onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                  placeholder="Brief overview of your professional background and goals..."
                  className="min-h-24"
                />
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Work Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Add your work experience here</p>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Add your education details here</p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Add your professional skills here</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="hidden lg:flex flex-col bg-card/30 p-8">
          <div className="sticky top-0 mb-8">
            <h2 className="text-lg font-semibold mb-2">Preview</h2>
            <p className="text-sm text-muted-foreground">
              Template: <span className="capitalize font-medium text-foreground">{resume.template}</span>
            </p>
          </div>

          {/* Resume Preview */}
          <div className="flex-1 bg-white text-black rounded-lg shadow-lg p-8 overflow-auto">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center border-b border-gray-300 pb-4">
                <h1 className="text-3xl font-bold">
                  {resume.personal.firstName} {resume.personal.lastName}
                </h1>
                <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600 mt-2">
                  {resume.personal.email && <span>{resume.personal.email}</span>}
                  {resume.personal.phone && <span>•</span>}
                  {resume.personal.phone && <span>{resume.personal.phone}</span>}
                  {resume.personal.location && <span>•</span>}
                  {resume.personal.location && <span>{resume.personal.location}</span>}
                </div>
              </div>

              {/* Summary */}
              {resume.summary && (
                <div>
                  <h2 className="text-lg font-bold border-b-2 border-gray-800 mb-2">Professional Summary</h2>
                  <p className="text-sm text-gray-700">{resume.summary}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
