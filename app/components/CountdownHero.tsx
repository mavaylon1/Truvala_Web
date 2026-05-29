'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

const TARGET = new Date('2026-07-20T09:00:00')

function calcTimeLeft() {
  const diff = TARGET.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CountdownHero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeLeft(calcTimeLeft())
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { value: timeLeft.days,    label: 'Days'    },
    { value: timeLeft.hours,   label: 'Hours'   },
    { value: timeLeft.minutes, label: 'Min'     },
    { value: timeLeft.seconds, label: 'Sec'     },
  ]

  return (
    <section
      id="home"
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(80px, 12vw, 120px) clamp(16px, 5vw, 24px) clamp(40px, 6vw, 60px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 28, maxWidth: 720, width: '100%' }}
      >
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '7px 18px', borderRadius: 100,
          background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.2)',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%', background: '#2563eb',
            display: 'inline-block', animation: 'badge-pulse 2s ease-in-out infinite',
          }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#2563eb', letterSpacing: '0.08em' }}>
            FIRST LIVE DEMO — JULY 20, 2026
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(2.4rem, 7vw, 5rem)',
          fontWeight: 800,
          color: '#0a1628',
          lineHeight: 1.06,
          letterSpacing: '-0.025em',
        }}>
          Home buying,{' '}
          <span style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            reimagined.
          </span>
        </h1>

        <p style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: '#6b7280', lineHeight: 1.65, maxWidth: 500 }}>
          Truvala is building AI-powered real estate products that bring clarity, confidence, and trust to the homebuying experience. See it first.
        </p>

        {/* Countdown cards */}
        <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 16px)', flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>
          {units.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.07 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: 'clamp(16px, 3vw, 24px) clamp(18px, 3.5vw, 28px)',
                borderRadius: 18,
                background: 'rgba(255,255,255,0.9)',
                border: '1px solid rgba(37,99,235,0.1)',
                boxShadow: '0 4px 24px rgba(14,42,99,0.07)',
                minWidth: 'clamp(72px, 15vw, 88px)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span style={{
                fontSize: 'clamp(36px, 8vw, 52px)',
                fontWeight: 800,
                color: '#0a1628',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-0.02em',
              }}>
                {mounted ? String(value).padStart(2, '0') : '00'}
              </span>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#9ca3af',
                letterSpacing: '0.14em',
                marginTop: 8,
                textTransform: 'uppercase',
              }}>
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        <p style={{ fontSize: 13, color: '#9ca3af', letterSpacing: '0.06em', fontWeight: 500 }}>
          July 20, 2026 · Live Demo Event
        </p>
      </motion.div>
    </section>
  )
}
