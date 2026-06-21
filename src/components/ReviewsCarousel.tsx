'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const REVIEWS = [
  { name: 'Kovács Péter', rating: 5, date: '2025. március', text: 'Nagyon profik. Gyors, pontos munka, kedves kiszolgálás. Évek óta ide járok és soha nem volt gondom.' },
  { name: 'Tóth Éva', rating: 5, date: '2025. február', text: 'Téli gumicsere percek alatt megvolt. Ár-érték arány kiváló, mindenkinek ajánlom!' },
  { name: 'Nagy Zoltán', rating: 5, date: '2025. január', text: 'Defektem volt az autópályán, gyorsan megoldották. Barátságos személyzet, megbízható munka.' },
  { name: 'Szabó Ildikó', rating: 5, date: '2024. december', text: 'Futómű-beállítás után sokkal stabilabb lett az autóm. Szakértő munka, megérte az árat.' },
  { name: 'Kiss Gábor', rating: 4, date: '2024. november', text: 'Megbízható szerviz, helyi vállalkozás ami mögött valódi tudás áll. Visszatérő ügyfél vagyok.' },
  { name: 'Farkas Mária', rating: 5, date: '2024. október', text: 'Centrírozás után eltűntek a rezgések. Pontosan elvégzett munka, gyors kiszolgálás.' },
  { name: 'Fekete Béla', rating: 5, date: '2024. szeptember', text: 'Mindig ide hozom az autómat. Becsületes árak, igényes munka. Csak ajánlani tudom!' },
]

const CARD_W = 300
const CARD_GAP = 12

export function ReviewsCarousel() {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.rv-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.rv-header', start: 'top 80%' } }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const totalW = REVIEWS.length * (CARD_W + CARD_GAP)
  const dragLeft = -(totalW - (typeof window !== 'undefined' ? Math.min(window.innerWidth, 1280) : 1000) + 80)

  return (
    <section
      id="reviews"
      ref={ref}
      style={{
        background: 'var(--surface)',
        padding: 'clamp(80px, 12vw, 160px) 0',
        borderTop: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          className="rv-header"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '48px',
            flexWrap: 'wrap',
            gap: '20px',
            opacity: 0,
          }}
        >
          <div>
            <p className="label" style={{ marginBottom: '16px' }}>Vélemények</p>
            <h2
              style={{
                fontFamily: 'var(--font-display), serif',
                fontWeight: 900,
                fontSize: 'clamp(36px, 6vw, 72px)',
                textTransform: 'none',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: 'var(--text)',
              }}
            >
              Ügyfelek mondják
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Stars count={5} size={14} />
            <span style={{ fontFamily: 'var(--font-display), serif', fontWeight: 900, fontSize: '28px', color: 'var(--text)', lineHeight: 1 }}>4.6</span>
            <span style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '11px', color: 'var(--text-dim)', letterSpacing: '0.08em' }}>/ 69 értékelés</span>
          </div>
        </div>
      </div>

      <p style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '20px' }}>
        Húzza balra
      </p>

      <motion.div
        style={{
          display: 'flex',
          gap: `${CARD_GAP}px`,
          x,
          cursor: dragging ? 'grabbing' : 'grab',
          paddingLeft: 'var(--px)',
          paddingRight: 'var(--px)',
          width: 'max-content',
        }}
        drag="x"
        dragConstraints={{ left: dragLeft, right: 0 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
      >
        {REVIEWS.map((r, i) => (
          <ReviewCard key={i} {...r} />
        ))}
      </motion.div>
    </section>
  )
}

function ReviewCard({ name, rating, date, text }: { name: string; rating: number; date: string; text: string }) {
  return (
    <div
      style={{
        width: `${CARD_W}px`,
        flexShrink: 0,
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        userSelect: 'none',
      }}
    >
      <Stars count={rating} size={12} />
      <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.75, flex: 1 }}>
        &ldquo;{text}&rdquo;
      </p>
      <div>
        <div style={{ fontFamily: 'var(--font-display), serif', fontWeight: 800, fontSize: '15px', color: 'var(--text)', marginBottom: '2px' }}>{name}</div>
        <div style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{date}</div>
      </div>
    </div>
  )
}

function Stars({ count, size }: { count: number; size: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < count ? 'var(--accent)' : 'var(--text-muted)'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}
