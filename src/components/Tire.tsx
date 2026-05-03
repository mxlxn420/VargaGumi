import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface TireProps {
  rotationRef: React.MutableRefObject<number>
  mobile?: boolean
}

const COUNT = 380

export default function Tire({ rotationRef, mobile = false }: TireProps) {
  const groupRef = useRef<THREE.Group>(null)
  const particleGeoRef = useRef<THREE.BufferGeometry>(null)

  // Tight orbit positions (original)
  const tightPositions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 1.85 + Math.random() * 1.2
      const spread = (Math.random() - 0.5) * 0.7
      pos[i * 3]     = Math.cos(angle) * radius
      pos[i * 3 + 1] = Math.sin(angle) * radius
      pos[i * 3 + 2] = spread
    }
    return pos
  }, [])

  // Scattered sphere positions
  const scatterPositions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3.5 + Math.random() * 2.5
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  // Working buffer for interpolation
  const interpBuffer = useMemo(() => new Float32Array(COUNT * 3), [])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Tire spin
    rotationRef.current += delta * 0.26
    groupRef.current.rotation.z = rotationRef.current

    // Particle scatter based on scroll (hero scroll = 0–200vh)
    const scrollProgress = Math.min(
      window.scrollY / (1.8 * window.innerHeight),
      1
    )
    // Ease in cubic
    const eased = scrollProgress * scrollProgress * scrollProgress

    if (particleGeoRef.current) {
      for (let i = 0; i < COUNT * 3; i++) {
        interpBuffer[i] = tightPositions[i] + (scatterPositions[i] - tightPositions[i]) * eased
      }
      const attr = particleGeoRef.current.attributes.position as THREE.BufferAttribute
      attr.set(interpBuffer)
      attr.needsUpdate = true
    }
  })

  // Mobilon kevesebb szegmens = jobb teljesítmény
  const seg = mobile ? 16 : 32
  const radSeg = mobile ? 48 : 96

  // Mobilon kisebb méret hogy ne lógjon ki a portré viewport-ból
  const s = mobile ? 0.62 : 1

  return (
    <group ref={groupRef} rotation={[Math.PI * 0.08, 0, 0]} scale={[s, s, s]}>
      {/* Main tire body */}
      <mesh>
        <torusGeometry args={[1.1, 0.52, seg, radSeg]} />
        <meshStandardMaterial color="#0c0a08" roughness={0.93} metalness={0.03} />
      </mesh>

      {/* Inner tread groove ring */}
      {!mobile && (
        <mesh>
          <torusGeometry args={[1.1, 0.40, 8, radSeg]} />
          <meshStandardMaterial color="#161210" roughness={0.88} metalness={0.0} />
        </mesh>
      )}

      {/* Tread pattern segments — skip on mobile */}
      {!mobile && Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2
        const r = 1.1
        return (
          <mesh key={`tread-${i}`} position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]} rotation={[0, 0, angle + Math.PI / 2]}>
            <boxGeometry args={[0.09, 0.56, 0.06]} />
            <meshStandardMaterial color="#1a1816" roughness={0.96} metalness={0} />
          </mesh>
        )
      })}

      {/* Red wireframe overlay */}
      <mesh>
        <torusGeometry args={[1.1, 0.535, mobile ? 10 : 18, mobile ? 36 : 56]} />
        <meshBasicMaterial color="#e63700" wireframe transparent opacity={0.5} />
      </mesh>

      {/* Rim barrel */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.58, 0.58, 0.22, mobile ? 24 : 48, 1, true]} />
        <meshStandardMaterial color="#888e94" roughness={0.22} metalness={0.88} side={THREE.BackSide} />
      </mesh>

      {/* Rim outer flange */}
      <mesh>
        <torusGeometry args={[0.72, 0.072, mobile ? 12 : 24, mobile ? 40 : 72]} />
        <meshStandardMaterial color="#c2c6ca" roughness={0.12} metalness={0.95} />
      </mesh>

      {/* Rim inner flange — skip on mobile */}
      {!mobile && (
        <mesh>
          <torusGeometry args={[0.58, 0.045, 16, 64]} />
          <meshStandardMaterial color="#a0a6ac" roughness={0.18} metalness={0.92} />
        </mesh>
      )}

      {/* Hub disc */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, mobile ? 20 : 40]} />
        <meshStandardMaterial color="#9ea4aa" roughness={0.15} metalness={0.94} />
      </mesh>

      {/* 5 spokes */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2 + Math.PI / 10
        return (
          <mesh key={`spoke-${i}`} position={[Math.cos(angle) * 0.47, Math.sin(angle) * 0.47, 0]} rotation={[0, 0, angle + Math.PI / 2]}>
            <boxGeometry args={[0.055, 0.52, 0.034]} />
            <meshStandardMaterial color="#bec4ca" roughness={0.14} metalness={0.96} />
          </mesh>
        )
      })}

      {/* Center cap */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.095, 0.095, 0.05, 28]} />
        <meshStandardMaterial color="#e63700" roughness={0.28} metalness={0.62} emissive="#7a1c00" emissiveIntensity={0.4} />
      </mesh>

      {/* Animated particles */}
      <points>
        <bufferGeometry ref={particleGeoRef}>
          <bufferAttribute attach="attributes-position" args={[tightPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#e63700" size={0.021} transparent opacity={0.72} sizeAttenuation />
      </points>
    </group>
  )
}
