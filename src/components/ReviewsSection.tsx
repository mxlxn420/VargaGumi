import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const REVIEWS = [
  { quote: 'Gyors, rugalmas, kedvező áron.', name: 'B.B.' },
  { quote: 'Gyors szakszerű kiszolgálás, elfogadható ár.', name: 'F.H.' },
  { quote: 'Gyors szerelés, kedves emberek, maximálisan elégedett vagyok!', name: 'U.I.' },
  { quote: 'Korrekt, gyors munka! Csak ajánlani tudom!', name: 'C.D.' },
  { quote: 'Precíz, pontos, magas színvonalú műhely!', name: 'T.P.' },
  { quote: 'Rendes, hozzáértő munka, udvarias kiszolgálás!', name: 'F.L.' },
  { quote: 'Forma1-es gumijavítás! 😉', name: 'L.' },
]

const CARD_W = 290
const GAP = 18

function FloatingWireframeTire() {
  const groupRef = useRef<THREE.Group>(null)
  const t = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    t.current += delta
    // Slow rotation + float
    groupRef.current.rotation.z += delta * 0.18
    groupRef.current.rotation.y += delta * 0.09
    groupRef.current.position.y = Math.sin(t.current * 0.7) * 0.12
  })

  return (
    <group ref={groupRef} rotation={[0.22, 0, 0]}>
      {/* Main torus wireframe */}
      <mesh>
        <torusGeometry args={[1.0, 0.48, 16, 52]} />
        <meshBasicMaterial color="#e63700" wireframe transparent opacity={0.75} />
      </mesh>
      {/* Inner ring */}
      <mesh>
        <torusGeometry args={[1.0, 0.32, 8, 52]} />
        <meshBasicMaterial color="#e63700" wireframe transparent opacity={0.28} />
      </mesh>
      {/* Rim */}
      <mesh>
        <torusGeometry args={[0.65, 0.055, 10, 44]} />
        <meshBasicMaterial color="#cccccc" wireframe transparent opacity={0.55} />
      </mesh>
      {/* Hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.04, 20]} />
        <meshBasicMaterial color="#cccccc" wireframe transparent opacity={0.4} />
      </mesh>
      {/* Spokes */}
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i / 5) * Math.PI * 2 + Math.PI / 10
        return (
          <mesh key={i} position={[Math.cos(a) * 0.42, Math.sin(a) * 0.42, 0]} rotation={[0, 0, a + Math.PI / 2]}>
            <boxGeometry args={[0.04, 0.47, 0.02]} />
            <meshBasicMaterial color="#cccccc" wireframe transparent opacity={0.4} />
          </mesh>
        )
      })}
    </group>
  )
}

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#e63700">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

function monogram(name: string) {
  return name.replace(/[^A-Za-záéíóöőúüűÁÉÍÓÖŐÚÜŰ.]/g, '').replace(/\./g, '').slice(0, 2).toUpperCase() || name.slice(0, 1).toUpperCase()
}

export default function ReviewsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const totalW = REVIEWS.length * (CARD_W + GAP) - GAP

  return (
    <section style={{ position: 'relative', zIndex: 2, background: '#080400', paddingTop: 100, paddingBottom: 120, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16, fontFamily: 'var(--font-condensed)', fontSize: 11, letterSpacing: '0.28em', color: 'var(--accent)', textTransform: 'uppercase' as const }}>
          <span style={{ display: 'block', width: 22, height: 1, background: 'var(--accent)' }} />
          Ügyfeleink mondják
          <span style={{ display: 'block', width: 22, height: 1, background: 'var(--accent)' }} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(38px, 5vw, 66px)', letterSpacing: '0.04em', color: 'var(--text)', margin: 0, lineHeight: 1 }}>
          MIT MONDANAK<br />RÓLUNK.
        </h2>
      </div>

      {/* Center piece: floating wireframe tire */}
      <div style={{ position: 'relative', height: 260, marginBottom: 0, pointerEvents: 'none' }}>
        {/* Glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(230,55,0,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />
        {/* Canvas */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 260, height: 260 }}>
          <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} camera={{ fov: 42, position: [0, 0, 4.4] }} style={{ width: '100%', height: '100%' }}>
            <ambientLight intensity={0.4} />
            <FloatingWireframeTire />
          </Canvas>
        </div>
        {/* Drag hint */}
        <div style={{ position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-condensed)', fontSize: 10, letterSpacing: '0.26em', color: 'var(--text-dim)', textTransform: 'uppercase' as const, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'block', width: 16, height: 1, background: 'var(--text-dim)', opacity: 0.5 }} />
          Húzd el
          <span style={{ display: 'block', width: 16, height: 1, background: 'var(--text-dim)', opacity: 0.5 }} />
        </div>
      </div>

      {/* Drag track */}
      <div style={{ overflow: 'hidden', paddingBottom: 16, marginTop: 32, cursor: 'grab' }} ref={trackRef}>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -(totalW - (typeof window !== 'undefined' ? window.innerWidth : 1400) + 96) }}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          whileDrag={{ cursor: 'grabbing' }}
          style={{ display: 'flex', gap: GAP, paddingInline: 'var(--px)', width: 'max-content' }}
        >
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              style={{
                width: CARD_W,
                flexShrink: 0,
                background: 'rgba(20,14,8,0.92)',
                border: '1px solid rgba(240,235,228,0.08)',
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                userSelect: 'none',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Stars />

              {/* Quote */}
              <p style={{ fontFamily: 'var(--font-condensed)', fontWeight: 300, fontStyle: 'italic', fontSize: 15, lineHeight: 1.65, color: 'var(--text)', letterSpacing: '0.02em', margin: 0, marginBottom: 28, flex: 1 }}>
                „{r.quote}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                {/* Monogram avatar */}
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #e63700, #a02700)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: 14,
                  letterSpacing: '0.08em',
                  color: '#fff',
                  flexShrink: 0,
                }}>
                  {monogram(r.name)}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-condensed)', fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text)', textTransform: 'uppercase' as const }}>
                    {r.name}
                  </div>
                  <div style={{ display: 'flex', gap: 2, marginTop: 3 }}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} width="9" height="9" viewBox="0 0 24 24" fill="#e63700" opacity={0.7}>
                        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
