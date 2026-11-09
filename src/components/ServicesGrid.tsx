'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ServicesGrid.module.css'

gsap.registerPlugin(ScrollTrigger)

type Kind = 'mount' | 'repair' | 'balance' | 'alignment' | 'storage' | 'sale' | 'valve'

const SERVICES: { kind: Kind; title: string; text: string; tags: string[] }[] = [
  {
    kind: 'mount',
    title: 'Gumiabroncs szerelése',
    text: 'Szezonális gumicsere és új gumik felszerelése – személyautóra, SUV-ra és kisteherautóra is.',
    tags: ['Időpont-egyeztetéssel', 'Személyautó · SUV · kisteher'],
  },
  {
    kind: 'repair',
    title: 'Defektjavítás',
    text: 'Megkeressük a sérülést, és ha a gumi javítható, megjavítjuk, hogy minél hamarabb újra úton legyen.',
    tags: ['Bejelentkezés nélkül is'],
  },
  {
    kind: 'balance',
    title: 'Centrírozás',
    text: 'Rezeg a kormány, vagy egyenetlenül kopik a gumi? Kiegyensúlyozzuk a kerekeket.',
    tags: ['Kerékkiegyensúlyozás'],
  },
  {
    kind: 'alignment',
    title: 'Futómű-beállítás',
    text: 'Futómű-geometria beállítás az egyenes menetért, az egyenletes gumikopásért és a biztonságos kanyarodásért.',
    tags: ['Geometria'],
  },
  {
    kind: 'storage',
    title: 'Gumitárolás',
    text: 'A nem használt garnitúrát megőrizzük a következő szezonig – nem kell otthon helyet keresnie neki.',
    tags: ['Szezonális tárolás'],
  },
  {
    kind: 'sale',
    title: 'Új gumi értékesítés',
    text: 'Új gumiabroncsot is vásárolhat nálunk, és helyben fel is szereljük. Méretért és elérhetőségért hívjon.',
    tags: ['Vásárlás + szerelés'],
  },
  {
    kind: 'valve',
    title: 'Szelepcsere és TPMS',
    text: 'Szelepek cseréje, valamint a guminyomás-érzékelők (TPMS) kezelése gumicserénél.',
    tags: ['Szelep', 'Nyomásérzékelő'],
  },
]

const ACCENT_INDEX = 4

export function ServicesGrid() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const mm = gsap.matchMedia()
    const cards = gsap.utils.toArray<HTMLElement>('[data-svc="card"]', ref.current)
    const slots = gsap.utils.toArray<HTMLElement>('[data-svc="slot"]', ref.current)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Élő számítás a tényleges pozíciókból (sticky mellett ez megbízható):
    // aktív = az utolsó kártya, ami már felért a megállási pontra
    let frame = 0
    const update = () => {
      frame = 0
      const stickyTop = parseFloat(getComputedStyle(slots[0]).top) || 0
      const tops = slots.map((s) => s.getBoundingClientRect().top)

      let current = 0
      tops.forEach((top, i) => {
        if (top <= stickyTop + 4) current = i
      })
      setActive(current)

      if (reduceMotion) return
      // A következő kártya közeledtével az előző kicsit összemegy
      cards.forEach((card, i) => {
        const nextTop = tops[i + 1]
        const p = nextTop === undefined
          ? 0
          : Math.min(1, Math.max(0, 1 - (nextTop - stickyTop) / (window.innerHeight * 0.7)))
        card.style.transform = p > 0 ? `scale(${1 - 0.05 * p})` : ''
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-svc="intro"]', {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
      })
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
      mm.revert()
    }
  }, [])

  return (
    <section id="services" ref={ref} className={styles.services} aria-labelledby="services-title">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.intro}>
            <p className={styles.eyebrow} data-svc="intro">Szolgáltatások</p>
            <h2 id="services-title" className={styles.title} data-svc="intro">
              Hét dolog, <span className={styles.accent}>amit jól csinálunk.</span>
            </h2>
            <p className={styles.lead} data-svc="intro">
              Nem biztos benne, mire van szüksége az autójának? Hívjon, és megmondjuk.
            </p>
            <a href="tel:+3646796692" className={styles.call} data-svc="intro">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 9a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.9.37 1.86.6 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              (06 46) 796 692
            </a>

            <ol className={styles.progress} aria-hidden="true">
              {SERVICES.map((s, i) => (
                <li
                  key={s.kind}
                  className={`${styles.progressDot} ${i === active ? styles.progressDotActive : ''}`}
                />
              ))}
            </ol>
          </div>

          <ol className={styles.stack}>
            {SERVICES.map((s, i) => (
              <li
                key={s.kind}
                className={styles.cardSlot}
                data-svc="slot"
              >
                <article
                  className={`${styles.card} ${i === ACCENT_INDEX ? styles.cardAccent : ''}`}
                  data-svc="card"
                >
                  <div>
                    <span className={styles.count}>
                      {String(i + 1).padStart(2, '0')} / {String(SERVICES.length).padStart(2, '0')}
                    </span>
                    <h3 className={styles.cardTitle}>{s.title}</h3>
                    <p className={styles.cardText}>{s.text}</p>
                    <ul className={styles.tags}>
                      {s.tags.map((t) => (
                        <li key={t} className={styles.tag}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.illustration} aria-hidden="true">
                    <ServiceIllustration kind={s.kind} />
                  </div>
                </article>
              </li>
            ))}
            <li className={styles.spacer} aria-hidden="true" />
          </ol>
        </div>
      </div>
    </section>
  )
}

function Wheel({ cx = 100, cy = 100, r = 70 }: { cx?: number; cy?: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} strokeWidth="10" strokeDasharray="6 5" />
      <circle cx={cx} cy={cy} r={r * 0.62} />
      <circle cx={cx} cy={cy} r={r * 0.14} fill="currentColor" stroke="none" />
      {[0, 72, 144, 216, 288].map((deg) => (
        <line
          key={deg}
          x1={cx} y1={cy - r * 0.2} x2={cx} y2={cy - r * 0.58}
          transform={`rotate(${deg} ${cx} ${cy})`}
        />
      ))}
    </g>
  )
}

function ServiceIllustration({ kind }: { kind: Kind }) {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {kind === 'mount' && (
        <>
          <Wheel cx={92} cy={108} r={66} />
          <path d="M150 36 l22 22 M140 46 l12 -12 l22 22 l-12 12 z" />
          <path d="M146 62 l-24 24" strokeWidth="6" />
        </>
      )}
      {kind === 'repair' && (
        <>
          <Wheel />
          <path d="M150 48 l20 -20" strokeWidth="4" />
          <circle cx="146" cy="52" r="6" fill="currentColor" stroke="none" />
          <rect x="44" y="146" width="44" height="24" rx="6" transform="rotate(-18 66 158)" />
          <path d="M54 156 h24 M54 164 h16" transform="rotate(-18 66 158)" strokeWidth="1.5" />
        </>
      )}
      {kind === 'balance' && (
        <>
          <Wheel />
          <path d="M14 100 h172" strokeDasharray="5 6" strokeWidth="1.5" />
          <rect x="88" y="16" width="24" height="12" rx="2" fill="currentColor" stroke="none" />
          <path d="M100 176 v12 M92 188 h16" />
        </>
      )}
      {kind === 'alignment' && (
        <>
          <rect x="28" y="56" width="30" height="88" rx="10" transform="rotate(-6 43 100)" />
          <rect x="142" y="56" width="30" height="88" rx="10" transform="rotate(6 157 100)" />
          <path d="M58 100 h84" strokeWidth="4" />
          <circle cx="100" cy="100" r="8" />
          <path d="M43 26 v148 M157 26 v148" strokeDasharray="4 6" strokeWidth="1.5" />
          <path d="M34 36 q9 -10 18 0 M148 36 q9 -10 18 0" strokeWidth="1.5" />
        </>
      )}
      {kind === 'storage' && (
        <>
          <path d="M30 20 v170 M170 20 v170 M30 104 h140 M30 188 h140" />
          {[52, 100, 148].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy="84" rx="20" ry="18" strokeWidth="6" strokeDasharray="4 3" />
              <ellipse cx={x} cy="168" rx="20" ry="18" strokeWidth="6" strokeDasharray="4 3" />
            </g>
          ))}
          <path d="M40 20 h120" strokeWidth="1.5" />
        </>
      )}
      {kind === 'sale' && (
        <>
          <Wheel cx={92} cy={108} r={66} />
          <path d="M138 30 h40 l12 16 l-12 16 h-40 z" />
          <circle cx="148" cy="46" r="4" fill="currentColor" stroke="none" />
          <path d="M148 46 q-14 20 -26 26" strokeWidth="1.5" />
          <path d="M160 46 h14" strokeWidth="2" />
        </>
      )}
      {kind === 'valve' && (
        <>
          <path d="M20 170 a120 120 0 0 1 160 0" strokeWidth="10" strokeDasharray="6 5" />
          <path d="M20 170 a120 120 0 0 1 160 0" transform="translate(0 20)" />
          <path d="M92 150 v-64 h16 v64" />
          <rect x="88" y="66" width="24" height="20" rx="4" fill="currentColor" stroke="none" />
          <path d="M72 50 q28 -24 56 0 M58 34 q42 -36 84 0" />
          <circle cx="100" cy="42" r="3" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  )
}
