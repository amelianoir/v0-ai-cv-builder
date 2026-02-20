'use server'

import { createClient } from '@/lib/supabase/server'

interface CVData {
  title: string
  template_id: string
  personal_info: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
  }
  summary: string
  work_experience: Array<{
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

export async function saveCV(cvData: CVData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('resumes')
    .insert({
      user_id: user.id,
      title: cvData.title,
      template_id: cvData.template_id,
      personal_info: cvData.personal_info,
      summary: cvData.summary,
      work_experience: cvData.work_experience,
      education: cvData.education,
      skills: cvData.skills,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCV(cvId: string, cvData: Partial<CVData>) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('resumes')
    .update(cvData)
    .eq('id', cvId)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getCV(cvId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('id', cvId)
    .eq('user_id', user.id)
    .single()

  if (error) throw error
  return data
}

export async function listCVs() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const { data, error } = await supabase
    .from('resumes')
    .select('id, title, template_id, created_at, updated_at')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data
}
