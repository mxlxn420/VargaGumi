'use client'

import Link from 'next/link'
import type { MouseEvent } from 'react'
import { useCookieConsent } from '@/context/CookieConsentContext'
import styles from './Footer.module.css'

const LINKS = [
  { label: 'Rólunk', id: 'about' },
  { label: 'Szolgáltatások', id: 'services' },
  { label: 'Vélemények', id: 'reviews' },
  { label: 'Kapcsolat', id: 'contact' },
]

export function Footer() {
  const { reset } = useCookieConsent()
  const year = new Date().getFullYear()

  // A főoldalon görgetünk; aloldalról a link a főoldal szekciójára visz
  const goTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: 'smooth' })
  }

  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <Link href="/" className={styles.logo}>
            Varga <span className={styles.accent}>Gumi</span>
          </Link>

          <nav aria-label="Lábléc menü">
            <ul className={styles.links}>
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`/#${l.id}`} className={styles.link} onClick={(e) => goTo(e, l.id)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button type="button" className={styles.topBtn} onClick={goTop} aria-label="Vissza az oldal tetejére">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </button>
        </div>

        <div className={styles.bottom}>
          <p className={styles.company}>
            <span suppressHydrationWarning>© {year} Anibal Kft.</span>
            <span>Adószám: 12816833-2-05</span>
            <span>Cégjegyzékszám: 05-09-009532</span>
            <span>Székhely: 3800 Szikszó, Kassai út 52.</span>
          </p>

          <div className={styles.legal}>
            <Link href="/adatvedelem" className={styles.link}>
              Adatvédelmi tájékoztató
            </Link>
            <button type="button" className={styles.link} onClick={reset}>
              Süti beállítások
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
