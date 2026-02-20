import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactRequest {
  name: string
  email: string
  subject: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    // Initialize Resend only when the API is called, not at build time
    const resend = new Resend(process.env.RESEND_API_KEY)

    const body: ContactRequest = await request.json()

    const { name, email, subject, message } = body

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send email to support team
    await resend.emails.send({
      from: 'CVDesign.Online <noreply@cvdesign.online>',
      to: 'info@cvdesign.online',
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    })

    // Send confirmation email to user
    await resend.emails.send({
      from: 'CVDesign.Online <noreply@cvdesign.online>',
      to: email,
      subject: 'We received your message - CVDesign.Online',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and will get back to you as soon as possible.</p>
        <hr />
        <p><strong>Your message:</strong></p>
        <p>${subject}</p>
        <hr />
        <p>Best regards,<br />The CVDesign.Online Team</p>
        <p style="color: #666; font-size: 12px;">
          If you need urgent assistance, please reply to this email or send a new message with "URGENT" in the subject line.
        </p>
      `,
    })

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[Contact API Error]:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
