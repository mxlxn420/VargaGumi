'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCookieConsent } from '@/context/CookieConsentContext'

gsap.registerPlugin(ScrollTrigger)

const HOURS = [
  { day: 'Hétfő – Péntek', hours: '07:00 – 17:00' },
  { day: 'Szombat', hours: '07:00 – 12:00' },
  { day: 'Vasárnap', hours: 'Zárva' },
]

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const { consent } = useCookieConsent()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ct-col',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: 'var(--bg)',
        padding: 'clamp(80px, 12vw, 160px) 0',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="container">
        <p className="label" style={{ marginBottom: '16px' }}>Kapcsolat</p>
        <h2
          style={{
            fontFamily: 'var(--font-display), serif',
            fontWeight: 900,
            fontSize: 'clamp(36px, 6vw, 72px)',
            textTransform: 'none',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            color: 'var(--text)',
            marginBottom: 'clamp(48px, 7vw, 80px)',
          }}
        >
          Itt megtalál<br />minket
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start',
          }}
        >
          {/* Info */}
          <div className="ct-col" style={{ opacity: 0, display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <CRow label="Cím">3800 Szikszó, Kassai út 52.</CRow>
            <CRow label="Telefon">
              <a href="tel:+3646796692" style={{ color: 'var(--text)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}>
                (06 46) 796 692
              </a>
            </CRow>
            <CRow label="E-mail">
              <a href="mailto:anibalkftiroda@gmail.com" style={{ color: 'var(--text)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}>
                anibalkftiroda@gmail.com
              </a>
            </CRow>

            {/* Hours */}
            <div>
              <div style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '12px' }}>
                Nyitvatartás
              </div>
              <div style={{ border: '1px solid var(--border)' }}>
                {HOURS.map((row, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderBottom: i < HOURS.length - 1 ? '1px solid var(--border)' : 'none',
                  }}>
                    <span style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '13px', color: 'var(--text-dim)', letterSpacing: '0.04em' }}>{row.day}</span>
                    <span style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '13px', fontWeight: 600, color: row.hours === 'Zárva' ? 'var(--text-muted)' : 'var(--text)', letterSpacing: '0.04em' }}>{row.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="tel:+3646796692"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                fontFamily: 'var(--font-condensed), sans-serif', fontWeight: 600,
                fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--bg)', background: 'var(--accent)', padding: '16px 32px',
                alignSelf: 'flex-start', transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Hívjon most →
            </a>
          </div>

          {/* Map */}
          <div
            className="ct-col"
            style={{
              opacity: 0, height: '420px', background: 'var(--surface)',
              border: '1px solid var(--border)', overflow: 'hidden', position: 'relative',
            }}
          >
            {consent === 'accepted' ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2686.5!2d20.888!3d48.2015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47409e2f!2sKassai+%C3%BAt+52%2C+Sziks%C3%B3!5e0!3m2!1shu!2shu!4v1"
                width="100%" height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.85)' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Varga Gumi helyszín"
              />
            ) : (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '32px', textAlign: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '14px', color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: '240px' }}>
                  A térkép megtekintéséhez fogadja el a sütiket.
                </p>
                <p style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                  3800 Szikszó, Kassai út 52.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

function CRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-condensed), sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '6px' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '16px', color: 'var(--text)', lineHeight: 1.5 }}>{children}</div>
    </div>
  )
}
