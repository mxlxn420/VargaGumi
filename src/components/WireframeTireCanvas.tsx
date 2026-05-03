import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export const PANEL_POSES: [number, number, number][] = [
  [0.12, 0, 0],
  [0.18, Math.PI * 0.42, 0.12],
  [Math.PI * 0.38, -Math.PI * 0.18, 0.1],
]

export const PANEL_COLORS = ['#e63700', '#ff7200', '#c8820a']

// Stat display per panel (value shown as floating 3D text)
const STAT_TEXTS = ['69★', '7:00', '20+']
const STAT_LABELS = ['értékelés', 'nyitástól', 'év']

interface WireframeTireProps {
  activePanelRef: React.MutableRefObject<number>
}

function WireframeTire({ activePanelRef }: WireframeTireProps) {
  const groupRef    = useRef<THREE.Group>(null)
  const outerMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const innerMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const rimMatRef   = useRef<THREE.MeshBasicMaterial>(null)
  const textRef     = useRef<any>(null)
  const labelRef    = useRef<any>(null)

  const currentRot   = useRef<THREE.Euler>(new THREE.Euler(...PANEL_POSES[0]))
  const currentColor = useRef(new THREE.Color(PANEL_COLORS[0]))
  const spinAngle    = useRef(0)
  const currentTextColor = useRef(new THREE.Color(PANEL_COLORS[0]))

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const panel = activePanelRef.current
    const targetPose  = PANEL_POSES[panel]
    const targetColor = new THREE.Color(PANEL_COLORS[panel])

    const lerpSpeed = 0.055
    currentRot.current.x += (targetPose[0] - currentRot.current.x) * lerpSpeed
    currentRot.current.y += (targetPose[1] - currentRot.current.y) * lerpSpeed
    currentRot.current.z += (targetPose[2] - currentRot.current.z) * lerpSpeed

    spinAngle.current += delta * 0.22

    groupRef.current.rotation.set(
      currentRot.current.x,
      currentRot.current.y + spinAngle.current,
      currentRot.current.z,
    )

    currentColor.current.lerp(targetColor, 0.04)
    const c = currentColor.current

    if (outerMatRef.current) outerMatRef.current.color.copy(c)
    if (innerMatRef.current) innerMatRef.current.color.copy(c)
    if (rimMatRef.current) {
      rimMatRef.current.color.setRGB(
        Math.min(c.r * 0.6 + 0.35, 1),
        Math.min(c.g * 0.6 + 0.35, 1),
        Math.min(c.b * 0.6 + 0.35, 1),
      )
    }

    // Update floating 3D text
    currentTextColor.current.lerp(targetColor, 0.06)
    if (textRef.current) {
      const newText = STAT_TEXTS[panel]
      if (textRef.current.text !== newText) textRef.current.text = newText
      textRef.current.color = `#${currentTextColor.current.getHexString()}`
    }
    if (labelRef.current) {
      const newLabel = STAT_LABELS[panel]
      if (labelRef.current.text !== newLabel) labelRef.current.text = newLabel
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <torusGeometry args={[1.1, 0.52, 18, 56]} />
        <meshBasicMaterial ref={outerMatRef} color="#e63700" wireframe transparent opacity={0.82} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.1, 0.38, 10, 56]} />
        <meshBasicMaterial ref={innerMatRef} color="#e63700" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.72, 0.06, 12, 48]} />
        <meshBasicMaterial ref={rimMatRef} color="#c8c8c8" wireframe transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.04, 24]} />
        <meshBasicMaterial color="#aaaaaa" wireframe transparent opacity={0.5} />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2 + Math.PI / 10
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.46, Math.sin(angle) * 0.46, 0]} rotation={[0, 0, angle + Math.PI / 2]}>
            <boxGeometry args={[0.04, 0.5, 0.02]} />
            <meshBasicMaterial color="#aaaaaa" wireframe transparent opacity={0.5} />
          </mesh>
        )
      })}

      {/* Floating 3D stat number */}
      <Text
        ref={textRef}
        position={[2.0, 0.2, 0]}
        fontSize={0.58}
        color="#e63700"
        anchorX="left"
        anchorY="middle"
        outlineWidth={0}
        fillOpacity={0.95}
      >
        {STAT_TEXTS[0]}
      </Text>

      {/* Floating label */}
      <Text
        ref={labelRef}
        position={[2.0, -0.28, 0]}
        fontSize={0.18}
        color="rgba(240,235,228,0.45)"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.12}
      >
        {STAT_LABELS[0]}
      </Text>
    </group>
  )
}

interface WireframeTireCanvasProps {
  activePanelRef: React.MutableRefObject<number>
}

export default function WireframeTireCanvas({ activePanelRef }: WireframeTireCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 38, position: [0, 0, 5.8] }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <WireframeTire activePanelRef={activePanelRef} />
    </Canvas>
  )
}
