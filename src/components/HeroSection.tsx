'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getOpenStatus } from '@/lib/openingHours'
import type { OpenStatus } from '@/lib/openingHours'
import styles from './HeroSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const PHONE_HREF = 'tel:+3646796692'
const DIRECTIONS_HREF =
  'https://www.google.com/maps/dir/?api=1&destination=' +
  encodeURIComponent('Varga Gumi, 3800 Szikszó, Kassai út 52.')

const STATS = [
  { num: '4.6★', label: '73 Google vélemény' },
  { num: '7', label: 'szolgáltatás' },
  { num: 'H–Szo', label: 'bejelentkezés nélkül is' },
]

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<OpenStatus | null>(null)

  useEffect(() => {
    const update = () => setStatus(getOpenStatus())
    update()
    const timer = setInterval(update, 60_000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        desktop: '(min-width: 901px)',
      },
      (context) => {
        const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean }
        if (!motion) return

        // A kezdőállapotot a CSS adja (rejtve), ezért fromTo: a cél mindig a végleges helyzet.
        // A címsorok 170%-ról indulnak, hogy a kivágásból semmi ne lógjon be.
        const tire = document.querySelector<HTMLElement>('[data-hero="tire"]')
        const tireOpacity = tire ? Number(getComputedStyle(tire).getPropertyValue('--tire-opacity')) || 1 : 1

        const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power4.out' } })
        tl.fromTo('[data-hero="eyebrow"]', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 })
          .fromTo('[data-hero="line"]', { y: 0, yPercent: 170 }, { y: 0, yPercent: 0, duration: 1.1, stagger: 0.09 }, '-=0.5')
          .fromTo('[data-hero="lead"]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.7')
          .fromTo(
            '[data-hero="tire"]',
            { opacity: 0, scale: 0.85, rotation: -60 },
            { opacity: tireOpacity, scale: 1, rotation: 0, duration: 1.6, ease: 'power3.out' },
            0.2
          )
          .fromTo(
            '[data-hero="card"]',
            { opacity: 0, y: 60, rotation: desktop ? 6 : 0 },
            { opacity: 1, y: 0, rotation: 0, duration: 1.1 },
            0.55
          )
          .fromTo(
            '[data-hero="stat"]',
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
            '-=0.6'
          )

        // A gumi görgetésre lassan forog
        gsap.to('[data-hero="tire-spin"]', {
          rotation: 140,
          ease: 'none',
          svgOrigin: '200 200',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      }
    )

    return () => mm.revert()
  }, [])

  return (
    <section ref={ref} id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.text}>
            <p className={styles.eyebrow} data-hero="eyebrow">
              Varga Gumi
              <span className={styles.sep} aria-hidden="true" />
              Gumiszerviz Szikszón
            </p>

            <h1 id="hero-title" className={styles.title}>
              <span className={styles.line}>
                <span className={styles.lineInner} data-hero="line">Defekt?</span>
              </span>
              <span className={styles.line}>
                <span className={`${styles.lineInner} ${styles.accent}`} data-hero="line">Hívjon,</span>
              </span>
              <span className={styles.line}>
                <span className={styles.lineInner} data-hero="line">megoldjuk.</span>
              </span>
            </h1>

            <p className={styles.lead} data-hero="lead">
              Gumiszerelés, defektjavítás, centrírozás és futómű-beállítás
              helyben, gyorsan, korrekt áron.
            </p>
          </div>

          <div className={styles.visual}>
            <div className={styles.tire} data-hero="tire" aria-hidden="true">
              <TireGraphic />
            </div>

            <div className={styles.cardWrap} data-hero="card">
              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.status}>
                    {status && (
                      <>
                        <span className={`${styles.dot} ${status.open ? styles.dotOpen : ''}`} />
                        {status.label}
                      </>
                    )}
                  </span>
                  <span>4.6 ★ · 73</span>
                </div>

                <a href={PHONE_HREF} className={styles.phone}>
                  (06 46)
                  <br />
                  796 692
                </a>
                <p className={styles.address}>3800 Szikszó, Kassai út 52.</p>

                <div className={styles.actions}>
                  <a href={PHONE_HREF} className={`${styles.btn} ${styles.btnPrimary}`}>
                    <PhoneIcon />
                    Hívás most
                  </a>
                  <a
                    href={DIRECTIONS_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.btn} ${styles.btnGhost}`}
                  >
                    Útvonal
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className={styles.stats}>
          {STATS.map((s) => (
            <li key={s.label} className={styles.stat} data-hero="stat">
              <span className={styles.statNum}>{s.num}</span>
              {s.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function TireGraphic() {
  const treads = Array.from({ length: 36 }, (_, i) => i * 10)
  const spokes = Array.from({ length: 5 }, (_, i) => i * 72)
  const nuts = Array.from({ length: 5 }, (_, i) => i * 72 + 36)

  return (
    <svg viewBox="0 0 400 400" width="100%" height="100%" fill="none" stroke="currentColor">
      <g data-hero="tire-spin">
        {/* Futófelület */}
        <circle cx="200" cy="200" r="188" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="150" strokeWidth="1.5" />
        {treads.map((deg) => (
          <path
            key={deg}
            d="M200 16 L206 16 L204 50 L196 50 Z"
            transform={`rotate(${deg} 200 200)`}
            fill="currentColor"
            fillOpacity="0.9"
            stroke="none"
          />
        ))}
        {treads.map((deg) => (
          <line
            key={`g${deg}`}
            x1="200" y1="14" x2="200" y2="52"
            transform={`rotate(${deg + 5} 200 200)`}
            strokeWidth="1"
            strokeOpacity="0.35"
          />
        ))}
        {/* Oldalfal */}
        <circle cx="200" cy="200" r="138" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="2 6" />
        {/* Felni */}
        <circle cx="200" cy="200" r="112" strokeWidth="2" />
        <circle cx="200" cy="200" r="100" strokeWidth="1" strokeOpacity="0.5" />
        {spokes.map((deg) => (
          <path
            key={`s${deg}`}
            d="M192 170 L186 104 Q200 98 214 104 L208 170 Z"
            transform={`rotate(${deg} 200 200)`}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        ))}
        <circle cx="200" cy="200" r="34" strokeWidth="2" />
        {nuts.map((deg) => (
          <circle
            key={`n${deg}`}
            cx="200" cy="178" r="4"
            transform={`rotate(${deg} 200 200)`}
            fill="currentColor"
            stroke="none"
          />
        ))}
        <circle cx="200" cy="200" r="11" fill="currentColor" stroke="none" />
      </g>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 9a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.9.37 1.86.6 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  )
}
