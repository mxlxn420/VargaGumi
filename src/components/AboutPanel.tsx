'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function AboutPanel() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ab-elem',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      style={{
        background: 'var(--surface)',
        padding: 'clamp(80px, 12vw, 160px) 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(40px, 8vw, 120px)',
            alignItems: 'start',
          }}
        >
          {/* Left */}
          <div>
            <p className="label ab-elem" style={{ opacity: 0, marginBottom: '32px' }}>
              Rólunk
            </p>
            <h2
              className="ab-elem"
              style={{
                fontFamily: 'var(--font-display), serif',
                fontWeight: 900,
                fontSize: 'clamp(36px, 6vw, 72px)',
                textTransform: 'none',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                color: 'var(--text)',
                opacity: 0,
                marginBottom: '40px',
              }}
            >
              Szikszó<br />
              <span style={{ color: 'var(--accent)' }}>megbízható</span><br />
              gumiszervize.
            </h2>
            <p
              className="ab-elem"
              style={{
                fontFamily: 'var(--font-body), sans-serif',
                fontSize: 'clamp(15px, 1.8vw, 18px)',
                color: 'var(--text-dim)',
                lineHeight: 1.75,
                maxWidth: '380px',
                opacity: 0,
              }}
            >
              Helyi vállalkozás, nem lánc, nem franchise. Személyesen felelünk minden elvégzett munkáért — mert mi is itt élünk Szikszón és környékén.
            </p>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              { num: '10+', label: 'Év tapasztalat', sub: '2013 óta a helyiek bizalma' },
              { num: '4.6★', label: 'Google értékelés', sub: '69 visszajelzés alapján' },
              { num: '100%', label: 'Elégedett ügyfél', sub: 'Minden munkát személyesen vállalunk' },
            ].map((item, i) => (
              <div
                key={i}
                className="ab-elem"
                style={{
                  background: 'var(--surface)',
                  padding: 'clamp(20px, 3vw, 32px) clamp(24px, 3vw, 36px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontWeight: 900,
                    fontSize: 'clamp(28px, 4vw, 48px)',
                    color: 'var(--accent)',
                    lineHeight: 1,
                    letterSpacing: '-0.01em',
                    minWidth: '80px',
                  }}
                >
                  {item.num}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display), serif',
                      fontWeight: 800,
                      fontSize: 'clamp(14px, 2vw, 18px)',
                      textTransform: 'none',
                      letterSpacing: '0',
                      color: 'var(--text)',
                      lineHeight: 1,
                      marginBottom: '6px',
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body), sans-serif',
                      fontSize: '13px',
                      color: 'var(--text-dim)',
                    }}
                  >
                    {item.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
