import { Resend } from 'resend'

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function sendWelcomeEmail(email: string, firstName: string) {
  try {
    const resend = getResend()
    await resend.emails.send({
      from: 'CVDesign.Online <noreply@cvdesign.online>',
      to: email,
      subject: 'Welcome to CVDesign.Online - Create Your Perfect CV',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #7c3aed;">Welcome to CVDesign.Online, ${firstName}!</h1>
          <p>We're excited to have you on board. With CVDesign.Online, you can create a professional CV in just minutes using our AI-powered tools and beautiful templates.</p>
          <h2 style="color: #1f2937;">Here's what you can do:</h2>
          <ul style="line-height: 1.8;">
            <li>✨ Use AI to write compelling job descriptions and summaries</li>
            <li>📄 Choose from 6 professional templates</li>
            <li>📥 Upload your profile photo</li>
            <li>📱 Export as PDF instantly</li>
            <li>🌍 Create CVs in multiple languages</li>
          </ul>
          <p style="margin-top: 30px;">
            <a href="https://cvdesign.online/dashboard" style="background-color: #7c3aed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Get Started</a>
          </p>
          <p style="color: #6b7280; margin-top: 30px; font-size: 12px;">
            If you have any questions, reply to this email or contact us at info@cvdesign.online
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
    const resend = getResend()
    const formattedAmount = (amount / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    })

    await resend.emails.send({
      from: 'CVDesign.Online <receipts@cvdesign.online>',
      to: email,
      subject: `Receipt: ${planName} Plan - CVDesign.Online`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #7c3aed;">Purchase Confirmation</h1>
          <p>Thank you for your purchase! Your transaction has been completed successfully.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Plan:</strong> ${planName}</p>
            <p><strong>Amount:</strong> ${formattedAmount}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          <p style="margin-top: 20px;">You now have access to all the features of the ${planName} plan. Head to your dashboard to start creating CVs!</p>
          
          <p style="margin-top: 30px;">
            <a href="https://cvdesign.online/dashboard" style="background-color: #7c3aed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Go to Dashboard</a>
          </p>

          <p style="color: #6b7280; margin-top: 30px; font-size: 12px;">
            Questions? Check out our <a href="https://cvdesign.online/refund">refund policy</a> or contact info@cvdesign.online
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
    const resend = getResend()
    await resend.emails.send({
      from: 'CVDesign.Online <noreply@cvdesign.online>',
      to: email,
      subject: 'Verify Your Email - CVDesign.Online',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #7c3aed;">Verify Your Email</h1>
          <p>Welcome to CVDesign.Online! Please verify your email address to get started.</p>
          <p style="margin-top: 20px;">
            <a href="https://cvdesign.online/auth/verify?email=${encodeURIComponent(email)}" style="background-color: #7c3aed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
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
