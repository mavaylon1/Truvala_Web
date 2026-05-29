'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Blob {
  cx: number; cy: number; r: number
  rgb: [number, number, number]; alpha: number
  phase: number; sx: number; sy: number; ax: number; ay: number
}

interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number
  maxAlpha: number
  life: number   // 0–1
  speed: number  // life units per ms
}

const BLOBS: Blob[] = [
  { cx: 0.10, cy: 0.18, r: 0.60, rgb: [37,  99,  235], alpha: 0.14, phase: 0.0, sx: 0.23, sy: 0.18, ax: 0.10, ay: 0.09 },
  { cx: 0.82, cy: 0.10, r: 0.52, rgb: [6,   182, 212], alpha: 0.12, phase: 1.9, sx: 0.18, sy: 0.27, ax: 0.09, ay: 0.12 },
  { cx: 0.45, cy: 0.82, r: 0.48, rgb: [124, 58,  237], alpha: 0.10, phase: 3.6, sx: 0.15, sy: 0.20, ax: 0.13, ay: 0.09 },
  { cx: 0.92, cy: 0.62, r: 0.42, rgb: [34,  211, 238], alpha: 0.10, phase: 0.8, sx: 0.30, sy: 0.16, ax: 0.07, ay: 0.11 },
  { cx: 0.18, cy: 0.75, r: 0.50, rgb: [59,  130, 246], alpha: 0.11, phase: 2.4, sx: 0.21, sy: 0.26, ax: 0.11, ay: 0.08 },
  { cx: 0.60, cy: 0.38, r: 0.40, rgb: [99,  102, 241], alpha: 0.08, phase: 4.2, sx: 0.26, sy: 0.19, ax: 0.08, ay: 0.12 },
]

const PARTICLE_COUNT = 120

function alphaFromLife(life: number): number {
  if (life < 0.18) return life / 0.18
  if (life < 0.78) return 1.0
  return (1.0 - life) / 0.22
}

function makeParticle(w: number, h: number, randomLife = false): Particle {
  const lifetime = 3500 + Math.random() * 5000  // 3.5–8.5 s
  const angle    = Math.random() * Math.PI * 2
  const drift    = 0.010 + Math.random() * 0.020  // px / ms — slow float
  return {
    x:        Math.random() * w,
    y:        Math.random() * h,
    vx:       Math.cos(angle) * drift,
    vy:       Math.sin(angle) * drift,
    r:        1.0 + Math.random() * 2.5,          // 1–3.5 px
    maxAlpha: 0.35 + Math.random() * 0.45,        // 0.35–0.80
    life:     randomLife ? Math.random() : 0,
    speed:    1 / lifetime,
  }
}

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!

    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width  = w
    canvas.height = h

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () =>
      makeParticle(w, h, true)
    )

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width  = w
      canvas.height = h
      if (prefersReduced) draw(0, 0)
    }
    window.addEventListener('resize', resize)

    function drawBlobs(time: number) {
      for (const b of BLOBS) {
        const px = (b.cx + Math.sin(time * b.sx + b.phase) * b.ax) * w
        const py = (b.cy + Math.cos(time * b.sy + b.phase * 1.3) * b.ay) * h
        const r  = b.r * Math.min(w, h)
        const [r_, g_, b_] = b.rgb
        const grad = ctx.createRadialGradient(px, py, 0, px, py, r)
        grad.addColorStop(0,    `rgba(${r_},${g_},${b_},${b.alpha})`)
        grad.addColorStop(0.42, `rgba(${r_},${g_},${b_},${+(b.alpha * 0.4).toFixed(3)})`)
        grad.addColorStop(1,    `rgba(${r_},${g_},${b_},0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawParticles(dt: number) {
      for (const p of particles) {
        if (!prefersReduced) {
          p.life += p.speed * dt
          p.x    += p.vx * dt
          p.y    += p.vy * dt
          if (p.life >= 1) Object.assign(p, makeParticle(w, h, false))
        }

        const alpha = alphaFromLife(p.life) * p.maxAlpha
        if (alpha < 0.01) continue

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
        ctx.fill()
      }
    }

    function draw(time: number, deltaTime: number) {
      ctx.clearRect(0, 0, w, h)
      drawBlobs(time)
      drawParticles(deltaTime)
    }

    if (prefersReduced) {
      draw(0, 0)
      return () => window.removeEventListener('resize', resize)
    }

    const ticker = gsap.ticker.add(draw)
    return () => {
      gsap.ticker.remove(ticker)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
