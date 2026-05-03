import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function LoadingOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.7,
      delay: 0.15,
      ease: 'power2.inOut',
      onComplete: () => {
        if (overlayRef.current) {
          overlayRef.current.style.display = 'none'
        }
      },
    })
  }, [])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000000',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  )
}
