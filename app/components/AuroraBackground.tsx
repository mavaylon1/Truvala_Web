'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Wave {
  freq:   number  // spatial cycles across screen
  amp:    number  // fraction of screen height
  phase:  number  // spatial phase offset
  tfreq:  number  // temporal speed (rad / s)
}

interface Band {
  baseY:     number   // 0–1 fraction of screen height
  thickness: number   // 0–1 fraction of screen height
  alpha:     number   // peak opacity
  rgb:       [number, number, number]
  waves:     Wave[]
}

const BANDS: Band[] = [
  {
    baseY: 0.08, thickness: 0.08, alpha: 0.34,
    rgb: [37, 99, 235],
    waves: [
      { freq: 1.1, amp: 0.050, phase: 0.0, tfreq: 0.38 },
      { freq: 2.4, amp: 0.022, phase: 1.8, tfreq: 0.66 },
      { freq: 0.6, amp: 0.032, phase: 3.2, tfreq: 0.22 },
    ],
  },
  {
    baseY: 0.24, thickness: 0.12, alpha: 0.29,
    rgb: [6, 182, 212],
    waves: [
      { freq: 0.8, amp: 0.062, phase: 1.4, tfreq: 0.30 },
      { freq: 1.9, amp: 0.028, phase: 0.7, tfreq: 0.56 },
      { freq: 2.8, amp: 0.016, phase: 2.5, tfreq: 0.82 },
    ],
  },
  {
    baseY: 0.41, thickness: 0.15, alpha: 0.24,
    rgb: [99, 102, 241],
    waves: [
      { freq: 1.3, amp: 0.068, phase: 2.6, tfreq: 0.42 },
      { freq: 0.5, amp: 0.040, phase: 0.2, tfreq: 0.18 },
      { freq: 2.2, amp: 0.024, phase: 3.8, tfreq: 0.72 },
    ],
  },
  {
    baseY: 0.57, thickness: 0.10, alpha: 0.31,
    rgb: [34, 211, 238],
    waves: [
      { freq: 1.6, amp: 0.052, phase: 1.0, tfreq: 0.48 },
      { freq: 2.7, amp: 0.020, phase: 4.2, tfreq: 0.74 },
      { freq: 0.9, amp: 0.036, phase: 2.1, tfreq: 0.28 },
    ],
  },
  {
    baseY: 0.72, thickness: 0.13, alpha: 0.26,
    rgb: [124, 58, 237],
    waves: [
      { freq: 0.7, amp: 0.060, phase: 3.5, tfreq: 0.34 },
      { freq: 2.1, amp: 0.030, phase: 1.6, tfreq: 0.62 },
      { freq: 1.4, amp: 0.040, phase: 0.4, tfreq: 0.44 },
    ],
  },
  {
    baseY: 0.88, thickness: 0.10, alpha: 0.31,
    rgb: [37, 99, 235],
    waves: [
      { freq: 1.0, amp: 0.050, phase: 0.9, tfreq: 0.40 },
      { freq: 2.5, amp: 0.025, phase: 2.8, tfreq: 0.68 },
      { freq: 0.4, amp: 0.038, phase: 4.6, tfreq: 0.20 },
    ],
  },
]

const STEPS = 80  // horizontal sample points per band

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

    function drawBand(band: Band, time: number) {
      const topYs: number[] = []
      const botYs: number[] = []
      const half = band.thickness / 2

      for (let i = 0; i <= STEPS; i++) {
        const xf = i / STEPS
        let cy = band.baseY
        for (const wave of band.waves) {
          cy += Math.sin(xf * wave.freq * Math.PI * 2 + time * wave.tfreq + wave.phase) * wave.amp
        }
        topYs.push((cy - half) * h)
        botYs.push((cy + half) * h)
      }

      // path: top edge L→R, bottom edge R→L
      ctx.beginPath()
      ctx.moveTo(0, topYs[0])
      for (let i = 1; i <= STEPS; i++) {
        ctx.lineTo((i / STEPS) * w, topYs[i])
      }
      for (let i = STEPS; i >= 0; i--) {
        ctx.lineTo((i / STEPS) * w, botYs[i])
      }
      ctx.closePath()

      // vertical gradient — transparent → color → transparent
      const minY = Math.min(...topYs)
      const maxY = Math.max(...botYs)
      const grad = ctx.createLinearGradient(0, minY, 0, maxY)
      const [r, g, b] = band.rgb
      grad.addColorStop(0,    `rgba(${r},${g},${b},0)`)
      grad.addColorStop(0.28, `rgba(${r},${g},${b},${band.alpha})`)
      grad.addColorStop(0.72, `rgba(${r},${g},${b},${band.alpha})`)
      grad.addColorStop(1,    `rgba(${r},${g},${b},0)`)

      ctx.fillStyle = grad
      ctx.fill()
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, w, h)
      for (const band of BANDS) {
        drawBand(band, time)
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
