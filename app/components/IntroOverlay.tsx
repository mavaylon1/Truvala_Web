'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function IntroOverlay() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const alreadyPlayed = sessionStorage.getItem('introPlayed') === 'true'

    if (prefersReduced || alreadyPlayed) {
      if (containerRef.current) containerRef.current.style.display = 'none'
      return
    }

    sessionStorage.setItem('introPlayed', 'true')
    document.body.style.overflow = 'hidden'

    gsap.set(logoRef.current, { y: -180, opacity: 0 })
    gsap.set(lineRef.current, { scaleY: 0, opacity: 0 })

    const tl = gsap.timeline({
      delay: 0.1,
      onComplete: () => {
        document.body.style.overflow = ''
        if (containerRef.current) containerRef.current.style.display = 'none'
      },
    })

    tl
      .to(logoRef.current, { y: 0, opacity: 1, duration: 0.82, ease: 'power3.out' })
      // Premium bounce
      .to(logoRef.current, { y: 14, duration: 0.14, ease: 'power2.out' })
      .to(logoRef.current, { y: -5, duration: 0.11, ease: 'power2.out' })
      .to(logoRef.current, { y: 3,  duration: 0.09, ease: 'power2.out' })
      .to(logoRef.current, { y: 0,  duration: 0.08, ease: 'power2.inOut' })
      .to({}, { duration: 0.22 })
      // Neon seam extends from center
      .to(lineRef.current, { opacity: 1, scaleY: 1, duration: 0.58, ease: 'expo.out' })
      .to({}, { duration: 0.32 })
      // Logo + line fade
      .to(logoRef.current, { opacity: 0, duration: 0.28, ease: 'power2.in' }, '-=0.08')
      .to(lineRef.current, { opacity: 0, duration: 0.28, ease: 'power2.in' }, '<')
      // Panels split
      .to(leftRef.current,  { xPercent: -100, duration: 0.92, ease: 'power3.inOut' }, '-=0.12')
      .to(rightRef.current, { xPercent: 100,  duration: 0.92, ease: 'power3.inOut' }, '<')

    return () => {
      tl.kill()
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Left panel — frosted glass over aurora */}
      <div
        ref={leftRef}
        className="absolute top-0 bottom-0 left-0 w-1/2"
        style={{
          background: 'rgba(219, 234, 254, 0.72)',
          backdropFilter: 'blur(20px) saturate(1.4) brightness(1.05)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4) brightness(1.05)',
        }}
      />
      {/* Right panel */}
      <div
        ref={rightRef}
        className="absolute top-0 bottom-0 right-0 w-1/2"
        style={{
          background: 'rgba(240, 245, 255, 0.72)',
          backdropFilter: 'blur(20px) saturate(1.4) brightness(1.05)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4) brightness(1.05)',
        }}
      />

      {/* Center: seam + logo */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 10, pointerEvents: 'none' }}>
        {/* Neon blue seam line */}
        <div
          ref={lineRef}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            width: 2,
            transform: 'translateX(-50%)',
            transformOrigin: 'center center',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(37,99,235,0.5) 12%, rgba(34,211,238,0.9) 50%, rgba(37,99,235,0.5) 88%, transparent 100%)',
            boxShadow: '0 0 12px rgba(34,211,238,0.6), 0 0 24px rgba(59,130,246,0.3)',
          }}
        />

        {/* Logo mark */}
        <div
          ref={logoRef}
          className="flex flex-col items-center gap-3"
          style={{ position: 'relative', zIndex: 20 }}
        >
          {/* White box with blue house */}
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 22,
              background: 'linear-gradient(140deg, #ffffff 0%, #eff6ff 100%)',
              border: '2px solid rgba(37,99,235,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 14px 48px rgba(37,99,235,0.35), 0 4px 16px rgba(34,211,238,0.2), 0 0 0 8px rgba(59,130,246,0.08)',
            }}
          >
            <svg width="40" height="38" viewBox="0 0 40 38" fill="none">
              <path d="M20 2L38 16V36H27V24H13V36H2V16L20 2Z" fill="#2563eb" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '0.32em',
              color: '#1e3a8a',
              opacity: 0.85,
            }}
          >
            TRUVALA
          </span>
        </div>
      </div>
    </div>
  )
}
