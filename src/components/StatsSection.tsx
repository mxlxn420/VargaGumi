import { useEffect, useRef, useState } from 'react'
import { useIsMobile } from '../hooks/useBreakpoint'

interface StatItem {
  from: number
  to: number
  suffix: string
  prefix: string
  label: string
  sub: string
}

const STATS: StatItem[] = [
  { from: 0, to: 69, suffix: '', prefix: '', label: 'Google értékelés', sub: '★★★★★' },
  { from: 0, to: 10, suffix: '+', prefix: '', label: 'Év tapasztalat', sub: 'a szakmában' },
  { from: 7, to: 17, suffix: '', prefix: '', label: 'Nyitvatartás', sub: 'hétköznap' },
  { from: 0, to: 100, suffix: '%', prefix: '', label: 'Elégedett ügyfél', sub: 'visszatér' },
]

function useCountUp(from: number, to: number, active: boolean, duration = 1600) {
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!active) return
    const startTime = performance.now()
    const diff = to - from

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + diff * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [active, from, to, duration])

  return value
}

interface StatCardProps {
  stat: StatItem
  index: number
  active: boolean
}

function StatCard({ stat, index, active }: StatCardProps) {
  const value = useCountUp(stat.from, stat.to, active, 1400 + index * 150)

  // Special display for 7–17 (show range when done)
  const displayValue = stat.label === 'Nyitvatartás'
    ? (active ? (value < 17 ? `${value}` : '7–17') : '7')
    : `${value}`

  return (
    <div
      style={{
        padding: 'clamp(32px, 4vw, 56px) clamp(20px, 4vw, 48px)',
        borderRight: index < 3 ? '1px solid rgba(255,255,255,0.12)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {/* Big number */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(64px, 7vw, 96px)',
        letterSpacing: '0.02em',
        lineHeight: 1,
        color: '#080400',
        display: 'flex',
        alignItems: 'baseline',
        gap: 4,
      }}>
        <span>{stat.prefix}</span>
        <span>{displayValue}</span>
        <span style={{ fontSize: '0.52em', letterSpacing: '0.04em' }}>{stat.suffix}</span>
      </div>

      {/* Label */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 18,
        letterSpacing: '0.1em',
        color: 'rgba(8,4,0,0.7)',
        textTransform: 'uppercase',
        marginTop: 4,
      }}>
        {stat.label}
      </div>

      {/* Sub */}
      <div style={{
        fontFamily: 'var(--font-condensed)',
        fontWeight: 300,
        fontSize: 13,
        letterSpacing: '0.12em',
        color: 'rgba(8,4,0,0.5)',
        textTransform: 'uppercase',
      }}>
        {stat.sub}
      </div>
    </div>
  )
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#e63700',
        clipPath: 'polygon(0 5%, 100% 0, 100% 95%, 0 100%)',
        marginTop: '-4vw',
        paddingTop: 'calc(4vw + 60px)',
        paddingBottom: 'calc(4vw + 60px)',
      }}
    >
      {/* Label */}
      <div style={{
        textAlign: 'center',
        marginBottom: 8,
        fontFamily: 'var(--font-condensed)',
        fontSize: 11,
        letterSpacing: '0.3em',
        color: 'rgba(8,4,0,0.55)',
        textTransform: 'uppercase',
      }}>
        — Számokban —
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        borderTop: '1px solid rgba(8,4,0,0.12)',
        borderBottom: '1px solid rgba(8,4,0,0.12)',
        marginTop: 20,
      }}>
        {STATS.map((stat, i) => (
          <StatCard key={i} stat={stat} index={i} active={active} />
        ))}
      </div>

      {/* Bottom line */}
      <div style={{
        textAlign: 'center',
        marginTop: 48,
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(22px, 3vw, 38px)',
        letterSpacing: '0.1em',
        color: 'rgba(8,4,0,0.22)',
      }}>
        VARGA GUMI — SZIKSZÓ
      </div>
    </section>
  )
}
