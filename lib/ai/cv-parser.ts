import { getGroqClient, GROQ_MODEL } from './groq-client'
import { z } from 'zod'

export const CVDataSchema = z.object({
  personal: z.object({
    name: z.string(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
  }),
  summary: z.string().optional(),
  experience: z.array(
    z.object({
      position: z.string(),
      company: z.string(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      description: z.array(z.string()).optional(),
    })
  ).optional(),
  education: z.array(
    z.object({
      degree: z.string(),
      school: z.string(),
      field: z.string().optional(),
      graduationDate: z.string().optional(),
    })
  ).optional(),
  skills: z.array(z.string()).optional(),
})

export type CVData = z.infer<typeof CVDataSchema>

export async function parseCV(cvText: string): Promise<CVData> {
  const groq = getGroqClient()

  const message = await groq.messages.create({
    model: GROQ_MODEL,
    max_tokens: 2048,
    system: `You are a professional CV parsing assistant. Extract and structure CV data into valid JSON.
    
Return ONLY valid JSON matching this schema:
{
  "personal": { "name": "string", "email": "string", "phone": "string", "location": "string" },
  "summary": "string",
  "experience": [{ "position": "string", "company": "string", "startDate": "string", "endDate": "string", "description": ["string"] }],
  "education": [{ "degree": "string", "school": "string", "field": "string", "graduationDate": "string" }],
  "skills": ["string"]
}

Be thorough in extracting all information. For dates, use format: "Jan 2020" or "2020".`,
    messages: [
      {
        role: 'user',
        content: `Parse this CV and extract structured data:\n\n${cvText}`,
      },
    ],
  })

  try {
    const content = message.content[0]
    if (content.type !== 'text') throw new Error('Expected text response')

    // Extract JSON from the response (might have markdown formatting)
    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON found in response')

    const parsedData = JSON.parse(jsonMatch[0])
    return CVDataSchema.parse(parsedData)
  } catch (error) {
    console.error('[CV Parser Error]:', error)
    throw new Error(`Failed to parse CV: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function enhanceExperience(description: string): Promise<string> {
  const groq = getGroqClient()

  const message = await groq.messages.create({
    model: GROQ_MODEL,
    max_tokens: 512,
    system: `You are a professional CV writer. Improve job descriptions with strong action verbs and impact metrics.
    
Return ONLY the improved bullet point, no explanations.`,
    messages: [
      {
        role: 'user',
        content: `Improve this job description with action verbs and quantified impact:\n\n${description}`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Expected text response')
  return content.text.trim()
}

export async function generateSummary(cvData: CVData): Promise<string> {
  const groq = getGroqClient()

  const cvInfo = `
Name: ${cvData.personal.name}
Experience: ${cvData.experience?.map((e) => `${e.position} at ${e.company}`).join(', ')}
Skills: ${cvData.skills?.join(', ')}
  `.trim()

  const message = await groq.messages.create({
    model: GROQ_MODEL,
    max_tokens: 256,
    system: `You are a professional CV writer. Generate a compelling 3-4 sentence professional summary based on the provided career information.
    
Return ONLY the summary text, no explanations or formatting.`,
    messages: [
      {
        role: 'user',
        content: `Generate a professional summary based on this information:\n\n${cvInfo}`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Expected text response')
  return content.text.trim()
}
