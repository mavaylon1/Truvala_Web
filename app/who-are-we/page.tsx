'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import SmoothScroller from '../components/SmoothScroller'

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

export default function WhoAreWe() {
  return (
    <SmoothScroller>
      <main style={{ paddingTop: 80, paddingBottom: 100 }}>

        {/* ── Hero ─────────────────────────────────────── */}
        <section style={{ padding: '40px 24px 72px', maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <motion.div {...fadeUp(0.15)}>
            <span style={{
              display: 'inline-block',
              padding: '5px 14px',
              borderRadius: 100,
              background: 'rgba(37,99,235,0.07)',
              border: '1px solid rgba(37,99,235,0.18)',
              fontSize: 12,
              fontWeight: 700,
              color: '#2563eb',
              letterSpacing: '0.09em',
              marginBottom: 24,
            }}>
              THE TEAM
            </span>
          </motion.div>

          <motion.h1 {...fadeUp(0.22)} style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            fontWeight: 800,
            color: '#0a1628',
            lineHeight: 1.1,
            letterSpacing: '-0.022em',
            marginBottom: 22,
          }}>
            Who are we
          </motion.h1>

          <motion.p {...fadeUp(0.3)} style={{ fontSize: 18, color: '#6b7280', lineHeight: 1.7 }}>
            Truvala was built by people who believe that buying a home should feel informed, not overwhelming.
            We combine deep technical expertise with a genuine belief in the relationship between agents and buyers.
          </motion.p>
        </section>

        {/* ── Team ─────────────────────────────────────── */}
        <section style={{ padding: '0 24px 80px', maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
            {team.map(({ name, title, photo, bio }, i) => (
              <motion.div
                key={name}
                {...fadeUp(0.12 + i * 0.1)}
                style={{
                  padding: '40px 36px',
                  borderRadius: 22,
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(37,99,235,0.09)',
                  boxShadow: '0 4px 32px rgba(14,42,99,0.07)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 20,
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
                      position: 'absolute',
                      inset: -3,
                      borderRadius: '50%',
                      border: '2px solid rgba(37,99,235,0.2)',
                      pointerEvents: 'none',
                    }} />
                  </div>
                ) : (
                  <div style={{
                    width: 140, height: 140, borderRadius: '50%',
                    background: 'linear-gradient(140deg, #dbeafe 0%, #bfdbfe 100%)',
                    border: '2px solid rgba(37,99,235,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}

                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0a1628', marginBottom: 4 }}>{name}</h2>
                  <span style={{
                    display: 'inline-block',
                    padding: '3px 12px',
                    borderRadius: 100,
                    background: 'rgba(37,99,235,0.07)',
                    border: '1px solid rgba(37,99,235,0.14)',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#2563eb',
                  }}>
                    {title}
                  </span>
                </div>

                <p style={{ fontSize: 15, color: '#4a5568', lineHeight: 1.75 }}>{bio}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Goals placeholder ────────────────────────── */}
        <section style={{ padding: '0 24px', maxWidth: 860, margin: '0 auto' }}>
          <motion.div {...fadeUp(0.1)} style={{
            padding: '52px 48px',
            borderRadius: 24,
            background: 'linear-gradient(135deg, rgba(37,99,235,0.05) 0%, rgba(6,182,212,0.05) 100%)',
            border: '1px solid rgba(37,99,235,0.11)',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#2563eb', letterSpacing: '0.09em', marginBottom: 16 }}>
              OUR GOALS FOR TRUVALA
            </p>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0a1628', marginBottom: 14, letterSpacing: '-0.015em' }}>
              More to come here
            </h3>
            <p style={{ fontSize: 16, color: '#9ca3af', lineHeight: 1.7 }}>
              Goals and mission details coming soon.
            </p>
          </motion.div>
        </section>

      </main>
    </SmoothScroller>
  )
}
