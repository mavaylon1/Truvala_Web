'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function SectionBadge({ color, text }: { color: string; text: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.12em] mb-6"
      style={{ background: `${color}14`, border: `1px solid ${color}28`, color }}
    >
      {text}
    </span>
  )
}

export function DecisionConfidenceSection() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.conf-left', {
        x: -32, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
      gsap.from('.conf-right', {
        x: 32, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.12,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
    },
    { scope: ref }
  )

  const explanations = [
    { header: 'Strong spatial match', delta: '+12 pts', body: '2,100 sqft aligns well with a household of 4. We weighted this heavily based on your stated priorities.', positive: true },
    { header: 'Budget risk flagged',  delta: '−9 pts',  body: '$672k is at the top of your $650k comfort zone. Monthly costs including HOA push well above your target.', positive: false },
    { header: 'HOA exceeds preference', delta: '−7 pts', body: 'You indicated HOA sensitivity. $280/mo is 40% above your stated tolerance.', positive: false },
    { header: 'Location is a strong fit', delta: '+8 pts', body: '14 min to your preferred work area. School district rating matches your listed priority.', positive: true },
  ]

  const bulletPoints = [
    'Why the score is what it is',
    'What data sources informed the analysis',
    'What Truvala could not verify',
    'What to investigate before offering',
  ]

  return (
    <section ref={ref} className="section-base" style={{ background: 'var(--background)' }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div className="conf-left">
            <SectionBadge color="#7c3aed" text="DECISION CONFIDENCE" />
            <h2
              className="font-bold leading-[1.1] tracking-tight mb-6"
              style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', color: '#0a1628' }}
            >
              Not just a score.
              <br />
              <span style={{ color: '#7c3aed' }}>An explanation.</span>
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#4a5568' }}>
              Every Truvala score comes with a breakdown of what went into it, what data was used,
              what&apos;s uncertain, and what you should investigate before moving forward.
              You get the reasoning, not just the number.
            </p>
            <ul className="space-y-4">
              {bulletPoints.map(label => (
                <li key={label} className="flex items-center gap-3 text-sm" style={{ color: '#475569' }}>
                  <span
                    className="flex items-center justify-center w-5 h-5 rounded-full shrink-0"
                    style={{ background: 'rgba(124,58,237,0.1)', color: '#7c3aed' }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: explanation card */}
          <div className="conf-right glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-4 h-4 rounded-[4px]"
                style={{ background: 'linear-gradient(135deg, #2563eb, #22d3ee)' }}
              />
              <span className="text-xs font-bold tracking-[0.12em]" style={{ color: '#2563eb' }}>WHY THIS SCORE</span>
            </div>

            {explanations.map(({ header, delta, body, positive }, i) => (
              <motion.div
                key={header}
                className="p-3.5 rounded-xl text-xs"
                style={{
                  background: positive ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.04)',
                  border: `1px solid ${positive ? 'rgba(16,185,129,0.18)' : 'rgba(239,68,68,0.15)'}`,
                }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <p className="font-semibold" style={{ color: '#0a1628' }}>{header}</p>
                  <span
                    className="px-2 py-0.5 rounded font-bold text-[11px]"
                    style={{
                      background: positive ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)',
                      color: positive ? '#059669' : '#dc2626',
                    }}
                  >
                    {delta}
                  </span>
                </div>
                <p style={{ color: '#64748b' }}>{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const URGENCY_STYLE: Record<string, React.CSSProperties> = {
  critical: { background: '#fef2f2', borderColor: '#fca5a5', color: '#dc2626' },
  high:     { background: '#fffbeb', borderColor: '#fcd34d', color: '#d97706' },
  medium:   { background: '#eff6ff', borderColor: '#93c5fd', color: '#2563eb' },
  low:      { background: '#f8fafc', borderColor: '#cbd5e1', color: '#64748b' },
}

const STEPS = [
  { num: '1', title: 'Ask about HVAC and roof age', body: 'Neither is disclosed. Both could be original to 1987. Get documentation before your inspection.', urgency: 'critical' },
  { num: '2', title: 'Request the permit history in full', body: 'A 2021 permit shows no final inspection. Find out what work was done and why it wasn\'t closed.', urgency: 'high' },
  { num: '3', title: 'Pull the HOA reserve study', body: 'The $280/mo fee doesn\'t tell you if the HOA is underfunded. Request the last 2 years of financials.', urgency: 'high' },
  { num: '4', title: 'Understand the 47-day context', body: 'Two price reductions in 47 days is a signal. Ask why it hasn\'t sold and whether there are known issues.', urgency: 'medium' },
  { num: '5', title: 'Budget for near-term repairs', body: 'Conservative scenario: $26k–36k in the first 1–2 years. Factor this into your offer strategy.', urgency: 'medium' },
  { num: '6', title: 'Verify dual agency disclosure', body: 'Listing agent is also the sellers\' agent. Know what that means for your negotiating position.', urgency: 'low' },
]

export function NextStepsSection() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.nxt-head', {
        y: 26, opacity: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.nxt-head', start: 'top 84%' },
      })
      gsap.from('.nxt-step', {
        y: 28, opacity: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: '.nxt-grid', start: 'top 80%' },
      })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="section-base" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="nxt-head text-center max-w-2xl mx-auto mb-16">
          <SectionBadge color="#06b6d4" text="ACTIONABLE NEXT STEPS" />
          <h2
            className="font-bold leading-[1.1] tracking-tight mb-5"
            style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', color: '#0a1628' }}
          >
            From listing to
            <br />
            <span style={{ color: '#0891b2' }}>structured action plan.</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#4a5568' }}>
            Truvala turns every listing into a prioritized list of things to verify,
            questions to ask, and decisions to make — before you make an offer.
          </p>
        </div>

        <div className="nxt-grid grid md:grid-cols-2 gap-x-10 gap-y-0">
          {/* Left column: steps 1-3 */}
          <div>
            {STEPS.slice(0, 3).map(({ num, title, body, urgency }, i) => (
              <div
                key={num}
                className="nxt-step flex gap-5 py-7"
                style={{ borderBottom: i < 2 ? '1px solid rgba(14,42,99,0.07)' : 'none' }}
              >
                <div className="shrink-0 pt-0.5">
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-xl text-sm font-bold"
                    style={{ background: 'rgba(37,99,235,0.08)', color: '#2563eb' }}
                  >
                    {num}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <h3 className="text-sm font-semibold" style={{ color: '#0a1628' }}>{title}</h3>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{ ...URGENCY_STYLE[urgency], border: '1px solid' }}
                    >
                      {urgency}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right column: steps 4-6 */}
          <div style={{ borderLeft: '1px solid rgba(14,42,99,0.07)' }} className="pl-10">
            {STEPS.slice(3).map(({ num, title, body, urgency }, i) => (
              <div
                key={num}
                className="nxt-step flex gap-5 py-7"
                style={{ borderBottom: i < 2 ? '1px solid rgba(14,42,99,0.07)' : 'none' }}
              >
                <div className="shrink-0 pt-0.5">
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-xl text-sm font-bold"
                    style={{ background: 'rgba(37,99,235,0.08)', color: '#2563eb' }}
                  >
                    {num}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <h3 className="text-sm font-semibold" style={{ color: '#0a1628' }}>{title}</h3>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{ ...URGENCY_STYLE[urgency], border: '1px solid' }}
                    >
                      {urgency}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
