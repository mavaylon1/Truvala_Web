'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Blob {
  cx: number; cy: number; r: number
  rgb: [number, number, number]; alpha: number
  phase: number; sx: number; sy: number; ax: number; ay: number
}

const BLOBS: Blob[] = [
  { cx: 0.10, cy: 0.18, r: 0.60, rgb: [37,  99,  235], alpha: 0.13, phase: 0.0, sx: 0.23, sy: 0.18, ax: 0.10, ay: 0.09 },
  { cx: 0.82, cy: 0.10, r: 0.52, rgb: [6,   182, 212], alpha: 0.11, phase: 1.9, sx: 0.18, sy: 0.27, ax: 0.09, ay: 0.12 },
  { cx: 0.45, cy: 0.82, r: 0.48, rgb: [124, 58,  237], alpha: 0.09, phase: 3.6, sx: 0.15, sy: 0.20, ax: 0.13, ay: 0.09 },
  { cx: 0.92, cy: 0.62, r: 0.42, rgb: [34,  211, 238], alpha: 0.09, phase: 0.8, sx: 0.30, sy: 0.16, ax: 0.07, ay: 0.11 },
  { cx: 0.18, cy: 0.75, r: 0.50, rgb: [59,  130, 246], alpha: 0.10, phase: 2.4, sx: 0.21, sy: 0.26, ax: 0.11, ay: 0.08 },
]

// Spatial scale — fixed pixel units so the pattern looks the same size on all screens
const S        = 0.0022
const STEP     = 4     // px per integration step
const MAX_STEPS = 220  // max length of each streamline

// Vector field angle at pixel (x, y) — layered sines create organic regions of
// convergence and divergence without forcing closed loops
function fieldAngle(x: number, y: number, t: number): number {
  return (
    Math.PI       * Math.sin(x * S * 2.6 + y * S * 1.5 + t * 0.09)       +
    Math.PI * 0.5 * Math.cos(-x * S * 1.8 + y * S * 2.3 + t * 0.06 + 1.8) +
    Math.PI * 0.2 * Math.sin(x * S * 4.1 - y * S * 1.2 + t * 0.11 + 3.5)
  )
}

const LINE_STYLES: { rgb: [number,number,number]; alpha: number; width: number }[] = [
  { rgb: [37,  99,  235], alpha: 0.18, width: 0.8 },
  { rgb: [6,   182, 212], alpha: 0.15, width: 0.7 },
  { rgb: [99,  102, 241], alpha: 0.14, width: 0.7 },
]

function makeSeedPoints(w: number, h: number): { x: number; y: number; style: number }[] {
  let cols: number, rows: number
  if      (w < 480)  { cols = 5;  rows = 9  }
  else if (w < 768)  { cols = 7;  rows = 11 }
  else if (w < 1024) { cols = 9;  rows = 13 }
  else if (w < 1920) { cols = 11; rows = 15 }
  else if (w < 2560) { cols = 15; rows = 17 }
  else               { cols = 19; rows = 19 }

  const seeds = []
  const cw = w / cols
  const ch = h / rows
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      seeds.push({
        x:     (c + 0.5) * cw + (Math.random() - 0.5) * cw * 0.4,
        y:     (r + 0.5) * ch + (Math.random() - 0.5) * ch * 0.4,
        style: (c * 3 + r * 2) % LINE_STYLES.length,
      })
    }
  }
  return seeds
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

    let seeds = makeSeedPoints(w, h)

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width  = w
      canvas.height = h
      seeds = makeSeedPoints(w, h)
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
        grad.addColorStop(0.42, `rgba(${r_},${g_},${b_},${+(b.alpha * 0.4).toFixed(3)})`)
        grad.addColorStop(1,    `rgba(${r_},${g_},${b_},0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawStreamlines(time: number) {
      // Group seeds by style for fewer ctx state changes
      for (let si = 0; si < LINE_STYLES.length; si++) {
        const style = LINE_STYLES[si]
        const [r, g, b] = style.rgb
        ctx.strokeStyle = `rgba(${r},${g},${b},${style.alpha})`
        ctx.lineWidth   = style.width
        ctx.lineCap     = 'round'
        ctx.lineJoin    = 'round'

        ctx.beginPath()
        for (const seed of seeds) {
          if (seed.style !== si) continue
          let x = seed.x
          let y = seed.y
          ctx.moveTo(x, y)
          for (let step = 0; step < MAX_STEPS; step++) {
            const angle = fieldAngle(x, y, time)
            x += Math.cos(angle) * STEP
            y += Math.sin(angle) * STEP
            if (x < -20 || x > w + 20 || y < -20 || y > h + 20) break
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, w, h)
      drawBlobs(time)
      drawStreamlines(time)
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
