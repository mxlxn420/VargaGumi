import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LoadingOverlay from './components/LoadingOverlay'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import HeroSection from './components/HeroSection'
import MarqueeTicker from './components/MarqueeTicker'
import StickySection from './components/StickySection'
import ServicesGrid from './components/ServicesGrid'
import StatsSection from './components/StatsSection'
import ReviewsSection from './components/ReviewsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)

    return () => { lenis.destroy() }
  }, [])

  return (
    <>
      <LoadingOverlay />
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeTicker />

        {/* Sticky 3D scroll section */}
        <StickySection />

        {/* Services grid — diagonal clip-path entry */}
        <div id="services">
          <ServicesGrid />
        </div>

        {/* Stats — diagonal clip-path, overlaps ServicesGrid bottom */}
        <StatsSection />

        {/* Reviews */}
        <div id="reviews">
          <ReviewsSection />
        </div>

        {/* Contact */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}
