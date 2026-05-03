import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useIsMobile } from '../hooks/useBreakpoint'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  { label: 'Szolgáltatások', href: '#services' },
  { label: 'Vélemények',     href: '#reviews'  },
  { label: 'Kapcsolat',      href: '#contact'  },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const nav = navRef.current!

    ScrollTrigger.create({
      start: 'top -72',
      onEnter: () => {
        gsap.to(nav, { backgroundColor: 'rgba(8,4,0,0.88)', duration: 0.35, ease: 'power2.out' })
        nav.style.backdropFilter = 'blur(14px)'
        nav.style.webkitBackdropFilter = 'blur(14px)'
        nav.style.boxShadow = '0 1px 0 rgba(240,235,228,0.06)'
      },
      onLeaveBack: () => {
        gsap.to(nav, { backgroundColor: 'rgba(8,4,0,0)', duration: 0.35, ease: 'power2.out' })
        nav.style.backdropFilter = 'blur(0px)'
        nav.style.webkitBackdropFilter = 'blur(0px)'
        nav.style.boxShadow = 'none'
      },
    })
  }, [])

  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const top = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: isMobile ? '0 20px' : '0 48px',
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(8,4,0,0)',
        transition: 'none',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        onClick={scrollTo('#')}
        style={{ textDecoration: 'none', cursor: 'none' }}
        data-cursor="hover"
      >
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 22,
          letterSpacing: '0.16em',
          color: 'var(--text)',
          lineHeight: 1,
        }}>
          VARGA GUMI
        </div>
      </a>

      {/* Links */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        {!isMobile && LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            onClick={scrollTo(href)}
            data-cursor="hover"
            style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: 12,
              fontWeight: 400,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--text-dim)',
              textDecoration: 'none',
              transition: 'color 0.2s',
              cursor: 'none',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--text)')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-dim)')}
          >
            {label}
          </a>
        ))}

        {/* CTA phone */}
        <a
          href="tel:+3646796692"
          data-cursor="hover"
          style={{
            fontFamily: 'var(--font-condensed)',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#080400',
            textDecoration: 'none',
            background: 'var(--accent)',
            padding: '9px 20px',
            cursor: 'none',
            transition: 'background 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#ff4a1a')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--accent)')}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.72 16z" />
          </svg>
          {!isMobile && <span>(06 46) 796 692</span>}
        </a>
      </div>
    </nav>
  )
}
