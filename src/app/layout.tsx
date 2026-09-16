import type { Metadata } from 'next'
import { Fraunces, Manrope } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'

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
  title: 'Varga Gumi – Szikszó | Prémium gumiszerviz',
  description:
    'Prémium gumiszerviz Szikszón. Gumiszerelés, defektjavítás, centrírozás, futómű beállítás. Kassai út 52.',
  keywords: [
    'gumiszerviz szikszó',
    'gumiszerelés szikszó',
    'defektjavítás',
    'centrírozás',
    'futómű beállítás',
    'varga gumi',
  ],
  openGraph: {
    title: 'Varga Gumi – Szikszó',
    description: 'Prémium gumiszerviz Szikszón. Kassai út 52.',
    locale: 'hu_HU',
    type: 'website',
  },
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
