'use client'

import { motion } from 'motion/react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay },
})

export default function WhatIsSection() {
  return (
    <section id="what-is-truvala" style={{ paddingTop: 'clamp(60px, 10vw, 100px)', paddingBottom: 'clamp(60px, 10vw, 100px)' }}>

      {/* ── Hero ────────────────────────────────────── */}
      <div style={{ padding: '0 clamp(16px, 5vw, 24px) clamp(48px, 8vw, 80px)', maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
        <motion.div {...fadeUp(0.1)}>
          <span style={{
            display: 'inline-block', padding: '5px 14px', borderRadius: 100,
            background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.18)',
            fontSize: 12, fontWeight: 700, color: '#2563eb', letterSpacing: '0.09em', marginBottom: 24,
          }}>
            AI REAL ESTATE
          </span>
        </motion.div>

        <motion.h2 {...fadeUp(0.17)} style={{
          fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 800, color: '#0a1628',
          lineHeight: 1.09, letterSpacing: '-0.022em', marginBottom: 24,
        }}>
          Making home buying{' '}
          <span style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            clearer, smarter,
          </span>{' '}
          more transparent.
        </motion.h2>

      </div>

      {/* ── What we're building ─────────────────────── */}
      <div style={{
        background: 'rgba(239,246,255,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(37,99,235,0.07)', borderBottom: '1px solid rgba(37,99,235,0.07)',
        padding: 'clamp(48px, 8vw, 72px) clamp(16px, 5vw, 24px)',
      }}>
        <div style={{
          maxWidth: 1080, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(32px, 5vw, 56px)', alignItems: 'start',
        }}>
          <motion.div {...fadeUp(0.1)}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#2563eb', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>
              What We're Building
            </p>
            <p style={{ fontSize: 'clamp(17px, 2.5vw, 21px)', fontWeight: 600, color: '#0a1628', lineHeight: 1.55, marginBottom: 16 }}>
              AI-powered products that{' '}
              <span style={{ color: '#2563eb' }}>strengthen the relationship</span>{' '}
              between agents and future homeowners.
            </p>
            <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', color: '#6b7280', lineHeight: 1.75 }}>
              Our products emphasize transparency through data and confidence through AI, helping buyers better
              understand homes while helping agents create more informed, meaningful conversations.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.18)} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Transparency through data',     color: '#2563eb' },
              { label: 'Confidence through AI',         color: '#06b6d4' },
              { label: 'Stronger agent relationships',  color: '#7c3aed' },
              { label: 'More meaningful conversations', color: '#059669' },
            ].map(({ label, color }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '15px 20px',
                background: 'rgba(255,255,255,0.9)',
                border: `1px solid ${color}22`,
                borderLeft: `3px solid ${color}`,
                borderRadius: 12,
                boxShadow: '0 1px 8px rgba(14,42,99,0.04)',
              }}>
                <span style={{ fontWeight: 600, color: '#0a1628', fontSize: 15 }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Both sides ──────────────────────────────── */}
      <div style={{ padding: 'clamp(48px, 8vw, 80px) clamp(16px, 5vw, 24px)', maxWidth: 1080, margin: '0 auto' }}>
        <motion.div {...fadeUp(0.1)} style={{ textAlign: 'center', marginBottom: 48 }}>
          <h3 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 800, color: '#0a1628', letterSpacing: '-0.018em', marginBottom: 12 }}>
            Tackling home buying from both sides
          </h3>
          <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: '#6b7280', maxWidth: 460, margin: '0 auto', lineHeight: 1.65 }}>
            Whether you're searching for a home or helping clients find one, Truvala works for you.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 24 }}>
          {/* For Buyers */}
          <motion.div {...fadeUp(0.15)} style={{
            padding: 'clamp(24px, 4vw, 36px)',
            borderRadius: 20, background: 'rgba(255,255,255,0.95)',
            border: '1px solid rgba(37,99,235,0.1)', boxShadow: '0 4px 28px rgba(14,42,99,0.06)',
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: 'linear-gradient(140deg, #dbeafe 0%, #bfdbfe 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="9 22 9 12 15 12 15 22" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4 style={{ fontSize: 22, fontWeight: 700, color: '#0a1628', marginBottom: 10 }}>For Buyers</h4>
            <p style={{ fontSize: 15, color: '#4a5568', lineHeight: 1.75, marginBottom: 20 }}>
              Truvala helps evaluate fit, risk, cost, and key questions before taking the next step —
              so you never make a major financial decision without the full picture.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {['Evaluate buyer fit', 'Surface hidden risks', 'Understand true ownership costs', 'Know the right questions to ask'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563eb', flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* For Agents */}
          <motion.div {...fadeUp(0.22)} style={{
            padding: 'clamp(24px, 4vw, 36px)',
            borderRadius: 20, background: 'rgba(255,255,255,0.95)',
            border: '1px solid rgba(5,150,105,0.12)', boxShadow: '0 4px 28px rgba(5,150,105,0.05)',
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: 'linear-gradient(140deg, #d1fae5 0%, #a7f3d0 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4 style={{ fontSize: 22, fontWeight: 700, color: '#0a1628', marginBottom: 10 }}>For Agents</h4>
            <p style={{ fontSize: 15, color: '#4a5568', lineHeight: 1.75, marginBottom: 20 }}>
              Our tools increase listing engagement by turning each listing page into a full-service buyer
              experience through the Truvala AI Concierge — so follow-up becomes personal and actionable.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {['Increase listing engagement', 'Capture buyer priorities', 'AI Concierge on your listings', 'More personal, relevant follow-up'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669', flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Mission ─────────────────────────────────── */}
      <div style={{ padding: '0 clamp(16px, 5vw, 24px) clamp(48px, 8vw, 80px)', maxWidth: 800, margin: '0 auto' }}>
        <motion.div {...fadeUp(0.1)} style={{
          padding: 'clamp(32px, 5vw, 52px) clamp(24px, 5vw, 48px)',
          borderRadius: 24,
          background: 'linear-gradient(135deg, rgba(37,99,235,0.05) 0%, rgba(6,182,212,0.05) 100%)',
          border: '1px solid rgba(37,99,235,0.12)',
          textAlign: 'center',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'linear-gradient(140deg, #2563eb 0%, #1e3a8a 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p style={{ fontSize: 'clamp(16px, 2.5vw, 19px)', color: '#1e3a8a', lineHeight: 1.75, fontWeight: 500 }}>
            Our goal is not to replace agents or become another search site. Truvala exists to make the
            homebuying decision{' '}
            <strong style={{ color: '#2563eb' }}>more informed, more actionable, and more trustworthy</strong>
            {' '}for everyone involved.
          </p>
        </motion.div>
      </div>

    </section>
  )
}
