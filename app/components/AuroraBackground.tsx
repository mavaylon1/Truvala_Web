'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Strand {
  r1:    number   // outer arm length (fraction of min viewport dim)
  r2:    number   // inner arm length
  ω1:    number   // outer rotation speed (rad / s)
  ω2:    number   // inner rotation speed
  n:     number   // harmonic — controls how many loops per revolution
  phase: number   // phase offset
  width: number   // stroke width px
  rgb:   [number, number, number]
  alpha: number
}

// Six strands — slow, soothing rotation speeds so the motion feels like breathing
const STRANDS: Strand[] = [
  { r1: 0.28, r2: 0.16, ω1:  0.09, ω2: -0.15, n: 2, phase: 0.0, width: 14, rgb: [37,  99,  235], alpha: 0.22 },
  { r1: 0.22, r2: 0.20, ω1: -0.11, ω2:  0.18, n: 2, phase: 1.3, width: 10, rgb: [6,   182, 212], alpha: 0.20 },
  { r1: 0.32, r2: 0.12, ω1:  0.08, ω2: -0.20, n: 3, phase: 2.5, width: 16, rgb: [99,  102, 241], alpha: 0.17 },
  { r1: 0.18, r2: 0.22, ω1: -0.13, ω2:  0.14, n: 2, phase: 3.7, width:  9, rgb: [34,  211, 238], alpha: 0.21 },
  { r1: 0.26, r2: 0.14, ω1:  0.10, ω2: -0.17, n: 2, phase: 0.9, width: 18, rgb: [124, 58,  237], alpha: 0.15 },
  { r1: 0.30, r2: 0.10, ω1: -0.08, ω2:  0.22, n: 3, phase: 2.1, width: 12, rgb: [59,  130, 246], alpha: 0.19 },
]

const SAMPLES = 300  // points per strand — more = smoother curves

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

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width  = w
      canvas.height = h
      if (prefersReduced) draw(0)
    }
    window.addEventListener('resize', resize)

    function drawStrand(s: Strand, time: number) {
      const cx    = w / 2
      const cy    = h / 2
      const scale = Math.min(w, h)
      const R1    = s.r1 * scale
      const R2    = s.r2 * scale

      ctx.beginPath()
      for (let i = 0; i <= SAMPLES; i++) {
        const t = (i / SAMPLES) * Math.PI * 2
        const x = cx + R1 * Math.cos(s.ω1 * time + t)
                     + R2 * Math.cos(s.ω2 * time + s.n * t + s.phase)
        const y = cy + R1 * Math.sin(s.ω1 * time + t)
                     + R2 * Math.sin(s.ω2 * time + s.n * t + s.phase)
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath()

      const [r, g, b] = s.rgb
      ctx.strokeStyle = `rgba(${r},${g},${b},${s.alpha})`
      ctx.lineWidth   = s.width
      ctx.lineCap     = 'round'
      ctx.lineJoin    = 'round'
      ctx.stroke()
    }

    // Faint ambient glow so there's color even between strands
    function drawAmbient(time: number) {
      const ambients = [
        { cx: 0.25, cy: 0.30, r: 0.55, rgb: [37, 99, 235]  as [number,number,number], alpha: 0.07 },
        { cx: 0.75, cy: 0.65, r: 0.50, rgb: [6, 182, 212]  as [number,number,number], alpha: 0.06 },
        { cx: 0.50, cy: 0.55, r: 0.45, rgb: [124, 58, 237] as [number,number,number], alpha: 0.05 },
      ]
      for (const a of ambients) {
        const px = (a.cx + Math.sin(time * 0.12) * 0.06) * w
        const py = (a.cy + Math.cos(time * 0.09) * 0.06) * h
        const r  = a.r * Math.min(w, h)
        const [r_, g_, b_] = a.rgb
        const grad = ctx.createRadialGradient(px, py, 0, px, py, r)
        grad.addColorStop(0, `rgba(${r_},${g_},${b_},${a.alpha})`)
        grad.addColorStop(1, `rgba(${r_},${g_},${b_},0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, w, h)
      drawAmbient(time)
      for (const strand of STRANDS) {
        drawStrand(strand, time)
      }
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
