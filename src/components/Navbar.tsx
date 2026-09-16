'use client'

import { useState, useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { getOpenStatus } from '@/lib/openingHours'
import type { OpenStatus } from '@/lib/openingHours'
import styles from './Navbar.module.css'

const LINKS = [
  { label: 'Rólunk', id: 'about' },
  { label: 'Szolgáltatások', id: 'services' },
  { label: 'Vélemények', id: 'reviews' },
  { label: 'Kapcsolat', id: 'contact' },
]

const PHONE_HREF = 'tel:+3646796692'
const PHONE_LABEL = '(06 46) 796 692'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const [status, setStatus] = useState<OpenStatus | null>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const pendingScroll = useRef<string | null>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Nyitvatartás csak kliensen (hydration-biztos), percenként frissül
  useEffect(() => {
    const update = () => setStatus(getOpenStatus())
    update()
    const timer = setInterval(update, 60_000)
    return () => clearInterval(timer)
  }, [])

  // Aktív szekció követése
  useEffect(() => {
    const visible = new Map<string, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting))
        const current = LINKS.find((l) => visible.get(l.id))
        setActive(current ? current.id : null)
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    LINKS.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Mobil menü: görgetés tiltása, Esc, fókusz
  useEffect(() => {
    if (!menuOpen) {
      if (pendingScroll.current) {
        document.getElementById(pendingScroll.current)?.scrollIntoView({ behavior: 'smooth' })
        pendingScroll.current = null
      }
      return
    }
    const root = document.documentElement
    root.style.overflow = 'hidden'
    closeBtnRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    menuBtnRef.current?.focus({ preventScroll: true })
  }

  const goTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    if (menuOpen) {
      pendingScroll.current = id
      setMenuOpen(false)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const goTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header className={styles.wrap}>
        <nav
          aria-label="Főmenü"
          className={`${styles.pill} ${scrolled ? styles.scrolled : ''}`}
        >
          <a href="/" onClick={goTop} className={styles.logo}>
            Varga Gumi
          </a>

          <ul className={styles.links}>
            {LINKS.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => goTo(e, link.id)}
                    className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className={styles.activeBg}
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 420, damping: 36 }
                        }
                      />
                    )}
                    <span className={styles.linkLabel}>{link.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          <div className={styles.right}>
            {status && (
              <span className={styles.status}>
                <span className={`${styles.dot} ${status.open ? styles.dotOpen : ''}`} aria-hidden="true" />
                {status.label}
              </span>
            )}
            <a href={PHONE_HREF} className={styles.call}>
              <PhoneIcon />
              <span className={styles.callLong}>{PHONE_LABEL}</span>
              <span className={styles.callShort}>Hívás</span>
            </a>
          </div>

          <div className={styles.mobileActions}>
            <a
              href={PHONE_HREF}
              className={`${styles.iconBtn} ${styles.iconBtnFilled}`}
              aria-label={`Hívás: ${PHONE_LABEL}`}
            >
              <PhoneIcon />
            </a>
            <button
              ref={menuBtnRef}
              type="button"
              className={styles.iconBtn}
              onClick={() => setMenuOpen(true)}
              aria-label="Menü megnyitása"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <MenuIcon />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            className={styles.overlay}
            initial={reduceMotion ? { opacity: 0 } : { clipPath: 'circle(0% at calc(100% - 45px) 43px)' }}
            animate={reduceMotion ? { opacity: 1 } : { clipPath: 'circle(150% at calc(100% - 45px) 43px)' }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: 'circle(0% at calc(100% - 45px) 43px)' }}
            transition={{ duration: reduceMotion ? 0.15 : 0.55, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className={styles.overlayHead}>
              <a href="/" onClick={goTop} className={styles.logo}>
                Varga Gumi
              </a>
              <button
                ref={closeBtnRef}
                type="button"
                className={`${styles.iconBtn} ${styles.closeBtn}`}
                onClick={closeMenu}
                aria-label="Menü bezárása"
              >
                <CloseIcon />
              </button>
            </div>

            <ul className={styles.menuList}>
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.18 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => goTo(e, link.id)}
                    className={`${styles.menuLink} ${active === link.id ? styles.menuActive : ''}`}
                  >
                    <span className={styles.menuNum}>{String(i + 1).padStart(2, '0')}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className={styles.menuFoot}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 0.45, duration: 0.4 }}
            >
              <p className={styles.menuInfo}>
                {status?.label}
                {status && <br />}
                3800 Szikszó, Kassai út 52.
              </p>
              <a href={PHONE_HREF} className={styles.menuCall}>
                <PhoneIcon />
                {PHONE_LABEL}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 9a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.9.37 1.86.6 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 8h16M4 16h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}
