'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Blob {
  cx: number; cy: number; r: number
  rgb: [number, number, number]; alpha: number
  phase: number; sx: number; sy: number; ax: number; ay: number
}

const BLOBS: Blob[] = [
  { cx: 0.12, cy: 0.20, r: 0.55, rgb: [37,  99,  235], alpha: 0.12, phase: 0.0, sx: 0.20, sy: 0.16, ax: 0.10, ay: 0.09 },
  { cx: 0.80, cy: 0.15, r: 0.50, rgb: [6,   182, 212], alpha: 0.10, phase: 1.9, sx: 0.16, sy: 0.24, ax: 0.08, ay: 0.11 },
  { cx: 0.45, cy: 0.80, r: 0.45, rgb: [124, 58,  237], alpha: 0.08, phase: 3.6, sx: 0.14, sy: 0.18, ax: 0.12, ay: 0.08 },
]

const LINES = [
  {
    x0: -0.05, y0: 0.30, x1: 1.05, y1: 0.30,
    drift: 'y' as const, driftSpeed:  0.009,
    waves: [
      { amp: 0.14, freq: 1.6, phase: 0.0, ts: 0.035 },
      { amp: 0.05, freq: 3.1, phase: 1.4, ts: 0.055 },
    ],
    rgb: [37, 99, 235]  as [number,number,number], alpha: 0.26, width: 1.2,
  },
  {
    x0: 1.05, y0: 0.55, x1: -0.05, y1: 0.55,
    drift: 'y' as const, driftSpeed: -0.0065,
    waves: [
      { amp: 0.12, freq: 1.2, phase: 2.2, ts: 0.030 },
      { amp: 0.06, freq: 2.7, phase: 0.6, ts: 0.050 },
    ],
    rgb: [6, 182, 212]  as [number,number,number], alpha: 0.22, width: 1.0,
  },
  {
    x0: -0.05, y0: 0.72, x1: 1.05, y1: 0.72,
    drift: 'y' as const, driftSpeed:  0.011,
    waves: [
      { amp: 0.10, freq: 2.0, phase: 3.8, ts: 0.040 },
      { amp: 0.04, freq: 0.8, phase: 1.0, ts: 0.025 },
    ],
    rgb: [99, 102, 241] as [number,number,number], alpha: 0.20, width: 0.9,
  },
]

const SAMPLES    = 240
const FADE_ZONE  = 0.18
const REPEL_DIST = 0.16
const REPEL_STR  = 0.055

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

    function drawBlobs(time: number) {
      for (const b of BLOBS) {
        const px = (b.cx + Math.sin(time * b.sx + b.phase) * b.ax) * w
        const py = (b.cy + Math.cos(time * b.sy + b.phase * 1.3) * b.ay) * h
        const r  = b.r * Math.min(w, h)
        const [r_, g_, b_] = b.rgb
        const grad = ctx.createRadialGradient(px, py, 0, px, py, r)
        grad.addColorStop(0,    `rgba(${r_},${g_},${b_},${b.alpha})`)
        grad.addColorStop(0.45, `rgba(${r_},${g_},${b_},${+(b.alpha * 0.4).toFixed(3)})`)
        grad.addColorStop(1,    `rgba(${r_},${g_},${b_},0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawLines(time: number) {
      // Centre y of each line for repulsion
      const centres = LINES.map(ln => {
        const raw = (time * ln.driftSpeed) % 1.0
        const o   = raw < 0 ? raw + 1.0 : raw
        return ln.y0 + o
      })

      // Soft cosine repulsion between lines — keeps them apart but allows crossing
      const repel = new Array(LINES.length).fill(0)
      for (let i = 0; i < LINES.length; i++) {
        for (let j = i + 1; j < LINES.length; j++) {
          const d = centres[i] - centres[j]
          const a = Math.abs(d)
          if (a < REPEL_DIST && a > 0.001) {
            const f = REPEL_STR * 0.5 * (1 + Math.cos(Math.PI * a / REPEL_DIST))
            const s = d > 0 ? 1 : -1
            repel[i] += s * f
            repel[j] -= s * f
          }
        }
      }

      for (let li = 0; li < LINES.length; li++) {
        const ln = LINES[li]
        const dx  = ln.x1 - ln.x0
        const dy  = ln.y1 - ln.y0
        const len = Math.sqrt(dx * dx + dy * dy)
        const px  = -dy / len
        const py  =  dx / len

        const raw    = (time * ln.driftSpeed) % 1.0
        const offset = (raw < 0 ? raw + 1.0 : raw) + repel[li]
        const copies = [offset - 1.0, offset, offset + 1.0]

        const [r, g, b] = ln.rgb
        ctx.lineWidth = ln.width
        ctx.lineCap   = 'round'
        ctx.lineJoin  = 'round'

        for (const o of copies) {
          const pos  = ln.y0 + o
          const fade = Math.max(0, Math.min(pos / FADE_ZONE, (1.0 - pos) / FADE_ZONE, 1))
          if (fade < 0.01) continue

          ctx.beginPath()
          for (let i = 0; i <= SAMPLES; i++) {
            const s = i / SAMPLES
            let off = 0
            for (const wv of ln.waves) {
              off += wv.amp * Math.sin(s * wv.freq * Math.PI * 2 + time * wv.ts + wv.phase)
            }
            const bx = (ln.x0 + dx * s) * w
            const by = (ln.y0 + dy * s + o) * h
            const x  = bx + px * off * Math.min(w, h)
            const y  = by + py * off * Math.min(w, h)
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
          }
          ctx.strokeStyle = `rgba(${r},${g},${b},${(ln.alpha * fade).toFixed(3)})`
          ctx.stroke()
        }
      }
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, w, h)
      drawBlobs(time)
      drawLines(time)
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
