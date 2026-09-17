import type { Metadata, Viewport } from 'next'
import { Fraunces, Manrope } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'

const fraunces = Fraunces({
  variable: '--font-display',
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
})

const manrope = Manrope({
  variable: '--font-body',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Varga Gumi – Gumiszerviz Szikszón',
    template: '%s – Varga Gumi',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'gumiszerviz szikszó',
    'gumiszerelés szikszó',
    'defektjavítás',
    'centrírozás',
    'futómű-beállítás',
    'gumitárolás',
    'varga gumi',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Varga Gumi – Gumiszerviz Szikszón',
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    locale: 'hu_HU',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: '#F3EDE3',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="hu"
      data-theme="light"
      className={`${fraunces.variable} ${manrope.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
