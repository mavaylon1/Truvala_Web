'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Particle {
  bx:    number   // base x
  by:    number   // base y
  r:     number   // radius
  alpha: number
  rgb:   [number, number, number]
}

const COLORS: [number, number, number][] = [
  [255, 255, 255],
  [255, 255, 255],
  [37,  99,  235],
  [6,   182, 212],
  [34,  211, 238],
]

function buildParticles(w: number, h: number): Particle[] {
  // Grid layout with slight jitter so it never looks mechanical
  const cols  = Math.round(w / 38)
  const rows  = Math.round(h / 38)
  const cellW = w / cols
  const cellH = h / rows
  const out: Particle[] = []

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      out.push({
        bx:    c * cellW + cellW * 0.5 + (Math.random() - 0.5) * cellW * 0.7,
        by:    r * cellH + cellH * 0.5 + (Math.random() - 0.5) * cellH * 0.7,
        r:     0.9 + Math.random() * 1.6,
        alpha: 0.28 + Math.random() * 0.52,
        rgb:   COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }
  }
  return out
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

    let particles = buildParticles(w, h)

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width  = w
      canvas.height = h
      particles = buildParticles(w, h)
      if (prefersReduced) draw(0)
    }
    window.addEventListener('resize', resize)

    // Ambient color blobs so the field has color variety
    const blobs = [
      { cx: 0.20, cy: 0.35, r: 0.55, rgb: [37,  99,  235] as [number,number,number], alpha: 0.09 },
      { cx: 0.78, cy: 0.60, r: 0.50, rgb: [6,   182, 212] as [number,number,number], alpha: 0.08 },
      { cx: 0.50, cy: 0.80, r: 0.45, rgb: [124, 58,  237] as [number,number,number], alpha: 0.07 },
    ]

    function drawBlobs(time: number) {
      for (const b of blobs) {
        const px = (b.cx + Math.sin(time * 0.10) * 0.05) * w
        const py = (b.cy + Math.cos(time * 0.08) * 0.05) * h
        const r  = b.r * Math.min(w, h)
        const [r_, g_, b_] = b.rgb
        const grad = ctx.createRadialGradient(px, py, 0, px, py, r)
        grad.addColorStop(0, `rgba(${r_},${g_},${b_},${b.alpha})`)
        grad.addColorStop(1, `rgba(${r_},${g_},${b_},0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawParticles(time: number) {
      // Two layered waves travelling in the same direction — primary + gentle ripple
      const amp1  = h * 0.075         // ~67px on 900px screen
      const amp2  = h * 0.028
      const freq1 = (Math.PI * 2) / (w * 0.44)   // ~2.3 crests across screen
      const freq2 = (Math.PI * 2) / (w * 0.22)
      const spd1  = 0.28              // rad / s  — slow rolling
      const spd2  = 0.46

      for (const p of particles) {
        const dy = amp1 * Math.sin(p.bx * freq1 + time * spd1)
               + amp2 * Math.sin(p.bx * freq2 + time * spd2 + 1.4)

        const x = p.bx
        const y = p.by + dy

        if (y < -10 || y > h + 10) continue   // skip if scrolled off canvas

        const [r, g, b] = p.rgb
        ctx.beginPath()
        ctx.arc(x, y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`
        ctx.fill()
      }
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, w, h)
      drawBlobs(time)
      drawParticles(time)
    }

    if (prefersReduced) {
      draw(0)
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
