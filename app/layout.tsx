import type { Metadata } from 'next'
import { Source_Sans_3, Playfair_Display } from 'next/font/google'

import './globals.css'
import { SITE, siteTitle } from '@/lib/seo'
import { JsonLd, organizationSchema, websiteSchema } from '@/lib/structured-data'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: siteTitle(),
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  keywords: [
    'business consulting',
    'business plan evaluation',
    'business strategy',
    'risk evaluation',
    'marketing strategy',
    'startup consulting',
    'sustainability strategy',
  ],
  alternates: {
    canonical: `${SITE.url}/`,
  },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: siteTitle(),
    description: SITE.description,
    url: `${SITE.url}/`,
    locale: SITE.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle(),
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.jpg', type: 'image/jpeg' },
    ],
    shortcut: '/icon-32.png',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  category: 'business',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
      </body>
    </html>
  )
}
