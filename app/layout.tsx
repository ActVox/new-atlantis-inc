import type { Metadata } from 'next'
import { Source_Sans_3, Playfair_Display } from 'next/font/google'

import './globals.css'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'New Atlantis Inc - Your Route Map to Business Success',
  description:
    'New Atlantis Inc provides expert business consulting, planning, and analysis to help startups and established companies succeed.',
  icons: {
    icon: '/favicon.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
