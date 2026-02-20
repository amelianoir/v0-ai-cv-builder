import { NextRequest, NextResponse } from 'next/server'
import { generateText } from 'ai'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to text
    let cvText = ''
    if (file.type === 'application/pdf') {
      // For PDF, we'd use a library like pdf-parse
      // For now, return error with instructions
      return NextResponse.json(
        { error: 'PDF parsing requires additional setup. Currently supporting text extraction.' },
        { status: 400 }
      )
    } else if (
      file.type ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      // For DOCX, we'd use a library like docx-parser
      return NextResponse.json(
        { error: 'DOCX parsing requires additional setup. Please convert to text.' },
        { status: 400 }
      )
    } else if (file.type === 'text/plain') {
      cvText = await file.text()
    } else {
      return NextResponse.json({ error: 'Unsupported file format' }, { status: 400 })
    }

    // Use AI to parse CV content
    const result = await generateText({
      model: 'openai/gpt-4o-mini',
      system: `You are an expert CV parser. Extract and structure the following resume into JSON format.
      Return ONLY valid JSON (no markdown, no code blocks) with these fields:
      - personalInfo: { name, email, phone, location, summary }
      - experience: [{ title, company, duration, description }]
      - education: [{ degree, school, year, field }]
      - skills: [string]
      - certifications: [{ name, issuer, year }]
      
      If a field is missing, use empty string or empty array.`,
      prompt: `Parse this resume:\n\n${cvText}`,
    })

    // Parse the AI response
    let parsedData
    try {
      parsedData = JSON.parse(result.text)
    } catch (e) {
      return NextResponse.json(
        { error: 'Failed to parse CV structure' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data: parsedData,
      message: 'CV imported successfully. You can now review and edit the content.',
    })
  } catch (error) {
    console.error('[v0] CV import error:', error)
    return NextResponse.json(
      { error: 'Failed to import CV. Please try again.' },
      { status: 500 }
    )
  }
}
