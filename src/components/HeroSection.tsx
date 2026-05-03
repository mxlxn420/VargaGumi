import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TireScene from './TireScene'

gsap.registerPlugin(ScrollTrigger)

const LINES = ['GUMI.', 'SZERVIZ.', 'PRECIZITÁS.']

export default function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLSpanElement[]>([])
  const subRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(linesRef.current, { y: '110%' })
      gsap.to(linesRef.current, {
        y: '0%',
        duration: 1.1,
        stagger: 0.14,
        ease: 'power4.out',
        delay: 0.5,
      })

      gsap.set(subRef.current, { opacity: 0, y: 18 })
      gsap.to(subRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1.1,
      })

      gsap.set(badgeRef.current, { opacity: 0, x: -12 })
      gsap.to(badgeRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 1.4,
      })

      gsap.set(scrollHintRef.current, { opacity: 0 })
      gsap.to(scrollHintRef.current, {
        opacity: 1,
        duration: 1,
        delay: 2.2,
      })

      gsap.to(scrollHintRef.current, {
        y: 6,
        duration: 1.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: 2.4,
      })

      // Fade out canvas as hero exits
      ScrollTrigger.create({
        trigger: scrollRef.current,
        start: 'bottom 80%',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (canvasWrapRef.current) {
            canvasWrapRef.current.style.opacity = String(1 - self.progress)
          }
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Fixed canvas — always behind everything */}
      <div
        ref={canvasWrapRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: 'radial-gradient(ellipse 68% 58% at 62% 52%, rgba(180,60,0,0.13) 0%, rgba(100,28,0,0.08) 40%, #080400 70%)',
          backgroundColor: '#080400',
          pointerEvents: 'none',
        }}
      >
        <TireScene scrollContainerRef={scrollRef} />

        {/* Glow bloom */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '58%',
            transform: 'translate(-50%, -50%)',
            width: 480,
            height: 480,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(230,55,0,0.13) 0%, rgba(180,40,0,0.06) 50%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Noise overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Scroll travel container — transparent, drives camera animation */}
      <div
        ref={scrollRef}
        style={{
          height: '200vh',
          position: 'relative',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        {/* Sticky hero UI overlay */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          {/* Hero text */}
          <div
            style={{
              position: 'absolute',
              left: 'clamp(20px, 4vw, 48px)',
              bottom: 'clamp(80px, 14%, 22%)',
              maxWidth: 'calc(100vw - 40px)',
              zIndex: 10,
              pointerEvents: 'all',
            }}
          >
            <div
              ref={badgeRef}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 28,
                fontFamily: 'var(--font-condensed)',
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: '0.28em',
                color: 'var(--accent)',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ display: 'block', width: 22, height: 1, background: 'var(--accent)' }} />
              Prémium gumiabroncs szerviz
            </div>

            <div>
              {LINES.map((line, i) => (
                <div key={line} style={{ clipPath: 'inset(-40px -10px 2px -10px)', lineHeight: 0.94 }}>
                  <span
                    ref={(el) => { if (el) linesRef.current[i] = el }}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(38px, 11vw, 118px)',
                      color: i === 2 ? 'transparent' : 'var(--text)',
                      WebkitTextStroke: i === 2 ? '1px rgba(240,235,228,0.5)' : 'none',
                      letterSpacing: '0.02em',
                      lineHeight: 1,
                      paddingBottom: 6,
                    }}
                  >
                    {line}
                  </span>
                </div>
              ))}
            </div>

            <div
              ref={subRef}
              style={{
                marginTop: 28,
                maxWidth: 320,
                fontFamily: 'var(--font-condensed)',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 15,
                letterSpacing: '0.04em',
                lineHeight: 1.65,
                color: 'var(--text-dim)',
                borderLeft: '2px solid var(--accent-dim)',
                paddingLeft: 16,
              }}
            >
              Minden gumiabroncs felszerelés mögött évtizedes tapasztalat és precíziós technológia áll.
            </div>
          </div>


          {/* Bottom rule */}
          <div style={{
            position: 'absolute',
            bottom: '14%',
            left: 'var(--px)',
            right: 'var(--px)',
            height: 1,
            background: 'linear-gradient(90deg, rgba(230,55,0,0.4) 0%, rgba(240,235,228,0.08) 60%, transparent 100%)',
            zIndex: 10,
          }} />

          {/* Scroll hint */}
          <div
            ref={scrollHintRef}
            style={{
              position: 'absolute',
              bottom: 36,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              pointerEvents: 'none',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: 10,
              letterSpacing: '0.3em',
              color: 'var(--text-dim)',
              textTransform: 'uppercase',
            }}>
              Görgetés
            </div>
            <div style={{
              width: 1,
              height: 36,
              background: 'linear-gradient(180deg, var(--text-dim) 0%, transparent 100%)',
            }} />
          </div>
        </div>
      </div>
    </>
  )
}
