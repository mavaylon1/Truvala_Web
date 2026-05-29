'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Blob {
  cx: number; cy: number; r: number
  rgb: [number, number, number]; alpha: number
  phase: number; sx: number; sy: number; ax: number; ay: number
}

interface Stream {
  y: number       // base y (0-1)
  cp1x: number    // control point 1 x (0-1)
  cp1dy: number   // cp1 y offset from base y
  cp2x: number    // control point 2 x (0-1)
  cp2dy: number   // cp2 y offset from base y
  phase: number
  speed: number
  amp: number     // drift amplitude (fraction of h)
  rgb: [number, number, number]
  alpha: number
  width: number
}

const BLOBS: Blob[] = [
  { cx: 0.10, cy: 0.18, r: 0.60, rgb: [37,  99,  235], alpha: 0.13, phase: 0.0, sx: 0.23, sy: 0.18, ax: 0.10, ay: 0.09 },
  { cx: 0.82, cy: 0.10, r: 0.52, rgb: [6,   182, 212], alpha: 0.12, phase: 1.9, sx: 0.18, sy: 0.27, ax: 0.09, ay: 0.12 },
  { cx: 0.45, cy: 0.82, r: 0.48, rgb: [124, 58,  237], alpha: 0.09, phase: 3.6, sx: 0.15, sy: 0.20, ax: 0.13, ay: 0.09 },
  { cx: 0.92, cy: 0.62, r: 0.42, rgb: [34,  211, 238], alpha: 0.09, phase: 0.8, sx: 0.30, sy: 0.16, ax: 0.07, ay: 0.11 },
  { cx: 0.18, cy: 0.75, r: 0.50, rgb: [59,  130, 246], alpha: 0.10, phase: 2.4, sx: 0.21, sy: 0.26, ax: 0.11, ay: 0.08 },
  { cx: 0.60, cy: 0.38, r: 0.40, rgb: [99,  102, 241], alpha: 0.08, phase: 4.2, sx: 0.26, sy: 0.19, ax: 0.08, ay: 0.12 },
]

const STREAMS: Stream[] = [
  { y: 0.07, cp1x: 0.28, cp1dy: -0.06, cp2x: 0.68, cp2dy:  0.08, phase: 0.0, speed: 0.07, amp: 0.04, rgb: [37, 99, 235],   alpha: 0.22, width: 1.2 },
  { y: 0.15, cp1x: 0.35, cp1dy:  0.09, cp2x: 0.62, cp2dy: -0.07, phase: 1.3, speed: 0.10, amp: 0.05, rgb: [6, 182, 212],   alpha: 0.18, width: 0.9 },
  { y: 0.24, cp1x: 0.22, cp1dy: -0.08, cp2x: 0.75, cp2dy:  0.06, phase: 2.6, speed: 0.08, amp: 0.06, rgb: [37, 99, 235],   alpha: 0.14, width: 1.5 },
  { y: 0.33, cp1x: 0.40, cp1dy:  0.07, cp2x: 0.58, cp2dy: -0.09, phase: 0.8, speed: 0.12, amp: 0.04, rgb: [99, 102, 241],  alpha: 0.16, width: 1.0 },
  { y: 0.42, cp1x: 0.25, cp1dy: -0.10, cp2x: 0.72, cp2dy:  0.07, phase: 3.4, speed: 0.09, amp: 0.07, rgb: [6, 182, 212],   alpha: 0.20, width: 1.4 },
  { y: 0.50, cp1x: 0.33, cp1dy:  0.08, cp2x: 0.65, cp2dy: -0.06, phase: 1.9, speed: 0.07, amp: 0.05, rgb: [34, 211, 238],  alpha: 0.15, width: 0.8 },
  { y: 0.58, cp1x: 0.42, cp1dy: -0.07, cp2x: 0.60, cp2dy:  0.10, phase: 4.1, speed: 0.11, amp: 0.06, rgb: [37, 99, 235],   alpha: 0.17, width: 1.1 },
  { y: 0.67, cp1x: 0.28, cp1dy:  0.09, cp2x: 0.70, cp2dy: -0.08, phase: 2.3, speed: 0.08, amp: 0.04, rgb: [124, 58, 237],  alpha: 0.13, width: 1.3 },
  { y: 0.76, cp1x: 0.38, cp1dy: -0.06, cp2x: 0.55, cp2dy:  0.09, phase: 0.5, speed: 0.10, amp: 0.05, rgb: [6, 182, 212],   alpha: 0.19, width: 0.9 },
  { y: 0.85, cp1x: 0.30, cp1dy:  0.07, cp2x: 0.68, cp2dy: -0.10, phase: 3.7, speed: 0.09, amp: 0.06, rgb: [37, 99, 235],   alpha: 0.16, width: 1.2 },
  { y: 0.93, cp1x: 0.45, cp1dy: -0.08, cp2x: 0.78, cp2dy:  0.06, phase: 1.6, speed: 0.11, amp: 0.04, rgb: [34, 211, 238],  alpha: 0.14, width: 0.8 },
  { y: 0.11, cp1x: 0.50, cp1dy:  0.06, cp2x: 0.80, cp2dy: -0.05, phase: 4.5, speed: 0.08, amp: 0.03, rgb: [6, 182, 212],   alpha: 0.11, width: 0.7 },
  { y: 0.29, cp1x: 0.20, cp1dy: -0.09, cp2x: 0.52, cp2dy:  0.07, phase: 0.3, speed: 0.13, amp: 0.05, rgb: [37, 99, 235],   alpha: 0.10, width: 0.8 },
  { y: 0.46, cp1x: 0.44, cp1dy:  0.08, cp2x: 0.66, cp2dy: -0.07, phase: 2.0, speed: 0.09, amp: 0.06, rgb: [99, 102, 241],  alpha: 0.12, width: 1.0 },
  { y: 0.62, cp1x: 0.26, cp1dy: -0.07, cp2x: 0.74, cp2dy:  0.09, phase: 4.8, speed: 0.08, amp: 0.04, rgb: [6, 182, 212],   alpha: 0.13, width: 1.1 },
  { y: 0.80, cp1x: 0.36, cp1dy:  0.10, cp2x: 0.62, cp2dy: -0.08, phase: 1.1, speed: 0.11, amp: 0.06, rgb: [37, 99, 235],   alpha: 0.15, width: 0.8 },
  { y: 0.20, cp1x: 0.48, cp1dy: -0.05, cp2x: 0.82, cp2dy:  0.07, phase: 3.2, speed: 0.07, amp: 0.04, rgb: [34, 211, 238],  alpha: 0.10, width: 0.6 },
  { y: 0.54, cp1x: 0.24, cp1dy:  0.09, cp2x: 0.58, cp2dy: -0.06, phase: 2.7, speed: 0.12, amp: 0.05, rgb: [124, 58, 237],  alpha: 0.09, width: 0.7 },
]

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

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
        grad.addColorStop(0.42, `rgba(${r_},${g_},${b_},${+(b.alpha * 0.4).toFixed(3)})`)
        grad.addColorStop(1,    `rgba(${r_},${g_},${b_},0)`)
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawStreams(time: number) {
      ctx.save()
      ctx.globalCompositeOperation = 'screen'

      for (const s of STREAMS) {
        const t     = time * s.speed
        const startX = -w * 0.05
        const endX   =  w * 1.05

        const startY = (s.y + Math.sin(t * 0.6 + s.phase + 0.8) * s.amp * 0.5) * h
        const endY   = (s.y + Math.cos(t * 0.5 + s.phase + 1.4) * s.amp * 0.5) * h
        const cp1y   = (s.y + s.cp1dy + Math.sin(t + s.phase) * s.amp) * h
        const cp2y   = (s.y + s.cp2dy + Math.cos(t + s.phase + 1.6) * s.amp) * h
        const cp1x   = s.cp1x * w
        const cp2x   = s.cp2x * w

        const [r, g, b] = s.rgb
        const grad = ctx.createLinearGradient(startX, 0, endX, 0)
        grad.addColorStop(0,    `rgba(${r},${g},${b},0)`)
        grad.addColorStop(0.12, `rgba(${r},${g},${b},${s.alpha})`)
        grad.addColorStop(0.88, `rgba(${r},${g},${b},${s.alpha})`)
        grad.addColorStop(1,    `rgba(${r},${g},${b},0)`)

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY)
        ctx.strokeStyle = grad
        ctx.lineWidth   = s.width
        ctx.stroke()
      }

      ctx.restore()
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, w, h)
      drawBlobs(time)
      drawStreams(time)
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
