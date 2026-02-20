'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'

interface ExperienceEntry {
  id: string
  position: string
  company: string
  startDate: string
  endDate: string
  description: string
}

interface EducationEntry {
  id: string
  degree: string
  school: string
  field: string
  graduationDate: string
}

interface CVFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  summary: string
  experience: ExperienceEntry[]
  education: EducationEntry[]
  skills: string[]
}

interface CVFormProps {
  initialData?: Partial<CVFormData>
  onSave: (data: CVFormData) => void
  onExport: (data: CVFormData) => void
}

export default function CVForm({ initialData, onSave, onExport }: CVFormProps) {
  const [formData, setFormData] = useState<CVFormData>(
    initialData || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      experience: [],
      education: [],
      skills: [],
    }
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          position: '',
          company: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    }))
  }

  const removeExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const handleExperienceChange = (id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }))
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Personal Info */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="John"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="City, Country"
            />
          </div>

          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              placeholder="Brief overview of your professional background..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Work Experience</CardTitle>
          <Button onClick={addExperience} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {formData.experience.length === 0 ? (
            <p className="text-muted-foreground">Add your work experience</p>
          ) : (
            formData.experience.map((exp) => (
              <div key={exp.id} className="space-y-4 pb-6 border-b last:border-b-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Position</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)}
                      placeholder="Job title"
                    />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                      placeholder="Company name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                    placeholder="Describe your responsibilities and achievements"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={() => removeExperience(exp.id)}
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button onClick={() => onSave(formData)} size="lg" className="px-8">
          Save CV
        </Button>
        <Button onClick={() => onExport(formData)} size="lg" variant="outline" className="px-8">
          Export PDF
        </Button>
      </div>
    </div>
  )
}
