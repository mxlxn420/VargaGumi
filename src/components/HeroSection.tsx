'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      tl.fromTo(
        '.h-line',
        { y: '110%' },
        { y: '0%', duration: 1, ease: 'power4.out', stagger: 0.07 }
      )
        .fromTo(
          '.h-divider',
          { scaleY: 0 },
          { scaleY: 1, duration: 0.8, ease: 'power3.out', transformOrigin: 'top' },
          '-=0.5'
        )
        .fromTo(
          '.h-right',
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1 },
          '-=0.6'
        )
        .fromTo(
          '.h-meta',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08 },
          '-=0.4'
        )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'var(--border)',
        }}
      />

      <div
        className="container"
        style={{ paddingTop: 'calc(var(--nav-h) + 60px)', paddingBottom: '80px' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: 0,
            alignItems: 'center',
            minHeight: 'clamp(320px, 50vh, 560px)',
          }}
        >
          {/* LEFT — company name */}
          <div style={{ paddingRight: 'clamp(32px, 5vw, 80px)' }}>
            {['VARGA', 'GUMI'].map((line, i) => (
              <div
                key={i}
                style={{ overflow: 'hidden', lineHeight: 0.88 }}
              >
                <div
                  className="h-line"
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontWeight: 900,
                    fontSize: 'clamp(60px, 10vw, 136px)',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                    lineHeight: 0.92,
                    color: i === 1 ? 'var(--accent)' : 'var(--text)',
                  }}
                >
                  {line}
                </div>
              </div>
            ))}
          </div>

          {/* CENTER — vertical divider */}
          <div
            className="h-divider"
            style={{
              width: '1px',
              alignSelf: 'stretch',
              background: 'var(--border-strong)',
              transformOrigin: 'top',
            }}
          />

          {/* RIGHT — phone + tagline */}
          <div
            style={{
              paddingLeft: 'clamp(32px, 5vw, 80px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '0',
            }}
          >
            <div
              className="h-right"
              style={{
                fontFamily: 'var(--font-condensed), sans-serif',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--text-dim)',
                marginBottom: '20px',
                opacity: 0,
              }}
            >
              Telefonszám
            </div>

            <a
              href="tel:+3646796692"
              className="h-right"
              style={{
                fontFamily: 'var(--font-display), serif',
                fontWeight: 900,
                fontSize: 'clamp(36px, 6vw, 80px)',
                letterSpacing: '0',
                lineHeight: 0.95,
                color: 'var(--accent)',
                textTransform: 'none',
                display: 'block',
                marginBottom: 'clamp(20px, 3vw, 40px)',
                opacity: 0,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            >
              (06 46)<br />796 692
            </a>

            <div
              style={{
                width: '32px',
                height: '1px',
                background: 'var(--border-strong)',
                marginBottom: 'clamp(16px, 2vw, 28px)',
              }}
              className="h-right"
            />

            <div
              className="h-meta"
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: 'clamp(14px, 1.5vw, 17px)',
                color: 'var(--text-dim)',
                lineHeight: 1.6,
                marginBottom: '6px',
                opacity: 0,
              }}
            >
              Szikszó, Kassai út 52.
            </div>

            <div
              className="h-meta"
              style={{
                fontFamily: 'var(--font-display), serif',
                fontWeight: 700,
                fontSize: 'clamp(18px, 2.5vw, 28px)',
                textTransform: 'none',
                letterSpacing: '0',
                color: 'var(--text)',
                lineHeight: 1.2,
                opacity: 0,
              }}
            >
              Hívjon,<br />megoldjuk.
            </div>
          </div>
        </div>

        {/* Bottom metadata row */}
        <div
          style={{
            marginTop: 'clamp(48px, 8vw, 100px)',
            borderTop: '1px solid var(--border)',
            paddingTop: '24px',
            display: 'flex',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'Tapasztalat', value: '10+ év' },
            { label: 'Nyitvatartás', value: 'H–P 07–17 · Szo 07–12' },
            { label: 'Google értékelés', value: '4.6 ★ · 69 vélemény' },
          ].map((item, i) => (
            <div key={i} className="h-meta" style={{ opacity: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--font-condensed), sans-serif',
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '4px',
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-condensed), sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: 'var(--text-dim)',
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .h-divider {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
