'use client'

import { useRef, useEffect } from 'react'
import type { MouseEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './AboutPanel.module.css'

gsap.registerPlugin(ScrollTrigger)

const FACTS = [
  {
    title: 'Gumicseréhez időponttal',
    text: 'Gumicseréhez hívjon előre, és egyeztessünk időpontot. Defekttel és minden mással nyitvatartási időben bejelentkezés nélkül is jöhet.',
  },
  {
    title: 'Személyautótól a kisteherig',
    text: 'Személyautók, SUV-ok és kisteherautók gumijait is szereljük és javítjuk.',
  },
  {
    title: 'A gumiját is megőrizzük',
    text: 'Szezonális gumitárolást is vállalunk, így nem kell otthon helyet keresnie neki.',
  },
]

export function AboutPanel() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-about="intro"]', {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
      })

      gsap.from('[data-about="item"]', {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '[data-about="list"]', start: 'top 78%' },
      })

      gsap.from('[data-about="year"]', {
        yPercent: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: { trigger: '[data-about="year"]', start: 'top 90%' },
      })
    })

    return () => mm.revert()
  }, [])

  const goToContact = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="about" ref={ref} className={styles.about} aria-labelledby="about-title">
      <div className="container">
        <div className={styles.grid}>
          <div>
            <p className={styles.eyebrow} data-about="intro">Rólunk</p>
            <h2 id="about-title" className={styles.title} data-about="intro">
              Szikszói műhely, <span className={styles.accent}>ahová bármikor</span> beugorhat.
            </h2>
            <p className={styles.intro} data-about="intro">
              Helyi vállalkozás vagyunk – nem lánc, nem franchise. Itt, a Kassai úton
              szereljük a környék autóinak gumijait, és személyesen felelünk minden munkáért.
            </p>

            <div className={styles.since}>
              <span className={styles.year} data-about="year" aria-hidden="true">Szikszó</span>
              <span className={styles.sinceLabel}>Kassai út 52.</span>
            </div>
          </div>

          <div>
            <ol className={styles.list} data-about="list">
              {FACTS.map((fact, i) => (
                <li key={fact.title} className={styles.item} data-about="item">
                  <span className={styles.num} aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className={styles.itemTitle}>{fact.title}</h3>
                    <p className={styles.itemText}>{fact.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <a href="#contact" onClick={goToContact} className={styles.more}>
              Nyitvatartás és útvonal
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
