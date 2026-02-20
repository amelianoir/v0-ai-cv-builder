import { NextRequest, NextResponse } from 'next/server'
import { getGroqClient, GROQ_MODEL } from '@/lib/ai/groq-client'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { section, content } = await request.json()

    if (!section || !content) {
      return NextResponse.json(
        { error: 'section and content are required' },
        { status: 400 }
      )
    }

    // Get authenticated user
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const groq = getGroqClient()

    let systemPrompt = ''
    let userPrompt = ''

    if (section === 'experience') {
      systemPrompt = `You are a professional CV writer. Improve job descriptions with strong action verbs and quantified impact. 
Make the content more compelling and achievement-focused.`
      userPrompt = `Improve this job description:\n\n${content}`
    } else if (section === 'summary') {
      systemPrompt = `You are a professional CV writer. Generate a compelling 3-4 sentence professional summary that highlights key strengths and career focus.`
      userPrompt = `Generate a professional summary based on:\n\n${content}`
    } else if (section === 'skills') {
      systemPrompt = `You are a professional CV writer. Enhance and suggest additional relevant skills based on the provided ones.`
      userPrompt = `Enhance and suggest skills based on:\n\n${content}`
    } else {
      systemPrompt = `You are a professional CV writer. Improve and enhance this CV section.`
      userPrompt = `Improve this section:\n\n${content}`
    }

    console.log('[v0] Starting streaming enhancement for section:', section)

    // Create streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const stream = await groq.messages.stream({
            model: GROQ_MODEL,
            max_tokens: 512,
            system: systemPrompt,
            messages: [{ role: 'user', content: userPrompt }],
          })

          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta?.type === 'text_delta'
            ) {
              const text = chunk.delta.text || ''
              controller.enqueue(new TextEncoder().encode(text))
              console.log('[v0] Streamed token:', text)
            }
          }

          controller.close()
        } catch (error) {
          console.error('[v0] Stream error:', error)
          controller.error(error)
        }
      },
    })

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('[Enhance Section Error]:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to enhance section' },
      { status: 500 }
    )
  }
}
