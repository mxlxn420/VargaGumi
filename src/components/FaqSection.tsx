'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FAQ } from '@/lib/faq'
import styles from './FaqSection.module.css'

gsap.registerPlugin(ScrollTrigger)

// B változat: cím balra, minden válasz nyitva jobbra (mobilon egy oszlop)
export function FaqSection() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-faq="intro"]', {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
      })
      gsap.from('[data-faq="item"]', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: '[data-faq="list"]', start: 'top 80%' },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="faq" ref={ref} className={styles.faq} aria-labelledby="faq-title">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.head}>
            <p className={styles.eyebrow} data-faq="intro">GYIK</p>
            <h2 id="faq-title" className={styles.title} data-faq="intro">
              Gyakori <span className={styles.accent}>kérdések.</span>
            </h2>
          </div>

          <dl className={styles.list} data-faq="list">
            {FAQ.map((item) => (
              <div key={item.q} className={styles.item} data-faq="item">
                <dt className={styles.q}>{item.q}</dt>
                <dd className={styles.a}>{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
