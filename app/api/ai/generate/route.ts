import { generateText } from 'ai'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { type, content, language = 'en' } = await request.json()

    if (!type || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let prompt = ''
    const languageMap: { [key: string]: string } = {
      en: 'English',
      es: 'Spanish',
      de: 'German',
    }
    const lang = languageMap[language] || 'English'

    switch (type) {
      case 'summary':
        prompt = `Generate a professional resume summary in ${lang} based on this information: ${content}. Keep it concise (2-3 sentences) and impactful. Do not include the person's name. Only return the summary text, nothing else.`
        break
      case 'experience':
        prompt = `Rewrite this job experience description in ${lang} to be more impactful and professional for a resume: ${content}. Use action verbs and quantify achievements where possible. Keep it to 2-3 bullet points. Only return the rewritten description, nothing else.`
        break
      case 'skills':
        prompt = `Based on this background: ${content}, suggest 10 relevant professional skills in ${lang} for a resume. Return as a comma-separated list, nothing else.`
        break
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    }

    const result = await generateText({
      model: 'openai/gpt-4o-mini',
      prompt,
      temperature: 0.7,
      maxTokens: 500,
    })

    return NextResponse.json({ generated: result.text })
  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
