'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay },
})

const team = [
  {
    name: 'Matthew Avaylon',
    title: 'Founder & CEO',
    photo: '/ceo-matthew.png',
    bio: 'Matthew brings a background in AI, data systems, and scientific software from the U.S. Department of Energy national laboratories and the defense industry — environments where data quality, trust, and decision-making are paramount. He started Truvala to bring the same rigor to real estate: using AI to deliver data-backed transparency that helps buyers make confident decisions and enables agents to better understand each buyer and guide them toward the right home.',
  },
  {
    name: 'Caleb Manicke',
    title: 'CTO',
    photo: null,
    bio: 'Bio coming soon.',
  },
]

export default function WhoWeAreSection() {
  return (
    <section id="who-are-we" style={{
      paddingTop: 'clamp(60px, 10vw, 100px)',
      paddingBottom: 'clamp(60px, 10vw, 100px)',
      background: 'rgba(239,246,255,0.35)',
      borderTop: '1px solid rgba(37,99,235,0.07)',
    }}>

      {/* ── Hero ────────────────────────────────────── */}
      <div style={{ padding: '0 clamp(16px, 5vw, 24px) clamp(48px, 8vw, 72px)', maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <motion.div {...fadeUp(0.1)}>
          <span style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 100,
            background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.18)',
            fontSize: 12, fontWeight: 700, color: '#2563eb', letterSpacing: '0.09em', marginBottom: 24,
          }}>
            THE TEAM
          </span>
        </motion.div>

        <motion.h2 {...fadeUp(0.17)} style={{
          fontSize: 'clamp(2rem, 5vw, 3.6rem)', fontWeight: 800, color: '#0a1628',
          lineHeight: 1.1, letterSpacing: '-0.022em', marginBottom: 20,
        }}>
          Who are we
        </motion.h2>

        <motion.p {...fadeUp(0.24)} style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: '#6b7280', lineHeight: 1.7 }}>
          Truvala was built by people who believe that buying a home should feel informed, not overwhelming —
          and that the relationship between agents and buyers is worth strengthening, not replacing.
        </motion.p>
      </div>

      {/* ── Team cards ──────────────────────────────── */}
      <div style={{ padding: '0 clamp(16px, 5vw, 24px)', maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: 24 }}>
          {team.map(({ name, title, photo, bio }, i) => (
            <motion.div
              key={name}
              {...fadeUp(0.12 + i * 0.1)}
              style={{
                padding: 'clamp(28px, 5vw, 40px) clamp(24px, 4vw, 36px)',
                borderRadius: 22,
                background: 'rgba(255,255,255,0.95)',
                border: '1px solid rgba(37,99,235,0.09)',
                boxShadow: '0 4px 32px rgba(14,42,99,0.07)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: 18,
              }}
            >
              {/* Circular photo */}
              {photo ? (
                <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
                  <Image
                    src={photo}
                    alt={name}
                    fill
                    style={{ objectFit: 'cover', borderRadius: '50%' }}
                    sizes="140px"
                  />
                  <div style={{
                    position: 'absolute', inset: -3, borderRadius: '50%',
                    border: '2px solid rgba(37,99,235,0.2)', pointerEvents: 'none',
                  }} />
                </div>
              ) : (
                <div style={{
                  width: 140, height: 140, borderRadius: '50%',
                  background: 'linear-gradient(140deg, #dbeafe 0%, #bfdbfe 100%)',
                  border: '2px solid rgba(37,99,235,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}

              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0a1628', marginBottom: 6 }}>{name}</h3>
                <span style={{
                  display: 'inline-block', padding: '3px 12px', borderRadius: 100,
                  background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.14)',
                  fontSize: 13, fontWeight: 600, color: '#2563eb',
                }}>
                  {title}
                </span>
              </div>

              <p style={{ fontSize: 15, color: '#4a5568', lineHeight: 1.75 }}>{bio}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
