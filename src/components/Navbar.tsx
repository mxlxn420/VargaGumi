'use client'

import { useState, useEffect } from 'react'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 'var(--nav-h)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--px)',
        transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
        background: scrolled ? 'rgba(12,11,10,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 'var(--max-w)',
          marginInline: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: 'var(--font-display), serif',
            fontWeight: 900,
            fontSize: '18px',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--text)',
            lineHeight: 1,
          }}
        >
          VARGA <span style={{ color: 'var(--accent)' }}>GUMI</span>
        </button>

        <div className="nav-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {[
            { label: 'Szolgáltatások', id: 'services' },
            { label: 'Rólunk', id: 'about' },
            { label: 'Vélemények', id: 'reviews' },
          ].map((link) => (
            <NavLink key={link.id} onClick={() => scrollTo(link.id)}>
              {link.label}
            </NavLink>
          ))}
          <a
            href="tel:+3646796692"
            style={{
              fontFamily: 'var(--font-condensed), sans-serif',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--bg)',
              background: 'var(--accent)',
              padding: '10px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <PhoneIcon />
            (06 46) 796 692
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menü"
          style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '8px' }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: 'var(--text)',
                transition: 'transform 0.2s, opacity 0.2s',
                opacity: menuOpen && i === 1 ? 0 : 1,
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                  : i === 2 ? 'rotate(-45deg) translate(5px,-5px)'
                  : 'none'
                  : 'none',
              }}
            />
          ))}
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--nav-h)',
            left: 0,
            right: 0,
            background: 'rgba(12,11,10,0.97)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border)',
            padding: '24px var(--px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
          }}
        >
          {[
            { label: 'Szolgáltatások', id: 'services' },
            { label: 'Rólunk', id: 'about' },
            { label: 'Vélemények', id: 'reviews' },
            { label: 'Kapcsolat', id: 'contact' },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                fontFamily: 'var(--font-display), serif',
                fontWeight: 800,
                fontSize: '22px',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                color: 'var(--text)',
                textAlign: 'left',
                padding: '14px 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="tel:+3646796692"
            style={{
              marginTop: '16px',
              fontFamily: 'var(--font-condensed), sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--bg)',
              background: 'var(--accent)',
              padding: '16px 24px',
              textAlign: 'center',
              display: 'block',
            }}
          >
            (06 46) 796 692
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}

function NavLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: 'var(--font-condensed), sans-serif',
        fontWeight: 600,
        fontSize: '12px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: hov ? 'var(--text)' : 'var(--text-dim)',
        position: 'relative',
        padding: '4px 0',
        transition: 'color 0.2s',
      }}
    >
      {children}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'var(--accent)',
          transform: hov ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.25s ease',
        }}
      />
    </button>
  )
}

function PhoneIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 9a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.9.37 1.86.6 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

