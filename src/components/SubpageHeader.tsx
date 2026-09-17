import Link from 'next/link'
import styles from './SubpageHeader.module.css'

// Egyszerű fejléc az aloldalakhoz (adatvédelem, 404), ahol a főoldali szekciómenü nem értelmezhető
export function SubpageHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <Link href="/" className={styles.logo}>
          Varga <span className={styles.accent}>Gumi</span>
        </Link>
        <Link href="/" className={styles.back}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Vissza a főoldalra
        </Link>
      </div>
    </header>
  )
}
