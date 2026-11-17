import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { AboutPanel } from '@/components/AboutPanel'
import { ServicesGrid } from '@/components/ServicesGrid'
import { ReviewsCarousel } from '@/components/ReviewsCarousel'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { CookieConsentBanner } from '@/components/CookieConsentBanner'
import { FaqSection } from '@/components/FaqSection'
import { FAQ } from '@/lib/faq'
import { SITE_NAME, SITE_URL } from '@/lib/site'

const GOOGLE_PROFILE =
  'https://www.google.com/maps/place/Varga+Gumi+%26+Aut%C3%B3szerviz+Sziksz%C3%B3/@48.2010955,20.9335973,17z/data=!3m1!4b1!4m6!3m5!1s0x473f5daca5ca358b:0xa63d9a02ce34bcf0!8m2!3d48.2010955!4d20.9335973!16s%2Fg%2F1v9gt6w9'

const SERVICES = [
  'Gumiabroncs szerelése',
  'Defektjavítás',
  'Centrírozás',
  'Futómű-beállítás',
  'Gumitárolás',
  'Új gumi értékesítés',
  'Szelepcsere és TPMS',
]

// Strukturált cégadat a Google-nek. Értékelés szándékosan nincs benne (saját oldalon a Google nem fogadja el).
const business = {
  '@type': 'TireShop',
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  legalName: 'Anibal Kft.',
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  telephone: '+36 46 796 692',
  email: 'anibalkftiroda@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kassai út 52.',
    addressLocality: 'Szikszó',
    postalCode: '3800',
    addressCountry: 'HU',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 48.2010955, longitude: 20.9335973 },
  hasMap: GOOGLE_PROFILE,
  sameAs: [GOOGLE_PROFILE],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Szolgáltatások',
    itemListElement: SERVICES.map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '17:00',
    },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '07:00', closes: '12:00' },
  ],
}

const faqPage = {
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const jsonLd = { '@context': 'https://schema.org', '@graph': [business, faqPage] }

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <AboutPanel />
        <ServicesGrid />
        <ReviewsCarousel />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <CookieConsentBanner />
    </>
  )
}
