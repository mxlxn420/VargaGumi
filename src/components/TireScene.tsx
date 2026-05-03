import { useRef, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Preload } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Tire from './Tire'

gsap.registerPlugin(ScrollTrigger)

function CameraRig({ scrollContainerRef }: { scrollContainerRef: React.RefObject<HTMLElement | null> }) {
  const { camera } = useThree()

  useEffect(() => {
    const mobile = window.innerWidth < 768

    // Mobile: centered frontal view — portré módhoz optimalizált
    // Desktop: slight top-right angle for depth
    const start = mobile
      ? { x: 0, y: 0.1, z: 3.8 }   // közelebb → kisebb scale tire kitölti
      : { x: 0.8, y: 1.2, z: 5.2 }

    const end = mobile
      ? { x: 0, y: -0.05, z: 2.0, lookY: 0 }  // drámai közelítés rimre
      : { x: -0.4, y: 0.3, z: 2.6, lookY: -0.1 }

    camera.position.set(start.x, start.y, start.z)
    camera.lookAt(0, 0, 0)

    const proxy = { ...start, lookY: 0 }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    })

    tl.to(proxy, {
      ...end,
      duration: 1,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.position.set(proxy.x, proxy.y, proxy.z)
        camera.lookAt(0, proxy.lookY, 0)
      },
    })

    return () => { tl.kill() }
  }, [camera, scrollContainerRef])

  return null
}

interface TireSceneProps {
  scrollContainerRef: React.RefObject<HTMLElement | null>
}

export default function TireScene({ scrollContainerRef }: TireSceneProps) {
  const rotationRef = useRef(0)
  const mobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <Canvas
      dpr={mobile ? [1, 1] : [1, 1.5]}
      gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
      camera={{ fov: mobile ? 58 : 42, near: 0.1, far: 100 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={mobile ? 0.4 : 0.18} />

      <directionalLight
        position={[4, 6, 4]}
        intensity={mobile ? 1.2 : 1.6}
        color="#fff4e8"
      />
      <directionalLight
        position={[-5, -2, 2]}
        intensity={0.5}
        color="#ff5500"
      />
      {!mobile && (
        <>
          <pointLight position={[0, 0, 3]} intensity={0.9} color="#ff6020" distance={8} />
          <pointLight position={[2, 3, -2]} intensity={0.4} color="#ffffff" distance={10} />
        </>
      )}

      <Tire rotationRef={rotationRef} mobile={mobile} />

      <CameraRig scrollContainerRef={scrollContainerRef} />

      <Environment preset="studio" />
      {!mobile && <Preload all />}
    </Canvas>
  )
}
