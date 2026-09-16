'use client'

import { useRef, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCookieConsent } from '@/context/CookieConsentContext'
import { OPENING_HOURS, getBudapestTime, getOpenStatus } from '@/lib/openingHours'
import type { OpenStatus } from '@/lib/openingHours'
import styles from './ContactSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const PHONE_HREF = 'tel:+3646796692'
const EMAIL = 'anibalkftiroda@gmail.com'
const ADDRESS = '3800 Szikszó, Kassai út 52.'
const DIRECTIONS_HREF =
  'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent('Varga Gumi, ' + ADDRESS)
const MAP_EMBED =
  'https://maps.google.com/maps?hl=hu&z=16&output=embed&q=' +
  encodeURIComponent('Varga Gumi & Autószerviz, Szikszó, Kassai út 52.')

// Az idővonal 6:00 és 18:00 között
const SCALE_START = 6
const SCALE_END = 18
const TICKS = [6, 9, 12, 15, 18]

// Hétfővel kezdve; index = OPENING_HOURS index (0 = vasárnap)
const DAYS = [
  { index: 1, short: 'H', name: 'Hétfő' },
  { index: 2, short: 'K', name: 'Kedd' },
  { index: 3, short: 'Sze', name: 'Szerda' },
  { index: 4, short: 'Cs', name: 'Csütörtök' },
  { index: 5, short: 'P', name: 'Péntek' },
  { index: 6, short: 'Szo', name: 'Szombat' },
  { index: 0, short: 'V', name: 'Vasárnap' },
]

const toPercent = (hour: number) => ((hour - SCALE_START) / (SCALE_END - SCALE_START)) * 100

type Now = { day: number; minutes: number }

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const { consent } = useCookieConsent()
  const [mapRequested, setMapRequested] = useState(false)
  const [status, setStatus] = useState<OpenStatus | null>(null)
  const [now, setNow] = useState<Now | null>(null)

  const showMap = consent === 'accepted' || mapRequested

  useEffect(() => {
    const update = () => {
      setStatus(getOpenStatus())
      setNow(getBudapestTime())
    }
    update()
    const timer = setInterval(update, 60_000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-contact="intro"]', {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
      })

      gsap.from('[data-contact="bar"]', {
        scaleX: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.06,
        scrollTrigger: { trigger: '[data-contact="timeline"]', start: 'top 80%' },
      })

      gsap.from('[data-contact="reveal"]', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '[data-contact="timeline"]', start: 'top 80%' },
      })
    })

    return () => mm.revert()
  }, [])

  const nowHour = now ? now.minutes / 60 : null
  const showNowLine = nowHour !== null && nowHour >= SCALE_START && nowHour <= SCALE_END

  return (
    <section id="contact" ref={ref} className={styles.contact} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow} data-contact="intro">Kapcsolat</p>
            <h2 id="contact-title" className={styles.title} data-contact="intro">
              Mikor <span className={styles.accent}>jöhet?</span>
            </h2>
          </div>
          <p className={styles.lead} data-contact="intro">
            Szikszón, a Kassai úton. Bejelentkezés nélkül is fogadjuk, nyitvatartási időben.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.info}>
            <div className={styles.timeline} data-contact="timeline">
              <div className={styles.timelineTop}>
                <p className={styles.timelineTitle}>Nyitvatartás</p>
                <p className={styles.status}>
                  {status && (
                    <>
                      <span className={`${styles.dot} ${status.open ? styles.dotOpen : ''}`} />
                      {status.label}
                    </>
                  )}
                </p>
              </div>

              <div className={styles.axis} aria-hidden="true">
                {TICKS.map((t) => (
                  <span key={t} style={{ left: `${toPercent(t)}%` }} data-major={t % 6 === 0}>
                    {t}
                  </span>
                ))}
              </div>

              <ol className={styles.days}>
                {DAYS.map((d) => {
                  const hours = OPENING_HOURS[d.index]
                  const isToday = now?.day === d.index
                  return (
                    <li key={d.index} className={styles.day} data-today={isToday}>
                      <span className={styles.dayName} aria-hidden="true">{d.short}</span>
                      <span className={styles.track} aria-hidden="true">
                        {hours ? (
                          <span
                            className={styles.bar}
                            data-contact="bar"
                            style={{ left: `${toPercent(hours[0])}%`, width: `${toPercent(hours[1]) - toPercent(hours[0])}%` }}
                          />
                        ) : (
                          <span className={styles.closedTrack} />
                        )}
                        {isToday && showNowLine && nowHour !== null && (
                          <span className={styles.now} style={{ left: `${toPercent(nowHour)}%` }}>
                            <span className={styles.nowLabel}>most</span>
                          </span>
                        )}
                      </span>
                      <span className={styles.dayHours}>
                        <span className="sr-only">{d.name}{isToday ? ' (ma)' : ''}: </span>
                        {hours ? `${hours[0]}–${hours[1]}` : 'zárva'}
                      </span>
                    </li>
                  )
                })}
              </ol>
            </div>

            <ul className={styles.list}>
              <ContactItem icon={<PhoneIcon />} label="Telefon" reveal>
                <a href={PHONE_HREF} className={styles.phone}>(06 46) 796 692</a>
              </ContactItem>
              <ContactItem icon={<PinIcon />} label="Cím" reveal>
                {ADDRESS}
              </ContactItem>
              <ContactItem icon={<MailIcon />} label="E-mail" reveal>
                <a href={`mailto:${EMAIL}`} className={styles.link}>{EMAIL}</a>
              </ContactItem>
              <ContactItem icon={<ParkingIcon />} label="Parkolás" reveal>
                Az udvaron
              </ContactItem>
            </ul>
          </div>

          <div className={styles.mapCol} data-contact="reveal">
            <div className={styles.map}>
              {showMap ? (
                <iframe
                  src={MAP_EMBED}
                  className={styles.iframe}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Varga Gumi a Google Térképen"
                  allowFullScreen
                />
              ) : (
                <div className={styles.placeholder}>
                  <MapDrawing />
                  <div className={styles.consent}>
                    <p>A térkép a Google szolgáltatása, betöltéskor sütiket helyezhet el.</p>
                    <button type="button" className={styles.loadBtn} onClick={() => setMapRequested(true)}>
                      Térkép betöltése
                    </button>
                  </div>
                </div>
              )}
            </div>

            <a href={DIRECTIONS_HREF} target="_blank" rel="noopener noreferrer" className={styles.directions}>
              Útvonaltervezés a Google Térképen
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactItem({ icon, label, children, reveal }: { icon: ReactNode; label: string; children: ReactNode; reveal?: boolean }) {
  return (
    <li className={styles.item} data-contact={reveal ? 'reveal' : undefined}>
      <span className={styles.icon}>{icon}</span>
      <div>
        <p className={styles.itemLabel}>{label}</p>
        <div className={styles.itemValue}>{children}</div>
      </div>
    </li>
  )
}

function MapDrawing() {
  return (
    <svg className={styles.drawing} viewBox="0 0 600 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="none" strokeLinecap="round">
        <path d="M-40 520 C160 480 320 470 420 380 S600 220 660 190" className={styles.roadMain} />
        <path d="M-40 150 L660 90" className={styles.road} />
        <path d="M-40 330 L660 280" className={styles.road} />
        <path d="M140 -40 L200 760" className={styles.road} />
        <path d="M460 -40 L430 760" className={styles.road} />
        <path d="M-40 640 L660 610" className={styles.road} />
      </g>
      <circle cx="310" cy="440" r="46" className={styles.pinHalo} />
      <circle cx="310" cy="440" r="14" className={styles.pin} />
    </svg>
  )
}

const iconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 9a16 16 0 006 6l1.18-1.18a2 2 0 012.11-.45c.9.37 1.86.6 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

function ParkingIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M9.5 17V7h3.5a3 3 0 010 6H9.5" />
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
