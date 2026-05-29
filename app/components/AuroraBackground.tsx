'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Grid cell size — smaller = smoother lines, more CPU
const GRID = 12

const LEVELS = [
  { v: -0.62, rgb: [6,   182, 212] as [number,number,number], alpha: 0.11, width: 0.6 },
  { v: -0.38, rgb: [37,  99,  235] as [number,number,number], alpha: 0.14, width: 0.8 },
  { v: -0.14, rgb: [59,  130, 246] as [number,number,number], alpha: 0.12, width: 0.6 },
  { v:  0.10, rgb: [99,  102, 241] as [number,number,number], alpha: 0.15, width: 0.9 },
  { v:  0.34, rgb: [37,  99,  235] as [number,number,number], alpha: 0.12, width: 0.7 },
  { v:  0.58, rgb: [6,   182, 212] as [number,number,number], alpha: 0.10, width: 0.6 },
]

// Layered sine waves in different directions — produces closed contour loops
function heightAt(nx: number, ny: number, t: number): number {
  return (
    0.50 * Math.sin(nx * 5.2 + ny * 3.1 + t * 0.08) +
    0.32 * Math.sin(-nx * 3.8 + ny * 4.6 + t * 0.06 + 2.1) +
    0.18 * Math.sin(nx * 7.4 - ny * 2.4 + t * 0.10 + 4.3)
  )
}

// Marching squares — draw one contour level into the current path
function traceContour(
  ctx: CanvasRenderingContext2D,
  field: Float32Array,
  cols: number,
  rows: number,
  level: number,
  g: number,
) {
  ctx.beginPath()

  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols - 1; c++) {
      const tl = field[r * cols + c]
      const tr = field[r * cols + c + 1]
      const br = field[(r + 1) * cols + c + 1]
      const bl = field[(r + 1) * cols + c]

      const code = (tl > level ? 8 : 0)
                 | (tr > level ? 4 : 0)
                 | (br > level ? 2 : 0)
                 | (bl > level ? 1 : 0)

      if (code === 0 || code === 15) continue

      const x = c * g
      const y = r * g
      const li = (a: number, b: number) => g * (level - a) / (b - a)

      const T = [x + li(tl, tr), y      ]
      const R = [x + g,          y + li(tr, br)]
      const B = [x + li(bl, br), y + g  ]
      const L = [x,              y + li(tl, bl)]

      const seg = (a: number[], b: number[]) => {
        ctx.moveTo(a[0], a[1])
        ctx.lineTo(b[0], b[1])
      }

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

    // Pre-allocate field array — reuse every frame to avoid GC pressure
    let cols  = Math.ceil(w / GRID) + 2
    let rows  = Math.ceil(h / GRID) + 2
    let field = new Float32Array(cols * rows)

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width  = w
      canvas.height = h
      cols  = Math.ceil(w / GRID) + 2
      rows  = Math.ceil(h / GRID) + 2
      field = new Float32Array(cols * rows)
      if (prefersReduced) draw(0)
    }
    window.addEventListener('resize', resize)

    function draw(time: number) {
      ctx.clearRect(0, 0, w, h)

      // Fill height field
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          field[r * cols + c] = heightAt(c * GRID / w, r * GRID / h, time)
        }
      }

      // Draw each contour level
      for (const lv of LEVELS) {
        const [r, g, b] = lv.rgb
        ctx.strokeStyle = `rgba(${r},${g},${b},${lv.alpha})`
        ctx.lineWidth   = lv.width
        traceContour(ctx, field, cols, rows, lv.v, GRID)
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
