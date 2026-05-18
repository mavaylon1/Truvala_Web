'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function SectionLabel({ color, text }: { color: string; text: string }) {
  return (
    <span
      className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-5"
      style={{ background: `${color}18`, border: `1px solid ${color}32`, color }}
    >
      {text}
    </span>
  )
}

export function DecisionConfidenceSection() {
  return (
    <section className="section-base" style={{ background: 'var(--background)' }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -48, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel color="#a78bfa" text="DECISION CONFIDENCE" />
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: "#0a1628" }}>
              Not just a score.
              <br />
              <span style={{ background: 'linear-gradient(135deg, #a78bfa, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                An explanation.
              </span>
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#7db0d4' }}>
              Every Truvala score comes with a breakdown of what went into it, what data was used,
              what&apos;s uncertain, and what you should investigate before moving forward.
              You don&apos;t just get a number — you get the reasoning.
            </p>
            <ul className="space-y-4">
              {[
                { label: 'Why the score is what it is', icon: '📊' },
                { label: 'What data sources informed the analysis', icon: '🔍' },
                { label: 'What Truvala couldn\'t verify', icon: '❓' },
                { label: 'What to investigate before offering', icon: '📋' },
              ].map(({ label, icon }) => (
                <li key={label} className="flex items-center gap-3 text-sm" style={{ color: "#475569" }}>
                  <span className="text-lg">{icon}</span>
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 48, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            className="glass-card rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-md" style={{ background: 'linear-gradient(135deg, #2563eb, #22d3ee)' }} />
              <span className="text-xs font-bold tracking-widest" style={{ color: '#60a5fa' }}>WHY THIS SCORE</span>
            </div>

            {[
              {
                header: 'Strong spatial match (↑ +12 pts)',
                body: '2,100 sqft aligns well with a household of 4. We weighted this heavily based on your stated priorities.',
                color: '#4ade80',
              },
              {
                header: 'Budget risk flagged (↓ −9 pts)',
                body: '$672k is at the top of your $650k comfort zone. Monthly costs including HOA push well above your target.',
                color: '#f87171',
              },
              {
                header: 'HOA exceeds preference (↓ −7 pts)',
                body: 'You indicated HOA sensitivity. $280/mo is 40% above your stated tolerance.',
                color: '#fbbf24',
              },
              {
                header: 'Location is a strong fit (↑ +8 pts)',
                body: '14 min to your preferred work area. School district rating matches your listed priority.',
                color: '#22d3ee',
              },
            ].map(({ header, body, color }) => (
              <div
                key={header}
                className="p-3 rounded-xl text-xs"
                style={{ background: `${color}08`, border: `1px solid ${color}20` }}
              >
                <p className="font-semibold mb-1" style={{ color }}>{header}</p>
                <p style={{ color: '#93c5fd' }}>{body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function NextStepsSection() {
  const steps = [
    {
      num: '1',
      title: 'Ask about HVAC and roof age',
      body: 'Neither is disclosed. Both could be original to 1987. Get documentation before your inspection.',
      urgency: 'critical',
    },
    {
      num: '2',
      title: 'Request the permit history in full',
      body: 'A 2021 permit shows no final inspection. Find out what work was done and why it wasn\'t closed.',
      urgency: 'high',
    },
    {
      num: '3',
      title: 'Pull the HOA reserve study',
      body: 'The $280/mo fee doesn\'t tell you if the HOA is underfunded. Request the last 2 years of financials.',
      urgency: 'high',
    },
    {
      num: '4',
      title: 'Understand the 47-day context',
      body: 'Two price reductions in 47 days is a signal. Ask why it hasn\'t sold and whether there are known issues.',
      urgency: 'medium',
    },
    {
      num: '5',
      title: 'Budget for near-term repairs',
      body: 'Conservative scenario: $26k–36k in the first 1–2 years. Factor this into your offer strategy.',
      urgency: 'medium',
    },
    {
      num: '6',
      title: 'Verify dual agency disclosure',
      body: 'Listing agent is also the sellers\' agent. Know what that means for your negotiating position.',
      urgency: 'low',
    },
  ]

  const urgencyStyle: Record<string, React.CSSProperties> = {
    critical: { background: '#fef2f2', borderColor: '#fca5a5', color: '#dc2626' },
    high:     { background: '#fffbeb', borderColor: '#fcd34d', color: '#d97706' },
    medium:   { background: '#f0f9ff', borderColor: '#7dd3fc', color: '#0284c7' },
    low:      { background: '#f8fafc', borderColor: '#cbd5e1', color: '#64748b' },
  }

  return (
    <section className="section-base" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionLabel color="#22d3ee" text="ACTIONABLE NEXT STEPS" />
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: "#0a1628" }}>
            From listing to
            <br />
            <span className="cyan-text">structured action plan.</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#7db0d4' }}>
            Truvala turns every listing into a prioritized list of things to verify,
            questions to ask, and decisions to make — before you make an offer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map(({ num, title, body, urgency }, i) => (
            <motion.div
              key={num}
              className="glass-card rounded-2xl p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl font-bold" style={{ color: 'rgba(255,255,255,0.07)' }}>
                  {num}
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{ ...urgencyStyle[urgency], border: '1px solid' }}
                >
                  {urgency}
                </span>
              </div>
              <h3 className="font-semibold mb-2 text-sm leading-snug" style={{ color: "#0a1628" }}>{title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#7db0d4' }}>{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
