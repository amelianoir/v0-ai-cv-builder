import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CVDesign.Online - AI-Powered CV Builder | Professional Resumes in Minutes',
  description: 'Create stunning professional CVs with AI-powered suggestions, 6 premium templates, and instant PDF export. Starting at €1.99. GDPR compliant, secure, and fully private.',
  keywords: ['CV builder', 'resume builder', 'AI CV generator', 'professional resume templates', 'job application', 'career tools', 'resume writing', 'cv templates'],
  generator: 'v0.app',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://cvdesign.online'),
  authors: [{ name: 'CVDesign.Online' }],
  openGraph: {
    title: 'CVDesign.Online - AI-Powered CV Builder',
    description: 'Create a stunning professional CV with AI assistance and premium templates.',
    type: 'website',
    url: 'https://cvdesign.online',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CVDesign.Online - Professional CV Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CVDesign.Online - AI-Powered CV Builder',
    description: 'Build professional CVs with AI. Premium templates. Instant PDF export.',
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
