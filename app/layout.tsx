import type { Metadata } from 'next'
import { Newsreader, Public_Sans } from 'next/font/google'

import './globals.css'
import { SITE, SITE_ICONS, siteTitle } from '@/lib/seo'
import { JsonLd, organizationSchema, websiteSchema } from '@/lib/structured-data'

/**
 * Two faces, per DESIGN.md: Newsreader reads (headings, prose), Public Sans
 * operates (nav, buttons, forms). `axes: ['opsz']` is what makes Newsreader
 * a real optical-size family on the web — without it Google pins opsz at 16
 * and display sizes lose their contrast. Never pair `axes` with a fixed
 * `weight`; next/font rejects the combination.
 */
const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-newsreader',
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
  icons: SITE_ICONS,
  category: 'business',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${publicSans.variable} ${newsreader.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        {children}
      </body>
    </html>
  )
}
