'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import type { FocusEvent, KeyboardEvent, PointerEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ReviewsCarousel.module.css'

gsap.registerPlugin(ScrollTrigger)

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/maps/place/Varga+Gumi+%26+Aut%C3%B3szerviz+Sziksz%C3%B3/@48.2010955,20.9310224,17z/data=!4m8!3m7!1s0x473f5daca5ca358b:0xa63d9a02ce34bcf0!8m2!3d48.2010955!4d20.9335973!9m1!1b1!16s%2Fg%2F1v9gt6w9'

const REVIEWS = [
  // Valódi Google-vélemények, helyesírásilag javítva (tartalom változatlan)
  { name: 'Hard Beer Brothers', rating: 5, text: 'Évek óta ide járok gumicserére. Sosem kellett várnom, egyből fogadtak, és gyorsan, pontosan végzik a munkájukat. Csak ajánlani tudom.' },
  { name: 'Gulyás József', rating: 5, text: 'Teljes mértékben elégedett vagyok. Gumizás és futómű-beállítás volt – normálisak, kedvesek.' },
  { name: 'Toth-Sandor Judit', rating: 5, text: 'Szupergyors, kedves, szakszerű szerviz és kiszolgálás, korrekt áron. Csak ajánlani tudom őket.' },
  { name: 'Lipták Ferenc', rating: 5, text: 'Rendes, hozzáértő munka, tisztességes, udvarias kiszolgálás.' },
  { name: 'Végh Csaba', rating: 5, text: 'Korrektek, vidámak, profin dolgoznak. Csak ajánlani tudom.' },
  { name: 'Dilk Csaba', rating: 5, text: 'Korrekt, gyors munka. Csak ajánlani tudom mindenkinek.' },
]

const AUTOPLAY_MS = 7000
const RATING = 4.6
const RATING_COUNT = 73

export function ReviewsCarousel() {
  const ref = useRef<HTMLElement>(null)
  const swipeX = useRef<number | null>(null)
  const fillRef = useRef<HTMLSpanElement | null>(null)
  const elapsed = useRef(0)
  const pausedRef = useRef(true)
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [inView, setInView] = useState(false)

  const paused = hovered || focused || !inView
  const count = REVIEWS.length

  const go = useCallback((i: number) => setActive((i + count) % count), [count])
  const step = useCallback((d: number) => setActive((a) => (a + d + count) % count), [count])

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  // Minden váltáskor (kézi vagy automatikus) elölről indul a csík
  useEffect(() => {
    elapsed.current = 0
    if (fillRef.current) fillRef.current.style.transform = 'scaleX(0)'
  }, [active])

  // Egyetlen időzítő: csak akkor halad, ha nincs szünet
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100)
      last = now
      if (!pausedRef.current) {
        elapsed.current += dt
        if (elapsed.current >= AUTOPLAY_MS) {
          elapsed.current = 0
          step(1)
        }
      }
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${Math.min(elapsed.current / AUTOPLAY_MS, 1)})`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [step])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-reviews="intro"]', {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
      })

      gsap.from('[data-reviews="stage"]', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-reviews="stage"]', start: 'top 80%' },
      })
    })

    return () => mm.revert()
  }, [])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1) }
  }

  // Csak billentyűzetes fókusz állítja meg; kattintás után megy tovább
  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    if (e.target.matches(':focus-visible')) setFocused(true)
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') swipeX.current = e.clientX
  }

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (swipeX.current === null) return
    const dx = e.clientX - swipeX.current
    swipeX.current = null
    if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1)
  }

  return (
    <section id="reviews" ref={ref} className={styles.reviews} aria-labelledby="reviews-title">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.intro}>
            <p className={styles.eyebrow} data-reviews="intro">Vélemények</p>
            <h2 id="reviews-title" className={styles.title} data-reviews="intro">
              Amit az ügyfelek <span className={styles.accent}>mondanak.</span>
            </h2>

            <div className={styles.score} data-reviews="intro">
              <span className={styles.scoreValue}>{RATING}</span>
              <div>
                <Stars value={RATING} className={styles.scoreStars} />
                <p className={styles.scoreLabel}>{RATING_COUNT} Google-vélemény alapján</p>
              </div>
            </div>

            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.google}
              data-reviews="intro"
            >
              Összes vélemény a Google-on
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
          </div>

          <div
            className={styles.stage}
            data-reviews="stage"
            role="region"
            aria-roledescription="körhinta"
            aria-label="Ügyfélvélemények"
            onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHovered(true) }}
            onPointerLeave={() => setHovered(false)}
            onFocus={onFocus}
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false) }}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => { swipeX.current = null }}
          >
            <span className={styles.mark} aria-hidden="true">&ldquo;</span>

            <div className={styles.slides} aria-live={paused ? 'polite' : 'off'}>
              {REVIEWS.map((r, i) => (
                <figure
                  key={r.name}
                  className={styles.slide}
                  data-active={i === active}
                  aria-hidden={i !== active}
                  aria-roledescription="dia"
                  aria-label={`${i + 1} / ${count}`}
                >
                  <blockquote className={styles.quote}>
                    <p>{r.text}</p>
                  </blockquote>
                  <figcaption className={styles.author}>
                    <span className={styles.name}>{r.name}</span>
                    <Stars value={r.rating} className={styles.authorStars} />
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className={styles.controls}>
              <ol className={styles.progress}>
                {REVIEWS.map((r, i) => (
                  <li key={r.name}>
                    <button
                      type="button"
                      className={styles.segment}
                      data-state={i === active ? 'active' : i < active ? 'done' : 'todo'}
                      aria-label={`${i + 1}. vélemény: ${r.name}`}
                      aria-current={i === active ? 'true' : undefined}
                      onClick={() => go(i)}
                    >
                      {i === active && <span ref={fillRef} className={styles.fill} />}
                    </button>
                  </li>
                ))}
              </ol>

              <div className={styles.nav}>
                <span className={styles.counter} aria-hidden="true">
                  {active + 1} / {count}
                </span>
                <button type="button" className={styles.arrow} onClick={() => step(-1)} aria-label="Előző vélemény">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 12H5M11 18l-6-6 6-6" />
                  </svg>
                </button>
                <button type="button" className={`${styles.arrow} ${styles.arrowNext}`} onClick={() => step(1)} aria-label="Következő vélemény">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const STAR_PATH = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'

function Stars({ value, className }: { value: number; className?: string }) {
  const label = `5 csillagból ${value}`
  return (
    <span className={`${styles.stars} ${className ?? ''}`} role="img" aria-label={label}>
      <span className={styles.starsTrack} aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} viewBox="0 0 24 24"><path d={STAR_PATH} /></svg>
        ))}
      </span>
      <span className={styles.starsFill} style={{ width: `${(value / 5) * 100}%` }} aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} viewBox="0 0 24 24"><path d={STAR_PATH} /></svg>
        ))}
      </span>
    </span>
  )
}
