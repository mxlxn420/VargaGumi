import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const WORDS = [
  'GUMISZERELÉS', 'KERÉKCSERE', 'CENTRÍROZÁS', 'GUMITÁROLÁS',
  'NITROGÉN TÖLTÉS', 'KERÉKEGYENSÚLYOZÁS', 'NYOMÁSELLENŐRZÉS', 'PRECIZITÁS',
]

const SEP = (
  <span style={{ margin: '0 28px', opacity: 0.55, fontSize: 10 }}>◆</span>
)

export default function MarqueeTicker() {
  const trackRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const track = trackRef.current!
    // Wait for layout then measure
    requestAnimationFrame(() => {
      const fullWidth = track.scrollWidth / 2
      animRef.current = gsap.to(track, {
        x: -fullWidth,
        duration: 28,
        ease: 'none',
        repeat: -1,
      })
    })
    return () => { animRef.current?.kill() }
  }, [])

  // Duplicate for seamless loop
  const items = [...WORDS, ...WORDS]

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#e63700',
        overflow: 'hidden',
        paddingBlock: 13,
        borderTop: '1px solid rgba(0,0,0,0.18)',
        borderBottom: '1px solid rgba(0,0,0,0.18)',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {items.map((word, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 17,
                letterSpacing: '0.2em',
                color: '#080400',
                paddingInline: 8,
              }}
            >
              {word}
            </span>
            {SEP}
          </span>
        ))}
      </div>
    </div>
  )
}
