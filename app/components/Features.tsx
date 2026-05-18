'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'motion/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ── Visual panels ─────────────────────────────────────── */

function BuyerFitVisual() {
  const bars = [
    { label: 'Square footage', score: 95, note: 'Strong match', good: true  },
    { label: 'Budget range',   score: 58, note: 'At upper limit',    good: false },
    { label: 'Commute',        score: 88, note: '14 min to target',  good: true  },
    { label: 'HOA tolerance',  score: 42, note: 'Exceeds preference', good: false },
    { label: 'School district',score: 91, note: 'High priority met', good: true  },
  ]
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-2xl font-bold" style={{ color: '#0a1628' }}>78<span className="text-sm font-normal" style={{ color: '#94a3b8' }}>/100</span></p>
          <p className="text-xs font-medium mt-0.5" style={{ color: '#2563eb' }}>Buyer Fit Score</p>
        </div>
        <svg width="56" height="56" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(37,99,235,0.1)" strokeWidth="5" />
          <circle cx="28" cy="28" r="22" fill="none" stroke="#2563eb" strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 22}
            strokeDashoffset={2 * Math.PI * 22 * (1 - 0.78)}
            transform="rotate(-90 28 28)" />
        </svg>
      </div>
      {bars.map(({ label, score, note, good }) => (
        <div key={label}>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span style={{ color: '#475569' }}>{label}</span>
            <span style={{ color: good ? '#059669' : '#dc2626' }}>{note}</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: '#e2e8f0' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: good ? '#10b981' : '#ef4444' }}
              initial={{ width: 0 }}
              whileInView={{ width: `${score}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function ReliabilityVisual() {
  const flags = [
    { type: 'warn', msg: 'HVAC age not disclosed — typical red flag for 1987 builds' },
    { type: 'warn', msg: '"Renovated kitchen" — scope unclear, no permit found' },
    { type: 'warn', msg: '2021 permit filed — no final inspection on record' },
    { type: 'ok',   msg: 'Tax history consistent with listed ownership' },
    { type: 'ok',   msg: 'Seller disclosure complete and filed' },
  ]
  return (
    <div className="space-y-2.5">
      <p className="text-[11px] font-semibold tracking-[0.1em] mb-4" style={{ color: '#94a3b8' }}>LISTING ANALYSIS</p>
      {flags.map(({ type, msg }, i) => (
        <motion.div
          key={msg}
          className="flex items-start gap-2.5 p-3 rounded-xl text-xs"
          style={{
            background: type === 'warn' ? '#fffbeb' : '#f0fdf4',
            border: `1px solid ${type === 'warn' ? '#fcd34d' : '#86efac'}`,
          }}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.07 }}
        >
          <span style={{ color: type === 'warn' ? '#d97706' : '#059669', flexShrink: 0, marginTop: 1 }}>
            {type === 'warn' ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.052 3.378c.866-1.5 3.032-1.5 3.898 0l6.353 12.748z" />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            )}
          </span>
          <span style={{ color: '#374151' }}>{msg}</span>
        </motion.div>
      ))}
    </div>
  )
}

function RiskVisual() {
  const risks = [
    { severity: 'high',   cat: 'Component Age',  detail: 'Roof & HVAC likely original (1987). Both approaching or past expected lifespan.' },
    { severity: 'high',   cat: 'Market Signal',   detail: '47 days + 2 price drops. May indicate undisclosed issue or overpricing.' },
    { severity: 'medium', cat: 'HOA Exposure',    detail: '$280/mo — reserve study unavailable. Unknown capital call liability.' },
    { severity: 'low',    cat: 'Flip Signal',     detail: '3 permits in 5 yrs, cosmetic only. No structural improvements.' },
  ]
  return (
    <div className="space-y-3">
      <p className="text-[11px] font-semibold tracking-[0.1em] mb-4" style={{ color: '#94a3b8' }}>RISK BREAKDOWN</p>
      {risks.map(({ severity, cat, detail }) => (
        <div
          key={cat}
          className="flex gap-3 p-3.5 rounded-xl"
          style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 1px 6px rgba(14,42,99,0.04)' }}
        >
          <span
            className={`mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 h-fit risk-${severity}`}
            style={{ border: '1px solid' }}
          >
            {severity}
          </span>
          <div>
            <p className="text-xs font-semibold mb-0.5" style={{ color: '#0a1628' }}>{cat}</p>
            <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{detail}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function CostVisual() {
  const items = [
    { item: 'Roof replacement',   when: '0–5 years',  low: 18000, high: 24000 },
    { item: 'HVAC replacement',   when: 'Immediate',  low: 8000,  high: 12000 },
    { item: 'HOA fees (5yr)',     when: 'Ongoing',    low: 16800, high: 16800 },
    { item: 'Annual maintenance', when: 'Per year',   low: 10000, high: 15000 },
  ]
  return (
    <div className="space-y-4">
      <p className="text-[11px] font-semibold tracking-[0.1em] mb-4" style={{ color: '#94a3b8' }}>ESTIMATED OWNERSHIP COSTS</p>
      {items.map(({ item, when, low, high }) => (
        <div key={item} className="flex items-center justify-between text-sm">
          <div>
            <p className="font-semibold" style={{ color: '#0a1628' }}>{item}</p>
            <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>{when}</p>
          </div>
          <div className="text-right">
            <p className="font-bold" style={{ color: '#0a1628' }}>
              ${(low / 1000).toFixed(0)}k
              {high !== low && <span style={{ color: '#94a3b8' }}>–${(high / 1000).toFixed(0)}k</span>}
            </p>
          </div>
        </div>
      ))}
      <div className="pt-4" style={{ borderTop: '1px solid #e2e8f0' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold" style={{ color: '#0891b2' }}>5-year total exposure</p>
            <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>Beyond mortgage &amp; taxes</p>
          </div>
          <p className="text-xl font-bold" style={{ color: '#0a1628' }}>~$55k–75k</p>
        </div>
      </div>
    </div>
  )
}

/* ── Feature data ─────────────────────────────────────── */

const features = [
  {
    num: '01',
    tag: 'Buyer Fit',
    color: '#2563eb',
    headline: 'Your priorities. Not the algorithm\'s.',
    body: 'Truvala builds a fit score around you — your budget comfort, space needs, commute tolerance, HOA sensitivity, and lifestyle priorities. You see how well a listing matches you, and exactly why.',
    visual: <BuyerFitVisual />,
    flip: false,
  },
  {
    num: '02',
    tag: 'Reliability Analysis',
    color: '#d97706',
    headline: 'What the listing isn\'t saying.',
    body: 'Truvala reads what\'s there — and what\'s absent. It flags vague language, missing disclosures, claims without permits, and gaps that warrant questions before your offer.',
    visual: <ReliabilityVisual />,
    flip: true,
  },
  {
    num: '03',
    tag: 'Risk Analysis',
    color: '#dc2626',
    headline: 'The risks that listings don\'t list.',
    body: 'Age-based component failures, bad flip signals, HOA exposure, unusual property types, long days on market, pricing irregularities, and ownership risks — Truvala surfaces them all.',
    visual: <RiskVisual />,
    flip: false,
  },
  {
    num: '04',
    tag: 'Hidden Costs',
    color: '#0891b2',
    headline: 'The real price of ownership.',
    body: 'Truvala estimates near-term repair needs, ongoing maintenance obligations, HOA fee burden, and upgrade costs — so you know what $672,000 actually costs to own over five years.',
    visual: <CostVisual />,
    flip: true,
  },
]

/* ── Component ────────────────────────────────────────── */

export default function Features() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.feat-head', {
        y: 28, opacity: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.feat-head', start: 'top 84%' },
      })
    },
    { scope: ref }
  )

  return (
    <section id="features" ref={ref} className="section-base" style={{ background: 'var(--background)' }}>
      <div className="container">
        <div className="feat-head text-center max-w-2xl mx-auto mb-20">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.12em] mb-6"
            style={{ background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.18)', color: '#2563eb' }}
          >
            WHAT TRUVALA DOES
          </span>
          <h2
            className="font-bold leading-[1.1] tracking-tight mb-5"
            style={{ fontSize: 'clamp(30px, 3.8vw, 50px)', color: '#0a1628' }}
          >
            A second opinion, built into the browser.
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#64748b' }}>
            Not a new place to search. A smarter lens on every listing you already browse.
          </p>
        </div>

        <div className="space-y-6">
          {features.map((f, i) => (
            <motion.div
              key={f.num}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center p-8 lg:p-10 rounded-3xl`}
              style={{
                background: 'white',
                border: '1px solid rgba(37,99,235,0.08)',
                boxShadow: '0 2px 20px rgba(14,42,99,0.05)',
              }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Text side */}
              <div className={f.flip ? 'lg:order-2' : 'lg:order-1'}>
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="text-6xl font-bold leading-none tabular-nums"
                    style={{ color: 'rgba(10,22,40,0.05)' }}
                  >
                    {f.num}
                  </span>
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-[0.07em]"
                    style={{ background: `${f.color}12`, border: `1px solid ${f.color}28`, color: f.color }}
                  >
                    {f.tag}
                  </span>
                </div>
                <h3
                  className="font-bold leading-snug mb-4"
                  style={{ fontSize: 'clamp(20px, 2.5vw, 30px)', color: '#0a1628' }}
                >
                  {f.headline}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: '#64748b' }}>
                  {f.body}
                </p>
              </div>

              {/* Visual side */}
              <div
                className={`p-6 rounded-2xl ${f.flip ? 'lg:order-1' : 'lg:order-2'}`}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid rgba(37,99,235,0.07)',
                }}
              >
                {f.visual}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
