'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface GlowWave {
  baseY:    number   // 0–1 vertical center
  amp:      number   // 0–1 oscillation amplitude
  freqFrac: number   // wave period as fraction of screen width
  speed:    number   // rad / s
  phase:    number
  glowR:    number   // radius of each gradient circle (px)
  alpha:    number   // peak opacity per gradient
  rgb:      [number, number, number]
}

// Each wave is rendered as overlapping soft radial gradients placed along
// a sine path — circles overlap enough to merge into a continuous glow band
const WAVES: GlowWave[] = [
  { baseY: 0.28, amp: 0.10, freqFrac: 0.48, speed: 0.14, phase: 0.0, glowR: 110, alpha: 0.055, rgb: [37,  99,  235] },
  { baseY: 0.50, amp: 0.12, freqFrac: 0.42, speed: 0.11, phase: 1.8, glowR: 130, alpha: 0.050, rgb: [6,   182, 212] },
  { baseY: 0.72, amp: 0.09, freqFrac: 0.52, speed: 0.13, phase: 3.4, glowR: 100, alpha: 0.048, rgb: [99,  102, 241] },
  { baseY: 0.38, amp: 0.08, freqFrac: 0.38, speed: 0.09, phase: 0.9, glowR: 120, alpha: 0.040, rgb: [34,  211, 238] },
]

const STEP = 28   // px between gradient circles — enough overlap to merge seamlessly

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

    function drawWave(wave: GlowWave, time: number) {
      const freq = (Math.PI * 2) / (w * wave.freqFrac)
      const [r, g, b] = wave.rgb

      for (let x = -wave.glowR; x <= w + wave.glowR; x += STEP) {
        const cy = (wave.baseY + wave.amp * Math.sin(x * freq + time * wave.speed + wave.phase)) * h

        const grad = ctx.createRadialGradient(x, cy, 0, x, cy, wave.glowR)
        grad.addColorStop(0,    `rgba(${r},${g},${b},${wave.alpha})`)
        grad.addColorStop(0.45, `rgba(${r},${g},${b},${(wave.alpha * 0.5).toFixed(3)})`)
        grad.addColorStop(1,    `rgba(${r},${g},${b},0)`)

        ctx.beginPath()
        ctx.arc(x, cy, wave.glowR, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, w, h)
      for (const wave of WAVES) {
        drawWave(wave, time)
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
