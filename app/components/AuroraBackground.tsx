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
  r: number; alpha: number
}

const BLOBS: Blob[] = [
  { cx: 0.10, cy: 0.18, r: 0.60, rgb: [37,  99,  235], alpha: 0.14, phase: 0.0, sx: 0.23, sy: 0.18, ax: 0.10, ay: 0.09 },
  { cx: 0.82, cy: 0.10, r: 0.52, rgb: [6,   182, 212], alpha: 0.12, phase: 1.9, sx: 0.18, sy: 0.27, ax: 0.09, ay: 0.12 },
  { cx: 0.45, cy: 0.82, r: 0.48, rgb: [124, 58,  237], alpha: 0.10, phase: 3.6, sx: 0.15, sy: 0.20, ax: 0.13, ay: 0.09 },
  { cx: 0.92, cy: 0.62, r: 0.42, rgb: [34,  211, 238], alpha: 0.10, phase: 0.8, sx: 0.30, sy: 0.16, ax: 0.07, ay: 0.11 },
  { cx: 0.18, cy: 0.75, r: 0.50, rgb: [59,  130, 246], alpha: 0.11, phase: 2.4, sx: 0.21, sy: 0.26, ax: 0.11, ay: 0.08 },
  { cx: 0.60, cy: 0.38, r: 0.40, rgb: [99,  102, 241], alpha: 0.08, phase: 4.2, sx: 0.26, sy: 0.19, ax: 0.08, ay: 0.12 },
]

const CONNECT_DIST    = 100
const CONNECT_ALPHA   = 0.28
const MAX_CONNECTIONS = 2

function particleCount(w: number): number {
  if (w < 480)  return 20    // small phone
  if (w < 768)  return 29    // large phone
  if (w < 1024) return 58    // tablet
  if (w < 1920) return 72    // desktop
  if (w < 2560) return 104   // 1440p / wide
  return 144                  // ultrawide 3440+
}

function initParticles(w: number, h: number): Particle[] {
  const count = particleCount(w)
  return Array.from({ length: count }, () => {
    const speed = 0.012 + Math.random() * 0.013
    const angle = Math.random() * Math.PI * 2
    return {
      x:     Math.random() * w,
      y:     Math.random() * h,
      vx:    Math.cos(angle) * speed,
      vy:    Math.sin(angle) * speed,
      r:     0.7 + Math.random() * 1.3,
      alpha: 0.25 + Math.random() * 0.45,
    }
  })
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

    let particles = initParticles(w, h)

    const resize = () => {
      const newW = window.innerWidth
      // Rebuild particles if crossing a breakpoint
      if (particleCount(newW) !== particleCount(w)) {
        particles = initParticles(newW, window.innerHeight)
      }
      w = newW
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

    function updateAndDrawParticles(dt: number) {
      // Update positions
      for (const p of particles) {
        p.x += p.vx * dt
        p.y += p.vy * dt
        if (p.x < 0)  p.x += w
        if (p.x > w)  p.x -= w
        if (p.y < 0)  p.y += h
        if (p.y > h)  p.y -= h
      }

      // Connections — find candidates, sort by distance, cap per dot
      const counts = new Int8Array(particles.length)
      const candidates: { i: number; j: number; dist: number }[] = []

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x
          const dy   = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) candidates.push({ i, j, dist })
        }
      }
      candidates.sort((a, b) => a.dist - b.dist)

      ctx.lineWidth = 0.8
      for (const { i, j, dist } of candidates) {
        if (counts[i] >= MAX_CONNECTIONS || counts[j] >= MAX_CONNECTIONS) continue
        counts[i]++
        counts[j]++
        const a = (1 - dist / CONNECT_DIST) * CONNECT_ALPHA
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.strokeStyle = `rgba(37,99,235,${a.toFixed(3)})`
        ctx.stroke()
      }

      // Dots
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(37,99,235,${p.alpha.toFixed(3)})`
        ctx.fill()
      }
    }

    function draw(time: number, deltaTime: number) {
      ctx.clearRect(0, 0, w, h)
      drawBlobs(time)
      if (!prefersReduced) updateAndDrawParticles(deltaTime)
      else updateAndDrawParticles(0)
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
