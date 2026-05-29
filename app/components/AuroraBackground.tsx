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

// Each track is a slowly drifting iso-level through the height field.
// Because the field has a linear base in y, lines at different levels
// are mathematically guaranteed never to cross — they can only get close.
const TRACKS = [
  { baseV: -0.62, driftSpeed:  0.009, rgb: [37,  99,  235] as [number,number,number], alpha: 0.26, width: 1.2 },
  { baseV: -0.21, driftSpeed: -0.007, rgb: [6,   182, 212] as [number,number,number], alpha: 0.22, width: 1.0 },
  { baseV:  0.20, driftSpeed:  0.011, rgb: [99,  102, 241] as [number,number,number], alpha: 0.20, width: 0.9 },
  { baseV:  0.61, driftSpeed: -0.008, rgb: [37,  99,  235] as [number,number,number], alpha: 0.20, width: 0.9 },
]

const FADE_V  = 0.28   // fade over this much of the [-1,1] field range at each edge
const S       = 0.0022 // spatial scale (px⁻¹) — consistent across all screen sizes
const H_DRIFT = 30     // horizontal drift speed px/s — shapes slowly translate

function gridSize(): number {
  if (typeof window === 'undefined') return 12
  const w = window.innerWidth
  if (w < 768)  return 20
  if (w < 1024) return 16
  return 12
}

// Height field: linear base (y) + small perturbation (x,y).
// The linear base makes every iso-contour a non-intersecting horizontal curve.
// The perturbation adds organic curvature; kept small enough that levels never swap.
function fieldAt(px: number, py: number, t: number, h: number): number {
  const base     = (py / h) * 2 - 1                // −1 at top → +1 at bottom
  const driftedX = px + t * H_DRIFT
  const perturb  = (
    0.16 * Math.sin(driftedX * S * 2.6 + py * S * 0.7 + t * 0.035)        +
    0.09 * Math.sin(-driftedX * S * 1.8 + py * S * 0.5 + t * 0.025 + 1.8) +
    0.04 * Math.sin(driftedX * S * 4.1 - py * S * 0.3 + t * 0.040 + 3.5)
  )
  return base + perturb
}

// Marching squares — one contour level into the current open path
function traceLevel(
  ctx: CanvasRenderingContext2D,
  field: Float32Array,
  cols: number, rows: number,
  level: number, g: number,
) {
  ctx.beginPath()
  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      const tl = field[r * cols + c]
      const tr = field[r * cols + c + 1]
      const br = field[(r + 1) * cols + c + 1]
      const bl = field[(r + 1) * cols + c]
      const code = (tl > level ? 8 : 0) | (tr > level ? 4 : 0)
                 | (br > level ? 2 : 0) | (bl > level ? 1 : 0)
      if (code === 0 || code === 15) continue

      const x = c * g, y = r * g
      const li = (a: number, b: number) => g * (level - a) / (b - a)
      const T = [x + li(tl, tr), y    ]
      const R = [x + g,          y + li(tr, br)]
      const B = [x + li(bl, br), y + g]
      const L = [x,              y + li(tl, bl)]
      const seg = (a: number[], b: number[]) => { ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]) }

      switch (code) {
        case  1: case 14: seg(L, B); break
        case  2: case 13: seg(B, R); break
        case  3: case 12: seg(L, R); break
        case  4: case 11: seg(T, R); break
        case  5:          seg(T, L); seg(R, B); break
        case  6: case  9: seg(T, B); break
        case  7: case  8: seg(T, L); break
        case 10:          seg(T, R); seg(L, B); break
      }
    }
  }
  ctx.stroke()
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

    let g    = gridSize()
    let cols = Math.ceil(w / g) + 2
    let rows = Math.ceil(h / g) + 2
    let field = new Float32Array(cols * rows)

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w; canvas.height = h
      g = gridSize()
      cols = Math.ceil(w / g) + 2
      rows = Math.ceil(h / g) + 2
      field = new Float32Array(cols * rows)
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

    function draw(time: number) {
      ctx.clearRect(0, 0, w, h)
      drawBlobs(time)

      // Fill height field once — shared by all levels
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          field[r * cols + c] = fieldAt(c * g, r * g, time, h)
        }
      }

      // Draw each track — iso-level drifts slowly through the field
      for (const track of TRACKS) {
        // Effective level after drift — wraps in [-1, 1]
        const raw = track.baseV + time * track.driftSpeed
        // Draw at three wrapped positions so re-entry is seamless
        for (const offset of [0, -2, 2]) {
          const v = raw + offset
          if (v < -1 - FADE_V || v > 1 + FADE_V) continue

          // Fade at field edges (when line is near top/bottom of screen)
          const fade = Math.max(0, Math.min(1,
            (v + 1) / FADE_V,
            (1 - v) / FADE_V,
          ))
          if (fade < 0.01) continue

          const [r, gr, b] = track.rgb
          ctx.strokeStyle = `rgba(${r},${gr},${b},${(track.alpha * fade).toFixed(3)})`
          ctx.lineWidth   = track.width
          ctx.lineCap     = 'round'
          ctx.lineJoin    = 'round'
          traceLevel(ctx, field, cols, rows, v, g)
        }
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
