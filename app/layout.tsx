import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Meeting Assistant - AI-Powered Meeting Management',
  description: 'AI-powered meeting assistant with DeepSeek integration for teams and enterprises',
  keywords: ['meeting', 'ai', 'deepseek', 'collaboration', 'productivity', 'team'],
  authors: [{ name: 'yksanjo' }],
  creator: 'yksanjo',
  publisher: 'Meeting Assistant',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://meeting-assistant.vercel.app',
    title: 'Meeting Assistant - AI-Powered Meeting Management',
    description: 'AI-powered meeting assistant with DeepSeek integration for teams and enterprises',
    siteName: 'Meeting Assistant',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Meeting Assistant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meeting Assistant - AI-Powered Meeting Management',
    description: 'AI-powered meeting assistant with DeepSeek integration for teams and enterprises',
    images: ['/og-image.png'],
    creator: '@yksanjo',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}