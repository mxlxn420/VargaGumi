import type { Metadata } from 'next'
import Link from 'next/link'
import { SubpageHeader } from '@/components/SubpageHeader'
import { Footer } from '@/components/Footer'
import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: 'Az oldal nem található',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <>
      <SubpageHeader />

      <main className={styles.main}>
        <div className={`container ${styles.inner}`}>
          <p className={styles.code} aria-hidden="true">
            4<span className={styles.accent}>0</span>4
          </p>

          <div className={styles.text}>
            <h1 className={styles.title}>
              Ez az oldal <span className={styles.accent}>defektet kapott.</span>
            </h1>
            <p className={styles.lead}>
              A keresett oldal nem létezik, vagy elköltözött. A főoldalon mindent megtalál, vagy hívjon minket.
            </p>
            <div className={styles.actions}>
              <Link href="/" className={`${styles.btn} ${styles.btnSolid}`}>
                Vissza a főoldalra
              </Link>
              <a href="tel:+3646796692" className={`${styles.btn} ${styles.btnOutline}`}>
                (06 46) 796 692
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
