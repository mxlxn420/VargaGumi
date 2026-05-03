import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  // Touch eszközökön nem jelenítjük meg
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null
  }
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const isHovering = useRef(false)

  useEffect(() => {
    const dot = dotRef.current!
    const ring = ringRef.current!

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      gsap.set(dot, { x: e.clientX, y: e.clientY })
    }

    const onEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor
      ) {
        isHovering.current = true
        gsap.to(ring, { scale: 2.2, borderColor: '#e63700', opacity: 0.9, duration: 0.3, ease: 'power2.out' })
        gsap.to(dot, { scale: 0, duration: 0.2 })
      }
    }

    const onLeave = () => {
      isHovering.current = false
      gsap.to(ring, { scale: 1, borderColor: 'rgba(240,235,228,0.6)', opacity: 0.7, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    const tick = () => {
      const ease = 0.12
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * ease
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * ease
      gsap.set(ring, { x: ringPos.current.x, y: ringPos.current.y })
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#e63700',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'normal',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(240,235,228,0.6)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0.7,
        }}
      />
    </>
  )
}
