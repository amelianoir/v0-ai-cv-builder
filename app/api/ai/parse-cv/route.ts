import { NextRequest, NextResponse } from 'next/server'
import { parseCV } from '@/lib/ai/cv-parser'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { cvText } = await request.json()

    if (!cvText || typeof cvText !== 'string') {
      return NextResponse.json(
        { error: 'cvText is required and must be a string' },
        { status: 400 }
      )
    }

    // Get authenticated user
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      )
    }

    // Parse CV with Groq
    console.log('[v0] Parsing CV with Groq...')
    const parsedData = await parseCV(cvText)
    console.log('[v0] CV parsed successfully:', parsedData)

    return NextResponse.json({
      success: true,
      data: parsedData,
    })
  } catch (error) {
    console.error('[Parse CV Error]:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to parse CV' },
      { status: 500 }
    )
  }
}
