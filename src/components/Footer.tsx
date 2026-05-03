import { useIsMobile } from '../hooks/useBreakpoint'

const QUICK_LINKS = [
  { label: 'Gumiszerelés & csere', href: '#services' },
  { label: 'Szezonális kerékcsere', href: '#services' },
  { label: 'Defektjavítás',         href: '#services' },
  { label: 'Futómű állítás',        href: '#services' },
  { label: 'Vélemények',            href: '#reviews'  },
  { label: 'Kapcsolat',             href: '#contact'  },
]

export default function Footer() {
  const isMobile = useIsMobile()
  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <footer style={{
      position: 'relative',
      zIndex: 2,
      background: '#060300',
      paddingTop: 60,
      paddingBottom: 36,
      paddingInline: isMobile ? 20 : 48,
    }}>
      {/* Top red divider */}
      <div style={{ height: 2, background: 'var(--accent)', marginBottom: 56 }} />

      {/* Three columns */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr 1fr', gap: isMobile ? 36 : 48, marginBottom: 52 }}>

        {/* Col 1: Brand + tagline */}
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            letterSpacing: '0.12em',
            color: 'var(--text)',
            marginBottom: 16,
            lineHeight: 1,
          }}>
            VARGA GUMI
          </div>
          <p style={{
            fontFamily: 'var(--font-condensed)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 14,
            lineHeight: 1.7,
            letterSpacing: '0.04em',
            color: 'var(--text-dim)',
            maxWidth: 280,
            borderLeft: '2px solid var(--accent-dim)',
            paddingLeft: 14,
            margin: 0,
            marginBottom: 28,
          }}>
            Prémium gumiabroncs szerviz Szikszón — gyors, megbízható, kedvező áron.
          </p>
          <div style={{
            display: 'flex',
            gap: 4,
            alignItems: 'center',
          }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#e63700">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
            <span style={{ fontFamily: 'var(--font-condensed)', fontSize: 12, color: 'var(--text-dim)', letterSpacing: '0.1em', marginLeft: 8 }}>
              4.6 / 5 — 69 értékelés
            </span>
          </div>
        </div>

        {/* Col 2: Contact */}
        <div>
          <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: '0.28em', color: 'var(--accent)', textTransform: 'uppercase' as const, marginBottom: 22 }}>
            Elérhetőség
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <a href="tel:+3646796692" data-cursor="hover" style={{ textDecoration: 'none', color: 'var(--text)', fontFamily: 'var(--font-condensed)', fontSize: 16, letterSpacing: '0.06em', transition: 'color 0.2s', cursor: 'none' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text)')}
            >
              (06 46) 796 692
            </a>
            <div style={{ fontFamily: 'var(--font-condensed)', fontWeight: 300, fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6, letterSpacing: '0.04em' }}>
              Szikszó, Kassai út 52.<br />3800 Szikszó
            </div>
            <div style={{ fontFamily: 'var(--font-condensed)', fontWeight: 300, fontSize: 13, color: 'var(--text-dim)', letterSpacing: '0.04em', lineHeight: 1.6 }}>
              H–P: 07:00–17:00<br />Szo: 07:00–12:00
            </div>
          </div>
        </div>

        {/* Col 3: Quick links */}
        <div>
          <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: '0.28em', color: 'var(--accent)', textTransform: 'uppercase' as const, marginBottom: 22 }}>
            Gyors linkek
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {QUICK_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={scrollTo(href)}
                data-cursor="hover"
                style={{
                  fontFamily: 'var(--font-condensed)',
                  fontWeight: 300,
                  fontSize: 14,
                  letterSpacing: '0.06em',
                  color: 'var(--text-dim)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  cursor: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-dim)')}
              >
                <span style={{ display: 'block', width: 12, height: 1, background: 'var(--accent-dim)', flexShrink: 0 }} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright row */}
      <div style={{
        paddingTop: 24,
        borderTop: '1px solid rgba(240,235,228,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(240,235,228,0.25)', textTransform: 'uppercase' as const }}>
          © 2026 Varga Gumi Szikszó
        </div>
        <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(240,235,228,0.18)', textTransform: 'uppercase' as const }}>
          Minden jog fenntartva
        </div>
      </div>
    </footer>
  )
}
