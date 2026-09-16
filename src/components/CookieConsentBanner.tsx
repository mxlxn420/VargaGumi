'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCookieConsent } from '@/context/CookieConsentContext'
import styles from './CookieConsentBanner.module.css'

// A hero belépő animációja után jelenik meg
const SHOW_DELAY_MS = 1500

export function CookieConsentBanner() {
  const { consent, accept, decline } = useCookieConsent()
  const [delayPassed, setDelayPassed] = useState(false)

  // A késleltetés azt is kivédi, hogy a mentett döntés beolvasása előtt felvillanjon.
  // „Süti beállítások” után (consent → null) már azonnal megjelenik.
  useEffect(() => {
    const timer = setTimeout(() => setDelayPassed(true), SHOW_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  if (consent !== null || !delayPassed) return null

  return (
    <div className={styles.banner} role="region" aria-labelledby="cookie-title">
      <div className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </span>
        <p id="cookie-title" className={styles.title}>Sütik a térképhez</p>
      </div>

      <p className={styles.text}>
        Sütit csak a beágyazott Google Térkép használ, más követés nincs az oldalon.{' '}
        <Link href="/adatvedelem" className={styles.link}>Adatvédelmi tájékoztató</Link>
      </p>

      <div className={styles.actions}>
        <button type="button" className={`${styles.btn} ${styles.btnOutline}`} onClick={decline}>
          Elutasítom
        </button>
        <button type="button" className={`${styles.btn} ${styles.btnSolid}`} onClick={accept}>
          Elfogadom
        </button>
      </div>
    </div>
  )
}
