import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile } from '../hooks/useBreakpoint'

gsap.registerPlugin(ScrollTrigger)

const HOURS = [
  { day: 'Hétfő – Péntek', time: '07:00 – 17:00' },
  { day: 'Szombat',         time: '07:00 – 12:00' },
  { day: 'Vasárnap',        time: 'Zárva' },
]

export default function ContactSection() {
  const isMobile = useIsMobile()
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef   = useRef<HTMLDivElement>(null)
  const rightRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
      })
      gsap.from(rightRef.current, {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#080400',
        paddingTop: 110,
        paddingBottom: 120,
        paddingInline: isMobile ? 20 : 48,
        borderTop: '1px solid rgba(240,235,228,0.06)',
      }}
    >
      {/* Section tag */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 64, fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: '0.28em', color: 'var(--accent)', textTransform: 'uppercase' as const }}>
        <span style={{ display: 'block', width: 22, height: 1, background: 'var(--accent)' }} />
        Kapcsolat & elérhetőség
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 40 : 64, alignItems: 'start' }}>

        {/* ── LEFT COLUMN ── */}
        <div ref={leftRef}>
          {/* Phone */}
          <a
            href="tel:+3646796692"
            data-cursor="hover"
            style={{ textDecoration: 'none', display: 'block', marginBottom: 48 }}
          >
            <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--text-dim)', textTransform: 'uppercase' as const, marginBottom: 10 }}>
              Telefon
            </div>
            <div
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 4.5vw, 60px)', letterSpacing: '0.04em', color: 'var(--text)', lineHeight: 1, transition: 'color 0.2s' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text)')}
            >
              (06 46) 796 692
            </div>
          </a>

          {/* Address */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--text-dim)', textTransform: 'uppercase' as const, marginBottom: 10 }}>
              Cím
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, letterSpacing: '0.04em', color: 'var(--text)', lineHeight: 1.2 }}>
              Szikszó,<br />Kassai út 52.
            </div>
          </div>

          {/* Hours table */}
          <div style={{ marginBottom: 52 }}>
            <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--text-dim)', textTransform: 'uppercase' as const, marginBottom: 16 }}>
              Nyitvatartás
            </div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <tbody>
                {HOURS.map(({ day, time }) => (
                  <tr key={day} style={{ borderBottom: '1px solid rgba(240,235,228,0.06)' }}>
                    <td style={{ fontFamily: 'var(--font-condensed)', fontWeight: 300, fontSize: 14, letterSpacing: '0.06em', color: 'var(--text-dim)', padding: '12px 0' }}>
                      {day}
                    </td>
                    <td style={{ fontFamily: 'var(--font-condensed)', fontSize: 14, letterSpacing: '0.1em', color: time === 'Zárva' ? 'var(--accent-dim)' : 'var(--text)', textAlign: 'right', padding: '12px 0', fontWeight: time === 'Zárva' ? 300 : 400 }}>
                      {time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <a
            href="tel:+3646796692"
            data-cursor="hover"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 14, background: 'var(--accent)', padding: '16px 36px', fontFamily: 'var(--font-condensed)', fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: '#080400', fontWeight: 600, transition: 'background 0.2s' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#ff4a1a')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--accent)')}
          >
            Hívjon most
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.72 16z" />
            </svg>
          </a>
        </div>

        {/* ── RIGHT COLUMN: Map ── */}
        <div ref={rightRef} style={{ position: 'relative' }}>
          <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: '0.22em', color: 'var(--text-dim)', textTransform: 'uppercase' as const, marginBottom: 16 }}>
            Térkép
          </div>

          {/* Map embed container */}
          <div style={{ position: 'relative', width: '100%', paddingBottom: '62%', background: '#100a04', border: '1px solid rgba(240,235,228,0.08)', overflow: 'hidden' }}>
            <iframe
              title="Varga Gumi térképen"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.286407175317!2d20.93102237674298!3d48.20109904673621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473f5daca5ca358b%3A0xa63d9a02ce34bcf0!2sVarga%20Gumi%20%26%20Aut%C3%B3szerviz%20Sziksz%C3%B3!5e0!3m2!1shu!2shu!4v1777763070536!5m2!1shu!2shu"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', filter: 'grayscale(1) invert(0.85) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Address badge over map */}
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
            <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 13, letterSpacing: '0.08em', color: 'var(--text-dim)' }}>
              Szikszó, Kassai út 52. — 3800
            </div>
          </div>
        </div>
      </div>

      {/* Footer line */}
      <div style={{ marginTop: 96, paddingTop: 32, borderTop: '1px solid rgba(240,235,228,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '0.1em', color: 'rgba(240,235,228,0.2)' }}>
          VARGA GUMI
        </div>
        <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--text-dim)', textTransform: 'uppercase' as const }}>
          © 2026 Varga Gumi
        </div>
        <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--text-dim)', textTransform: 'uppercase' as const }}>
          Szikszó, Kassai út 52.
        </div>
      </div>
    </section>
  )
}
