'use client'

import { motion } from 'motion/react'
import SmoothScroller from '../components/SmoothScroller'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number], delay },
})

export default function UpcomingProducts() {
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
              DEMO · JULY 20, 2026
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
            Upcoming Products
          </motion.h1>

          <motion.p {...fadeUp(0.3)} style={{ fontSize: 18, color: '#6b7280', lineHeight: 1.7 }}>
            Two products built around one belief: home buying should be informed, transparent, and trustworthy — for buyers and agents alike.
          </motion.p>
        </section>

        {/* ── Demo event banner ───────────────────────── */}
        <motion.div {...fadeUp(0.18)} style={{ padding: '0 24px', maxWidth: 960, margin: '0 auto 40px' }}>
          <div style={{
            padding: '20px 28px',
            borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(6,182,212,0.06) 100%)',
            border: '1px solid rgba(37,99,235,0.16)',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            flexWrap: 'wrap',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#2563eb',
              flexShrink: 0,
              animation: 'badge-pulse 2s ease-in-out infinite',
              display: 'inline-block',
            }} />
            <p style={{ fontSize: 15, fontWeight: 600, color: '#1e3a8a', margin: 0 }}>
              Both products will be shown at the Truvala live demo on{' '}
              <span style={{ color: '#2563eb' }}>July 20, 2026.</span>
              {' '}One launches that day. One is an early preview of what's coming next.
            </p>
          </div>
        </motion.div>

        {/* ── Product cards ────────────────────────────── */}
        <section style={{ padding: '0 24px 80px', maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>

            {/* Truvala Concierge */}
            <motion.div {...fadeUp(0.15)} style={{
              padding: '40px 36px',
              borderRadius: 22,
              background: 'rgba(255,255,255,0.97)',
              border: '1px solid rgba(5,150,105,0.12)',
              boxShadow: '0 6px 36px rgba(5,150,105,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Launch badge */}
              <div style={{
                position: 'absolute',
                top: 24,
                right: 24,
                padding: '4px 12px',
                borderRadius: 100,
                background: 'linear-gradient(135deg, #059669, #047857)',
                fontSize: 11,
                fontWeight: 700,
                color: 'white',
                letterSpacing: '0.07em',
              }}>
                LAUNCHING JULY 20
              </div>

              {/* Icon */}
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: 'linear-gradient(140deg, #d1fae5 0%, #a7f3d0 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#059669', letterSpacing: '0.08em', marginBottom: 6 }}>
                  FOR AGENTS, BROKERAGES &amp; REALTOR WEBSITES
                </p>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0a1628', letterSpacing: '-0.015em', marginBottom: 4 }}>
                  Truvala Concierge
                </h2>
                <p style={{ fontSize: 14, color: '#6b7280', fontWeight: 500 }}>Embedded widget for listing pages</p>
              </div>

              <p style={{ fontSize: 15, color: '#4a5568', lineHeight: 1.78 }}>
                Truvala Concierge is a user-facing AI guide for listing pages, backed by embedded widgets
                that provide clear, interactive information to buyers. Designed to fit seamlessly into
                realtor websites regardless of layout or design.
              </p>

              <p style={{ fontSize: 15, color: '#4a5568', lineHeight: 1.78 }}>
                Concierge brings key listing information together — neighborhood context, schools, ownership
                cost, insurance factors, mortgage readiness, solar potential, and questions to ask before
                touring — giving buyers a full-service listing experience on the agent's own website.
              </p>

              <div style={{
                padding: '16px 20px',
                borderRadius: 12,
                background: 'rgba(5,150,105,0.04)',
                border: '1px solid rgba(5,150,105,0.1)',
              }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 10 }}>What Concierge delivers</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {['Neighborhood & school context', 'Mortgage & insurance insight', 'AI question-and-answer', 'Buyer intent data for agents'].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#059669', flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: '#6b7280' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Truvala Scout */}
            <motion.div {...fadeUp(0.22)} style={{
              padding: '40px 36px',
              borderRadius: 22,
              background: 'rgba(255,255,255,0.97)',
              border: '1px solid rgba(37,99,235,0.12)',
              boxShadow: '0 6px 36px rgba(14,42,99,0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Preview badge */}
              <div style={{
                position: 'absolute',
                top: 24,
                right: 24,
                padding: '4px 12px',
                borderRadius: 100,
                background: 'rgba(37,99,235,0.1)',
                border: '1px solid rgba(37,99,235,0.25)',
                fontSize: 11,
                fontWeight: 700,
                color: '#2563eb',
                letterSpacing: '0.07em',
              }}>
                PREVIEW AT DEMO
              </div>

              {/* Icon */}
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: 'linear-gradient(140deg, #dbeafe 0%, #bfdbfe 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#2563eb" strokeWidth="2"/>
                  <path d="m21 21-4.35-4.35" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#2563eb', letterSpacing: '0.08em', marginBottom: 6 }}>
                  FOR BUYERS BROWSING ONLINE
                </p>
                <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0a1628', letterSpacing: '-0.015em', marginBottom: 4 }}>
                  Truvala Scout
                </h2>
                <p style={{ fontSize: 14, color: '#6b7280', fontWeight: 500 }}>Browser extension</p>
              </div>

              <p style={{ fontSize: 15, color: '#4a5568', lineHeight: 1.78 }}>
                Truvala Scout is a buyer-side browser extension that helps home shoppers evaluate listings
                across real estate websites. It looks at a home through the buyer's priorities and surfaces
                fit, risk, cost, and key questions they may not have considered.
              </p>

              <p style={{ fontSize: 15, color: '#4a5568', lineHeight: 1.78 }}>
                Built for buyers who want more than listing photos and basic facts, Scout helps them
                understand whether a home is worth pursuing before they tour, make an offer, or get
                emotionally attached.
              </p>

              <div style={{
                padding: '16px 20px',
                borderRadius: 12,
                background: 'rgba(37,99,235,0.04)',
                border: '1px solid rgba(37,99,235,0.1)',
              }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 10 }}>What Scout surfaces</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {['Buyer fit score', 'Hidden risk flags', 'True ownership costs', 'Key questions to ask'].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#2563eb', flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: '#6b7280' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </section>

      </main>
    </SmoothScroller>
  )
}
