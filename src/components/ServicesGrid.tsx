'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    title: 'Gumiabroncs szerelése',
    body: 'Személyautó, SUV, kisteherautó — minden méretben. Gyors rögzítés, légnyomás-ellenőrzés.',
  },
  {
    num: '02',
    title: 'Defektjavítás',
    body: 'Lyukas gumi? Pontosan megtaláljuk a hibát és tartósan megjavítjuk, hogy minél hamarabb úton legyen.',
  },
  {
    num: '03',
    title: 'Centrírozás',
    body: 'Rezgő kormány, egyenetlen kopás? Kerék-centrírozással helyreállítjuk az egyensúlyt.',
  },
  {
    num: '04',
    title: 'Futómű szerviz',
    body: 'Precíz futómű-geometria beállítás: egyenes menet, egyenletes gumikopás, biztonságos kanyarozás.',
  },
]

export function ServicesGrid() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.svc-header',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.svc-header', start: 'top 80%' },
        }
      )
      gsap.fromTo(
        '.svc-row',
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: '.svc-list', start: 'top 78%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={ref}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(80px, 12vw, 160px) 0',
      }}
    >
      <div className="container">
        <div
          className="svc-header"
          style={{ marginBottom: 'clamp(48px, 7vw, 80px)', opacity: 0 }}
        >
          <p className="label" style={{ marginBottom: '16px' }}>Szolgáltatások</p>
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
            Amit kínálunk
          </h2>
        </div>

        <div className="svc-list" style={{ borderTop: '1px solid var(--border)' }}>
          {SERVICES.map((svc, i) => (
            <ServiceRow key={i} {...svc} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceRow({ num, title, body }: { num: string; title: string; body: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="svc-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '60px 1fr auto',
        alignItems: 'center',
        gap: 'clamp(16px, 3vw, 48px)',
        borderBottom: '1px solid var(--border)',
        opacity: 0,
        cursor: 'default',
        transition: 'background 0.25s',
        margin: '0 calc(-1 * var(--px))',
        padding: `clamp(20px, 3vw, 32px) var(--px)`,
        background: hovered ? 'var(--surface)' : 'transparent',
      }}
    >
      {/* Number */}
      <span
        style={{
          fontFamily: 'var(--font-condensed), sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          color: hovered ? 'var(--accent)' : 'var(--text-muted)',
          transition: 'color 0.25s',
        }}
      >
        {num}
      </span>

      {/* Title + body */}
      <div>
        <div
          style={{
            fontFamily: 'var(--font-display), serif',
            fontWeight: 800,
            fontSize: 'clamp(18px, 2.5vw, 30px)',
            textTransform: 'none',
            letterSpacing: '0',
            lineHeight: 1.1,
            color: 'var(--text)',
            marginBottom: hovered ? '10px' : 0,
            transition: 'margin 0.25s',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body), sans-serif',
            fontSize: '14px',
            color: 'var(--text-dim)',
            lineHeight: 1.65,
            maxHeight: hovered ? '80px' : 0,
            overflow: 'hidden',
            opacity: hovered ? 1 : 0,
            transition: 'max-height 0.3s ease, opacity 0.25s ease',
            maxWidth: '520px',
          }}
        >
          {body}
        </div>
      </div>

      {/* Arrow */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          color: hovered ? 'var(--accent)' : 'var(--text-muted)',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'color 0.25s, transform 0.25s',
          flexShrink: 0,
        }}
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  )
}
