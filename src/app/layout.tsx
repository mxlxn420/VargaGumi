import type { Metadata } from 'next'
import { Playfair_Display, Barlow_Condensed, Barlow } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  variable: '--font-condensed',
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
})

const barlow = Barlow({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500'],
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
      className={`${playfair.variable} ${barlowCondensed.variable} ${barlow.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
