'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'motion/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const features = [
  {
    number: '01',
    tag: 'Buyer Fit',
    headline: 'Your priorities. Not the algorithm\'s.',
    body: 'Truvala builds a fit score around you — your budget comfort, space needs, commute tolerance, HOA sensitivity, and lifestyle priorities. You see how well a listing matches you, and exactly why.',
    color: '#2563eb',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    visual: (
      <div className="space-y-3">
        {[
          { label: 'Square footage', score: 95, note: 'Strong match',      good: true  },
          { label: 'Budget range',   score: 58, note: 'At upper limit',    good: false },
          { label: 'Commute',        score: 88, note: '14 min to target',  good: true  },
          { label: 'HOA tolerance',  score: 42, note: 'Exceeds preference',good: false },
          { label: 'School district',score: 91, note: 'High priority met', good: true  },
        ].map(({ label, score, note, good }) => (
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
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: '02',
    tag: 'Reliability Analysis',
    headline: 'What the listing isn\'t saying.',
    body: 'Truvala reads what\'s there — and what\'s absent. It flags vague language, missing disclosures, claims without permits, and gaps that warrant questions before your offer.',
    color: '#d97706',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-2.243-.619-4.344-1.698-6.143M3 12h18" />
      </svg>
    ),
    visual: (
      <div className="space-y-2.5">
        {[
          { type: 'warn', msg: 'HVAC age not disclosed — typical red flag for 1987 builds' },
          { type: 'warn', msg: '"Renovated kitchen" — scope unclear, no permit found' },
          { type: 'warn', msg: '2021 permit filed — no final inspection on record' },
          { type: 'ok', msg: 'Tax history consistent with listed ownership' },
          { type: 'ok', msg: 'Seller disclosure complete and filed' },
        ].map(({ type, msg }) => (
          <motion.div
            key={msg}
            className="flex items-start gap-2.5 p-2.5 rounded-lg text-xs"
            style={{
              background: type === 'warn' ? '#fffbeb' : '#f0fdf4',
              border: `1px solid ${type === 'warn' ? '#fcd34d' : '#86efac'}`,
            }}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <span style={{ color: type === 'warn' ? '#d97706' : '#059669', flexShrink: 0, marginTop: 1 }}>
              {type === 'warn' ? '⚠' : '✓'}
            </span>
            <span style={{ color: '#374151' }}>{msg}</span>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    number: '03',
    tag: 'Advanced Risk Analysis',
    headline: 'The risks that listings don\'t list.',
    body: 'Age-based component failures, bad flip signals, HOA exposure, unusual property types, long days on market, pricing irregularities, and ownership risks — Truvala surfaces them all.',
    color: '#dc2626',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-2.243-.619-4.344-1.698-6.143M3 12h18" />
      </svg>
    ),
    visual: (
      <div className="space-y-3">
        {[
          { severity: 'high',   cat: 'Component Age',  detail: 'Roof & HVAC likely original (1987) — both approaching end of life' },
          { severity: 'high',   cat: 'Market Signal',   detail: '47 days + 2 price drops. May indicate undisclosed issue.' },
          { severity: 'medium', cat: 'HOA Exposure',    detail: '$280/mo — reserve study unavailable. Unknown capital liability.' },
          { severity: 'low',    cat: 'Flip Signal',     detail: '3 permits in 5 yrs, cosmetic only. No structural improvements.' },
        ].map(({ severity, cat, detail }) => (
          <div
            key={cat}
            className="flex gap-3 p-3 rounded-xl"
            style={{ background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(14,42,99,0.04)' }}
          >
            <span
              className={`mt-0.5 px-2 py-0.5 rounded text-xs font-semibold shrink-0 h-fit risk-${severity}`}
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
    ),
  },
  {
    number: '04',
    tag: 'Hidden Cost Awareness',
    headline: 'The real price of ownership.',
    body: 'Truvala estimates near-term repair needs, ongoing maintenance obligations, HOA fee burden, and upgrade costs — so you know what $672,000 actually costs to own over five years.',
    color: '#0891b2',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75" />
      </svg>
    ),
    visual: (
      <div className="space-y-3">
        {[
          { item: 'Roof replacement',   when: '0–5 yrs',  low: 18000, high: 24000 },
          { item: 'HVAC replacement',   when: 'Immediate', low: 8000,  high: 12000 },
          { item: 'HOA fees (5yr)',     when: 'Ongoing',   low: 16800, high: 16800 },
          { item: 'Annual maintenance', when: 'Per year',  low: 10000, high: 15000 },
        ].map(({ item, when, low, high }) => (
          <div key={item} className="flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold" style={{ color: '#0a1628' }}>{item}</p>
              <p style={{ color: '#94a3b8' }}>{when}</p>
            </div>
            <div className="text-right">
              <p className="font-bold" style={{ color: '#0a1628' }}>
                ${(low / 1000).toFixed(0)}k
                {high !== low ? <span style={{ color: '#94a3b8' }}>–${(high / 1000).toFixed(0)}k</span> : ''}
              </p>
            </div>
          </div>
        ))}
        <div className="pt-3 border-t flex items-center justify-between text-sm font-bold" style={{ borderColor: '#e2e8f0' }}>
          <span style={{ color: '#0891b2' }}>5-yr total exposure</span>
          <span style={{ color: '#0a1628' }}>~$55k–75k</span>
        </div>
      </div>
    ),
  },
]

export default function Features() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.feat-head', {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.feat-head', start: 'top 82%' },
      })
    },
    { scope: ref }
  )

  return (
    <section id="features" ref={ref} className="section-base" style={{ background: 'var(--background)' }}>
      <div className="container">
        <div className="feat-head text-center max-w-3xl mx-auto mb-20">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-5"
            style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)', color: '#2563eb' }}
          >
            WHAT TRUVALA DOES
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: '#0a1628' }}>
            A second opinion.{' '}
            <span className="blue-text">Built into the browser.</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#64748b' }}>
            Not a new place to search. A smarter lens on the listings you're already browsing.
          </p>
        </div>

        <div className="space-y-8">
          {features.map((f, i) => (
            <motion.div
              key={f.number}
              className="grid lg:grid-cols-2 gap-10 items-start p-8 lg:p-10 rounded-3xl"
              style={{
                background: 'white',
                border: '1px solid rgba(37,99,235,0.1)',
                boxShadow: '0 4px 24px rgba(14,42,99,0.06)',
                ...(i % 2 === 1 ? { direction: 'rtl' as const } : {}),
              }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 16 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Text */}
              <div style={i % 2 === 1 ? { direction: 'ltr' } : {}}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-5xl font-bold" style={{ color: 'rgba(10,22,40,0.06)' }}>
                    {f.number}
                  </span>
                  <div
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: `${f.color}12`, border: `1px solid ${f.color}30`, color: f.color }}
                  >
                    <span>{f.icon}</span>
                    {f.tag}
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-snug" style={{ color: '#0a1628' }}>
                  {f.headline}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: '#64748b' }}>
                  {f.body}
                </p>
              </div>

              {/* Visual */}
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid rgba(37,99,235,0.08)',
                  ...(i % 2 === 1 ? { direction: 'ltr' } : {}),
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
