import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(email: string, firstName: string) {
  try {
    await resend.emails.send({
      from: 'ResumeAI <noreply@resumeai.com>',
      to: email,
      subject: 'Welcome to ResumeAI - Create Your Perfect Resume',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to ResumeAI, ${firstName}!</h1>
          <p>We're excited to have you on board. With ResumeAI, you can create a professional resume in just minutes using our AI-powered tools and beautiful templates.</p>
          <h2 style="color: #1f2937;">Here's what you can do:</h2>
          <ul style="line-height: 1.8;">
            <li>✨ Use AI to write compelling job descriptions and summaries</li>
            <li>📄 Choose from 6 professional templates</li>
            <li>📥 Upload your profile photo</li>
            <li>📱 Export as PDF instantly</li>
            <li>🌍 Create resumes in multiple languages</li>
          </ul>
          <p style="margin-top: 30px;">
            <a href="https://resumeai.com/dashboard" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Get Started</a>
          </p>
          <p style="color: #6b7280; margin-top: 30px; font-size: 12px;">
            If you have any questions, reply to this email or contact us at support@resumeai.com
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send welcome email:', error)
  }
}

export async function sendReceiptEmail(
  email: string,
  planName: string,
  amount: number,
  currency: string
) {
  try {
    const formattedAmount = (amount / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    })

    await resend.emails.send({
      from: 'ResumeAI <receipts@resumeai.com>',
      to: email,
      subject: `Receipt: ${planName} Plan - ResumeAI`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Purchase Confirmation</h1>
          <p>Thank you for your purchase! Your transaction has been completed successfully.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Plan:</strong> ${planName}</p>
            <p><strong>Amount:</strong> ${formattedAmount}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          <p style="margin-top: 20px;">You now have access to all the features of the ${planName} plan. Head to your dashboard to start creating resumes!</p>
          
          <p style="margin-top: 30px;">
            <a href="https://resumeai.com/dashboard" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Go to Dashboard</a>
          </p>

          <p style="color: #6b7280; margin-top: 30px; font-size: 12px;">
            Questions? Check out our <a href="https://resumeai.com/refund">refund policy</a> or contact support@resumeai.com
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send receipt email:', error)
  }
}

export async function sendConfirmationEmail(email: string) {
  try {
    await resend.emails.send({
      from: 'ResumeAI <noreply@resumeai.com>',
      to: email,
      subject: 'Verify Your Email - ResumeAI',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Verify Your Email</h1>
          <p>Welcome to ResumeAI! Please verify your email address to get started.</p>
          <p style="margin-top: 20px;">
            <a href="https://resumeai.com/auth/verify?email=${encodeURIComponent(email)}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
          </p>
          <p style="color: #6b7280; margin-top: 30px; font-size: 12px;">
            This link expires in 24 hours. If you didn't sign up, you can ignore this email.
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send confirmation email:', error)
  }
}
