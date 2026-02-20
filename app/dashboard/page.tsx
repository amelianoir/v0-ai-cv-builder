'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, FileText, Settings, LogOut, Sparkles, Upload, Download } from 'lucide-react'
import { AICVGenerator } from '@/components/ai-cv-generator'

interface Resume {
  id: string
  title: string
  template: string
  updated_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/auth/login')
      } else {
        setUser(user)
        // Load user's resumes
        const { data: resumesData } = await supabase
          .from('resumes')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })

        setResumes(resumesData || [])
        setLoading(false)
      }
    }

    checkUser()
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              CVDesign
            </h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <Tabs defaultValue="ai-assistant" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="ai-assistant" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="my-resumes">My Resumes</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="upgrade">Upgrade</TabsTrigger>
          </TabsList>

          {/* AI Assistant Tab */}
          <TabsContent value="ai-assistant" className="space-y-6">
            <AICVGenerator
              onCVComplete={(cv) => {
                console.log('[v0] CV completed:', cv)
                // Here you can save to dashboard or navigate to editor
              }}
            />
          </TabsContent>

          {/* My Resumes Tab */}
          <TabsContent value="my-resumes" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">My Resumes</h2>
                <p className="text-muted-foreground mt-1">Manage and edit your existing resumes</p>
              </div>
              <Button asChild>
                <Link href="/dashboard/create">
                  <Plus className="w-4 h-4 mr-2" />
                  New Resume
                </Link>
              </Button>
            </div>

            {resumes.length === 0 ? (
              <Card className="border-border/50">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
                  <p className="text-muted-foreground mb-6 text-center max-w-sm">
                    Create your first resume to get started. Choose from 6 professional templates.
                  </p>
                  <Button asChild>
                    <Link href="/dashboard/create">Create Your First Resume</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume) => (
                  <Card key={resume.id} className="border-border/50 hover:border-primary/30 transition cursor-pointer group">
                    <CardHeader>
                      <CardTitle className="flex items-start justify-between">
                        <span className="line-clamp-2">{resume.title}</span>
                        <FileText className="w-5 h-5 text-primary flex-shrink-0 ml-2" />
                      </CardTitle>
                      <CardDescription>
                        Template: <span className="capitalize">{resume.template}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-xs text-muted-foreground">
                        Updated {new Date(resume.updated_at).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" asChild className="flex-1">
                          <Link href={`/dashboard/resume/${resume.id}`}>
                            Edit
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Create New Tab */}
          <TabsContent value="create" className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">Create New Resume</h2>
              <p className="text-muted-foreground mt-1">Choose a template and start building</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Classic', 'Modern', 'Minimal', 'Executive', 'Tech-Focused', 'Creative'].map((template) => (
                <Card key={template} className="border-border/50 hover:border-primary/30 transition cursor-pointer group">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition">
                    <FileText className="w-12 h-12 text-primary/50 group-hover:text-primary/70 transition" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{template}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" asChild>
                      <Link href={`/dashboard/create?template=${template.toLowerCase().replace(/\s+/g, '-')}`}>
                        Use Template
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">Resume Templates</h2>
              <p className="text-muted-foreground mt-1">Professional designs for every industry</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: 'Classic',
                  description: 'Timeless design that works for any industry. Best for traditional employers.',
                },
                {
                  name: 'Modern',
                  description: 'Contemporary layout with clean aesthetics. Perfect for creative roles.',
                },
                {
                  name: 'Minimal',
                  description: 'Minimalist approach focusing on content. Ideal for scanners.',
                },
                {
                  name: 'Executive',
                  description: 'Premium layout for senior positions. Emphasizes accomplishments.',
                },
                {
                  name: 'Tech-Focused',
                  description: 'Highlights technical skills and projects. Perfect for developers.',
                },
                {
                  name: 'Creative',
                  description: 'Bold design for creative professionals. Stand out from the crowd.',
                },
              ].map((template, i) => (
                <Card key={i} className="border-border/50">
                  <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/dashboard/create?template=${template.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        Use This Template
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Upgrade Tab */}
          <TabsContent value="upgrade" className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">Upgrade Your Plan</h2>
              <p className="text-muted-foreground mt-1">Unlock unlimited resumes and premium features</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Current Plan',
                  description: 'Basic - One-time purchase',
                  features: ['Create 1 CV', 'All templates', 'PDF export', 'Photo upload'],
                },
                {
                  name: 'Pro Plan',
                  price: '$2.59',
                  description: 'Upgrade to create multiple resumes',
                  features: ['Create 5 CVs', 'All templates', 'PDF export', 'Photo upload', 'Unlimited edits'],
                  highlighted: true,
                },
                {
                  name: 'Monthly Plan',
                  price: '$13.99/month',
                  description: 'Unlimited access to everything',
                  features: ['Unlimited CVs', 'All templates', 'PDF export', 'Photo upload', 'AI features', 'Priority support'],
                },
              ].map((plan, i) => (
                <Card key={i} className={`border-border/50 ${plan.highlighted ? 'ring-2 ring-primary' : ''}`}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.price && <div className="text-2xl font-bold text-primary mt-2">{plan.price}</div>}
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, fi) => (
                        <li key={fi} className="flex items-center gap-2 text-sm">
                          <span className="text-primary">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {plan.highlighted && (
                      <Button className="w-full" asChild>
                        <Link href="/checkout?plan=pro">Upgrade Now</Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
