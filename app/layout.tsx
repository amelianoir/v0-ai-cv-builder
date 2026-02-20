import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ResumeAI - AI-Powered CV Builder | Create Professional Resumes Fast',
  description: 'Create professional resumes in minutes with AI-powered writing, beautiful templates, and instant PDF export. One-time ($1.99) or monthly ($13.99) plans. GDPR compliant.',
  keywords: ['resume builder', 'CV builder', 'AI resume', 'professional resume', 'job application', 'resume template'],
  generator: 'v0.app',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://resumeai.app'),
  authors: [{ name: 'ResumeAI' }],
  openGraph: {
    title: 'ResumeAI - AI-Powered CV Builder',
    description: 'Create a stunning professional resume with AI assistance in just minutes.',
    type: 'website',
    url: 'https://resumeai.app',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ResumeAI - AI Resume Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeAI - AI-Powered CV Builder',
    description: 'Create professional resumes with AI in minutes',
    images: ['/og-image.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    userScalable: false,
    themeColor: '#000000',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                    send_page_view: true,
                  });
                `,
              }}
            />
          </>
        )}
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
