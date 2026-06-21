import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { AboutPanel } from '@/components/AboutPanel'
import { ServicesGrid } from '@/components/ServicesGrid'
import { ReviewsCarousel } from '@/components/ReviewsCarousel'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { CookieConsentBanner } from '@/components/CookieConsentBanner'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutPanel />
        <ServicesGrid />
        <ReviewsCarousel />
        <ContactSection />
      </main>
      <Footer />
      <CookieConsentBanner />
    </>
  )
}
