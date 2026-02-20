import Groq from 'groq-sdk'

export function getGroqClient() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not set')
  }
  return new Groq({ apiKey: process.env.GROQ_API_KEY })
}

export const GROQ_MODEL = 'mixtral-8x7b-32768'
