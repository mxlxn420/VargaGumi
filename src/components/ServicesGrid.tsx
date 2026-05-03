import { useEffect, useRef, forwardRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile } from '../hooks/useBreakpoint'

gsap.registerPlugin(ScrollTrigger)

const ICONS = [
  // 01 — wheel/tire
  <svg key="1" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" width={34} height={34}>
    <circle cx="24" cy="24" r="18" /><circle cx="24" cy="24" r="7" />
    <line x1="24" y1="6" x2="24" y2="17" /><line x1="24" y1="31" x2="24" y2="42" />
    <line x1="6" y1="24" x2="17" y2="24" /><line x1="31" y1="24" x2="42" y2="24" />
    <line x1="10.5" y1="10.5" x2="18" y2="18" /><line x1="30" y1="30" x2="37.5" y2="37.5" />
    <line x1="37.5" y1="10.5" x2="30" y2="18" /><line x1="18" y1="30" x2="10.5" y2="37.5" />
  </svg>,
  // 02 — seasonal / arrows
  <svg key="2" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={34} height={34}>
    <path d="M8 24 C8 14.6 14.6 7 24 7" /><polyline points="24,7 20,13 28,13" />
    <path d="M40 24 C40 33.4 33.4 41 24 41" /><polyline points="24,41 28,35 20,35" />
    <line x1="16" y1="24" x2="32" y2="24" strokeOpacity="0.3" />
  </svg>,
  // 03 — puncture repair
  <svg key="3" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" width={34} height={34}>
    <circle cx="24" cy="24" r="16" />
    <circle cx="24" cy="24" r="4" />
    <path d="M24 8 Q30 16 30 24 Q30 32 24 40" strokeDasharray="3 3" />
    <line x1="14" y1="14" x2="34" y2="34" strokeOpacity="0.3" />
  </svg>,
  // 04 — balance/centering
  <svg key="4" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" width={34} height={34}>
    <circle cx="24" cy="24" r="18" strokeOpacity="0.3" />
    <circle cx="24" cy="24" r="10" />
    <circle cx="24" cy="24" r="2.5" fill="currentColor" />
    <line x1="24" y1="6" x2="24" y2="14" /><line x1="24" y1="34" x2="24" y2="42" />
    <line x1="6" y1="24" x2="14" y2="24" /><line x1="34" y1="24" x2="42" y2="24" />
  </svg>,
  // 05 — wrench
  <svg key="5" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={34} height={34}>
    <path d="M34.5 7a7.5 7.5 0 0 0-7.5 7.5c0 1 .2 2 .5 2.8L10 35a3.5 3.5 0 0 0 4.9 4.9l17.2-17.5c.9.4 1.8.6 2.8.6a7.5 7.5 0 0 0 0-15z" />
    <circle cx="34.5" cy="14.5" r="2.5" fill="currentColor" />
  </svg>,
]

const SERVICES = [
  { n: '01', title: 'Gumiszerelés & csere', desc: 'Személyautó, SUV és kisteher abroncsok gyors, precíz felszerelése minden méretben.' },
  { n: '02', title: 'Szezonális kerékcsere', desc: 'Nyári és téli gumik cseréje bejelentkezés nélkül is — raktározással együtt.' },
  { n: '03', title: 'Defektjavítás', desc: 'Lyukas gumi azonnali javítása, belső cső csere és nyomásellenőrzés minden típushoz.' },
  { n: '04', title: 'Felnijavítás & centrírozás', desc: 'Digitális kerékegyensúlyozás és alumíniumfelni javítás precíziós műszerparkkal.' },
  { n: '05', title: 'Futómű állítás', desc: 'Gépi kerékállítás és futómű beállítás — egyenes irányban, egyenletesen kopó gumikért.' },
]

interface CardProps {
  n: string
  title: string
  desc: string
  icon: React.ReactNode
}

const ServiceCard = forwardRef<HTMLDivElement, CardProps>(({ n, title, desc, icon }, ref) => {
  const borderRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      data-cursor="hover"
      style={{ background: '#0a0602', padding: '44px 36px', position: 'relative', cursor: 'none', overflow: 'hidden', transition: 'background 0.3s' }}
      onMouseEnter={() => {
        gsap.to(borderRef.current, { scaleX: 1, duration: 0.34, ease: 'power2.out' })
      }}
      onMouseLeave={() => {
        gsap.to(borderRef.current, { scaleX: 0, duration: 0.24, ease: 'power2.in' })
      }}
      onMouseOver={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#110b04' }}
      onMouseOut={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#0a0602' }}
    >
      {/* Ghost number */}
      <div style={{ position: 'absolute', top: 20, right: 28, fontFamily: 'var(--font-display)', fontSize: 56, color: 'rgba(240,235,228,0.04)', letterSpacing: '0.04em', lineHeight: 1, userSelect: 'none' }}>
        {n}
      </div>

      {/* Icon */}
      <div style={{ color: 'var(--accent)', marginBottom: 22 }}>{icon}</div>

      {/* Title */}
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, letterSpacing: '0.04em', color: 'var(--text)', marginBottom: 14, lineHeight: 1.1 }}>
        {title}
      </div>

      {/* Desc */}
      <p style={{ fontFamily: 'var(--font-condensed)', fontWeight: 300, fontSize: 14, lineHeight: 1.75, color: 'var(--text-dim)', letterSpacing: '0.02em', margin: 0 }}>
        {desc}
      </p>

      {/* Hover bottom border */}
      <div ref={borderRef} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'var(--accent)', transform: 'scaleX(0)', transformOrigin: 'left' }} />
    </div>
  )
})
ServiceCard.displayName = 'ServiceCard'

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const isMobile = useIsMobile()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current.filter(Boolean), {
        y: 60,
        opacity: 0,
        duration: 0.78,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#0a0602',
        clipPath: 'polygon(0 5%, 100% 0, 100% 100%, 0 100%)',
        marginTop: '-4vw',
        paddingTop: 'calc(4vw + 90px)',
        paddingBottom: isMobile ? 60 : 110,
        paddingInline: isMobile ? 20 : 48,
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: isMobile ? 36 : 60, display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: 8 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18, fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: '0.28em', color: 'var(--accent)', textTransform: 'uppercase' as const }}>
            <span style={{ display: 'block', width: 22, height: 1, background: 'var(--accent)' }} />
            Szolgáltatásaink
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5vw, 70px)', letterSpacing: '0.04em', lineHeight: 1, color: 'var(--text)', margin: 0 }}>
            MINDEN, AMIRE<br />SZÜKSÉGED VAN.
          </h2>
        </div>
        <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 13, letterSpacing: '0.16em', color: 'var(--text-dim)', textTransform: 'uppercase' as const, paddingBottom: 8 }}>
          5 szerviz&nbsp;/&nbsp;1 hely
        </div>
      </div>

      {/* Card grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: '1px',
        background: 'rgba(240,235,228,0.06)',
      }}>
        {SERVICES.map((s, i) => (
          <ServiceCard
            key={i}
            ref={(el) => { cardsRef.current[i] = el }}
            n={s.n}
            title={s.title}
            desc={s.desc}
            icon={ICONS[i]}
          />
        ))}
      </div>
    </section>
  )
}
