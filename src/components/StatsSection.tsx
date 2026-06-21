'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 10, suffix: '+', label: 'Év tapasztalat' },
  { value: 69, suffix: '', label: 'Google értékelés' },
  { value: 4.6, suffix: '★', label: 'Átlagos értékelés', decimal: true },
  { value: 1000, suffix: '+', label: 'Elégedett ügyfél' },
]

export function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 75%',
        onEnter: () => setAnimated(true),
      })
      gsap.fromTo(
        '.stat-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
          },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="section"
      style={{
        background: 'var(--accent)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Diagonal top edge */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'var(--surface)',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'var(--bg)',
          clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'rgba(0,0,0,0.1)',
          }}
        >
          {STATS.map((stat, i) => (
            <StatItem
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              decimal={stat.decimal}
              animated={animated}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

function StatItem({
  value,
  suffix,
  label,
  decimal,
  animated,
}: {
  value: number
  suffix: string
  label: string
  decimal?: boolean
  animated: boolean
}) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!animated || started.current) return
    started.current = true

    const start = 0
    const duration = 1400
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = start + (value - start) * eased
      setCount(decimal ? Math.round(current * 10) / 10 : Math.floor(current))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [animated, value, decimal])

  return (
    <div
      className="stat-item"
      style={{
        background: 'var(--accent)',
        padding: 'clamp(32px, 4vw, 60px) clamp(24px, 3vw, 40px)',
        textAlign: 'center',
        opacity: 0,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display), sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(48px, 6vw, 80px)',
          lineHeight: 0.9,
          color: 'var(--bg)',
          letterSpacing: '-0.02em',
        }}
      >
        {decimal ? count.toFixed(1) : count}
        <span style={{ fontSize: '0.6em' }}>{suffix}</span>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-condensed), sans-serif',
          fontWeight: 600,
          fontSize: '11px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(7,6,5,0.6)',
          marginTop: '12px',
        }}
      >
        {label}
      </div>
    </div>
  )
}
