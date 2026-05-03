import { useRef, useEffect, useState } from 'react'
import WireframeTireCanvas, { PANEL_COLORS } from './WireframeTireCanvas'
import { useIsMobile } from '../hooks/useBreakpoint'

const PANELS = [
  {
    tag: 'Gumiszerelés',
    title: 'GYORS MINT A FORMA-1',
    body: 'Profi csapatunk percek alatt szereli fel az új abroncsokat. Minden méret, minden márka.',
    stat: { value: '69', unit: '', label: 'Google értékelés', suffix: '★' },
    accent: PANEL_COLORS[0],
  },
  {
    tag: 'Szezonális csere',
    title: 'TÉLEN TÉLI,\nNYÁRON NYÁRI',
    body: 'A megfelelő gumi az évszaknak megfelelően — gyors átszerelés, egyensúlyozással és nyomásellenőrzéssel együtt.',
    stat: { value: '7:00', unit: '', label: 'Reggeltől fogadunk', suffix: '' },
    accent: PANEL_COLORS[1],
  },
  {
    tag: 'Komplett szerviz',
    title: 'KOMPLETT SZERVIZ,\nEGY HELYEN',
    body: 'Gumiabroncs felszerelésétől a futómű állításon át a kerékegyensúlyozásig — mindent elvégzünk egy megállóban, tapasztalt szakemberekkel.',
    stat: { value: '10+', unit: '', label: 'Év tapasztalat', suffix: '' },
    accent: PANEL_COLORS[2],
  },
]

export default function StickySection() {
  const [activePanel, setActivePanel] = useState(0)
  const activePanelRef = useRef(0)
  const isMobile = useIsMobile()
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = panelRefs.current.indexOf(entry.target as HTMLDivElement)
            if (idx >= 0) {
              activePanelRef.current = idx
              setActivePanel(idx)
            }
          }
        })
      },
      {
        threshold: 0.55,
        rootMargin: '-10% 0px -10% 0px',
      }
    )

    panelRefs.current.forEach((panel) => {
      if (panel) observer.observe(panel)
    })

    return () => observer.disconnect()
  }, [])

  const accentColor = PANEL_COLORS[activePanel]

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#080400',
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      {/* ─── LEFT: sticky canvas — hidden on mobile ─── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '50%',
          height: '100vh',
          display: isMobile ? 'none' : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {/* Glow behind tire */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 50% 50%, ${accentColor}18 0%, transparent 65%)`,
            transition: 'background 0.8s ease',
            pointerEvents: 'none',
          }}
        />

        {/* Panel indicator dots */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 10,
            zIndex: 4,
          }}
        >
          {PANELS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === activePanel ? 22 : 6,
                height: 6,
                borderRadius: 3,
                background: i === activePanel ? accentColor : 'rgba(240,235,228,0.2)',
                transition: 'all 0.4s ease',
              }}
            />
          ))}
        </div>

        {/* Active panel tag */}
        <div
          style={{
            position: 'absolute',
            top: 48,
            left: 48,
            fontFamily: 'var(--font-condensed)',
            fontSize: 11,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: accentColor,
            transition: 'color 0.5s',
          }}
        >
          {PANELS[activePanel].tag}
        </div>

        {/* The wireframe canvas */}
        <div style={{ width: '78%', height: '60%', position: 'relative', zIndex: 2 }}>
          <WireframeTireCanvas activePanelRef={activePanelRef} />
        </div>
      </div>

      {/* ─── RIGHT: panels ─── */}
      <div
        style={{
          width: isMobile ? '100%' : '50%',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid rgba(240,235,228,0.07)',
        }}
      >
        {PANELS.map((panel, i) => (
          <div
            key={i}
            ref={(el) => { panelRefs.current[i] = el }}
            style={{
              minHeight: '90vh',
              padding: 'clamp(48px, 6vw, 72px) var(--px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderBottom: i < PANELS.length - 1 ? '1px solid rgba(240,235,228,0.06)' : 'none',
              position: 'relative',
            }}
          >
            {/* Panel number */}
            <div
              style={{
                position: 'absolute',
                top: 40,
                right: 56,
                fontFamily: 'var(--font-display)',
                fontSize: 72,
                color: 'rgba(240,235,228,0.04)',
                letterSpacing: '0.02em',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              0{i + 1}
            </div>

            {/* Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 28,
                fontFamily: 'var(--font-condensed)',
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: '0.28em',
                color: panel.accent,
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: 20,
                  height: 1,
                  background: panel.accent,
                }}
              />
              {panel.tag}
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(30px, 6vw, 62px)',
                letterSpacing: '0.03em',
                lineHeight: 1.02,
                color: 'var(--text)',
                marginBottom: 28,
                whiteSpace: 'pre-line',
              }}
            >
              {panel.title}
            </h2>

            {/* Body */}
            <p
              style={{
                fontFamily: 'var(--font-condensed)',
                fontWeight: 300,
                fontSize: 16,
                lineHeight: 1.7,
                letterSpacing: '0.02em',
                color: 'var(--text-dim)',
                maxWidth: 400,
                marginBottom: 52,
              }}
            >
              {panel.body}
            </p>

            {/* Stat */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 16,
                paddingTop: 32,
                borderTop: `1px solid ${panel.accent}28`,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(52px, 6vw, 80px)',
                  letterSpacing: '0.02em',
                  lineHeight: 1,
                  color: panel.accent,
                }}
              >
                {panel.stat.value}
                {panel.stat.suffix && (
                  <span style={{ fontSize: '0.55em', marginLeft: 4 }}>
                    {panel.stat.suffix}
                  </span>
                )}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-condensed)',
                  fontSize: 12,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--text-dim)',
                  paddingBottom: 10,
                }}
              >
                {panel.stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
