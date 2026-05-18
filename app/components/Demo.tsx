'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Tab = 'fit' | 'reliability' | 'risks' | 'costs'

const CIRCUMFERENCE = 2 * Math.PI * 44
const SCORE_TARGET = 78

const RELIABILITY_FLAGS = [
  { type: 'warn', msg: 'HVAC age not disclosed — typical red flag for 1987 build' },
  { type: 'warn', msg: '"Renovated kitchen" — scope unclear, no permit found' },
  { type: 'warn', msg: '2021 permit filed — no final inspection on record' },
  { type: 'ok',   msg: 'Tax history consistent with listed ownership history' },
  { type: 'ok',   msg: 'Seller disclosure complete and filed on record' },
  { type: 'info', msg: 'Listing agent is also sellers\' agent — dual agency' },
]

const RISKS = [
  { severity: 'high',   cat: 'Component Age', detail: 'Roof & HVAC likely original (1987). Both approaching or past expected lifespan.' },
  { severity: 'high',   cat: 'Market Signal',  detail: '47 days on market. Two price reductions. Possible undisclosed issue or overpricing.' },
  { severity: 'medium', cat: 'HOA Exposure',   detail: '$280/mo ongoing. Reserve study not publicly available. Capital call risk unknown.' },
  { severity: 'low',    cat: 'Flip Signal',    detail: '3 permits in 5 years, cosmetic-focused. No structural work — surface improvements only.' },
]

const COSTS = [
  { item: 'Roof replacement',   when: '0–5 years', low: 18000, high: 24000, urgent: true  },
  { item: 'HVAC system',        when: 'Immediate',  low: 8000,  high: 12000, urgent: true  },
  { item: 'HOA fees (5yr)',     when: 'Ongoing',    low: 16800, high: 16800, urgent: false },
  { item: 'Annual maintenance', when: '$2k–3k/yr',  low: 10000, high: 15000, urgent: false },
]

const FIT_FACTORS = [
  { label: 'Square footage', score: 95, note: '2,100 sqft — strong match for household of 4', good: true  },
  { label: 'Budget range',   score: 58, note: 'At upper limit of $650k comfort zone',         good: false },
  { label: 'Commute',        score: 88, note: '14 min to preferred work area',                good: true  },
  { label: 'HOA tolerance',  score: 40, note: '$280/mo exceeds your stated preference',        good: false },
  { label: 'School district',score: 92, note: 'Highly rated — matches stated priority',       good: true  },
]

function WarnIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9.303 3.376c.866 1.5-.217 3.374-1.948 3.374H4.645c-1.73 0-2.813-1.874-1.948-3.374L10.052 3.378c.866-1.5 3.032-1.5 3.898 0l6.353 12.748z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  )
}

function ScoreRing({ score }: { score: number }) {
  const dashOffset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="demoScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#2563eb" />
          <stop offset="50%"  stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(96,165,250,0.08)" strokeWidth="8" />
      <circle
        cx="50" cy="50" r="44"
        fill="none"
        stroke="url(#demoScoreGrad)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={dashOffset}
        transform="rotate(-90 50 50)"
        className="score-ring"
      />
      <text x="50" y="45" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="22" fontWeight="700" fontFamily="var(--font-geist-sans, system-ui)">
        {score}
      </text>
      <text x="50" y="63" textAnchor="middle" dominantBaseline="middle" fill="#5b8ab5" fontSize="9" fontFamily="var(--font-geist-sans, system-ui)">
        BUYER FIT
      </text>
    </svg>
  )
}

function BuyerFitTab({ score }: { score: number }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-5">
        <ScoreRing score={score} />
        <div>
          <p className="text-2xl font-bold text-white mb-0.5">
            {score}<span className="text-base font-normal" style={{ color: '#5b8ab5' }}>/100</span>
          </p>
          <p className="text-sm font-semibold" style={{ color: '#60a5fa' }}>Strong Match</p>
          <p className="text-xs mt-1" style={{ color: '#4d7aaa' }}>Based on your stated priorities</p>
        </div>
      </div>
      <div className="space-y-3">
        {FIT_FACTORS.map(({ label, score: s, note, good }) => (
          <div key={label}>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span style={{ color: '#94a3b8' }}>{label}</span>
              <span style={{ color: good ? '#4ade80' : '#f87171' }}>{note}</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: good ? '#4ade80' : '#f87171' }}
                initial={{ width: 0 }}
                animate={{ width: `${s}%` }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReliabilityTab() {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-semibold tracking-[0.1em] mb-3" style={{ color: '#4d7aaa' }}>LISTING ANALYSIS</p>
      {RELIABILITY_FLAGS.map(({ type, msg }, i) => (
        <motion.div
          key={msg}
          className="flex items-start gap-2.5 p-2.5 rounded-xl text-xs"
          style={{
            background: type === 'warn' ? 'rgba(251,191,36,0.06)' : type === 'ok' ? 'rgba(74,222,128,0.06)' : 'rgba(103,232,249,0.06)',
            border: `1px solid ${type === 'warn' ? 'rgba(251,191,36,0.16)' : type === 'ok' ? 'rgba(74,222,128,0.16)' : 'rgba(103,232,249,0.16)'}`,
          }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.065, duration: 0.32 }}
        >
          <span
            className="mt-0.5 shrink-0"
            style={{ color: type === 'warn' ? '#fbbf24' : type === 'ok' ? '#4ade80' : '#22d3ee' }}
          >
            {type === 'warn' ? <WarnIcon /> : type === 'ok' ? <CheckIcon /> : <InfoIcon />}
          </span>
          <span style={{ color: '#94a3b8' }}>{msg}</span>
        </motion.div>
      ))}
    </div>
  )
}

function RisksTab() {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-semibold tracking-[0.1em] mb-3" style={{ color: '#4d7aaa' }}>RISK BREAKDOWN</p>
      {RISKS.map(({ severity, cat, detail }, i) => (
        <motion.div
          key={cat}
          className="flex gap-3 p-3.5 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.35 }}
        >
          <span
            className={`mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 h-fit risk-${severity}`}
            style={{ border: '1px solid' }}
          >
            {severity}
          </span>
          <div>
            <p className="text-xs font-semibold text-white mb-0.5">{cat}</p>
            <p className="text-xs leading-relaxed" style={{ color: '#7db0d4' }}>{detail}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function CostsTab() {
  return (
    <div className="space-y-4">
      <p className="text-[10px] font-semibold tracking-[0.1em] mb-3" style={{ color: '#4d7aaa' }}>ESTIMATED OWNERSHIP COSTS</p>
      {COSTS.map(({ item, when, low, high, urgent }, i) => (
        <motion.div
          key={item}
          className="flex items-center justify-between text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.075 }}
        >
          <div>
            <p className="font-medium text-white flex items-center gap-2">
              {item}
              {urgent && (
                <span className="text-[10px] px-1.5 py-0.5 rounded risk-high" style={{ border: '1px solid' }}>urgent</span>
              )}
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#5b8ab5' }}>{when}</p>
          </div>
          <p className="font-semibold text-white text-right">
            ${(low / 1000).toFixed(0)}k
            {high !== low && <span style={{ color: '#4d7aaa' }}>–${(high / 1000).toFixed(0)}k</span>}
          </p>
        </motion.div>
      ))}
      <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold" style={{ color: '#22d3ee' }}>5-year exposure estimate</p>
            <p className="text-xs mt-0.5" style={{ color: '#5b8ab5' }}>Beyond mortgage &amp; taxes</p>
          </div>
          <p className="text-xl font-bold text-white">
            ~$55k–<span style={{ color: '#22d3ee' }}>$75k</span>
          </p>
        </div>
      </div>
    </div>
  )
}

const tabs: { id: Tab; label: string; count: string; color: string }[] = [
  { id: 'fit',         label: 'Buyer Fit',    count: '78/100',  color: '#60a5fa' },
  { id: 'reliability', label: 'Reliability',  count: '3 flags', color: '#fbbf24' },
  { id: 'risks',       label: 'Risks',        count: '4 found', color: '#f87171' },
  { id: 'costs',       label: 'Hidden Costs', count: '~$55k',   color: '#22d3ee' },
]

export default function Demo() {
  const [activeTab, setActiveTab] = useState<Tab>('fit')
  const [score, setScore] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimatedScore = useRef(false)

  useGSAP(
    () => {
      gsap.from('.demo-head', {
        y: 28, opacity: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: '.demo-head', start: 'top 84%' },
      })
      gsap.from('.demo-body', {
        y: 36, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.demo-body',
          start: 'top 80%',
          onEnter: () => {
            if (!hasAnimatedScore.current) {
              hasAnimatedScore.current = true
              let c = 0
              const iv = setInterval(() => {
                c += 2
                if (c >= SCORE_TARGET) { setScore(SCORE_TARGET); clearInterval(iv) }
                else setScore(c)
              }, 22)
            }
          },
        },
      })
    },
    { scope: ref }
  )

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    if (tab === 'fit' && score === 0) {
      let c = 0
      const iv = setInterval(() => {
        c += 2
        if (c >= SCORE_TARGET) { setScore(SCORE_TARGET); clearInterval(iv) }
        else setScore(c)
      }, 22)
    }
  }

  return (
    <section id="demo" ref={ref} className="section-base relative" style={{ background: 'var(--surface)' }}>
      <div className="absolute inset-0 grid-bg pointer-events-none" style={{ opacity: 0.3 }} />

      {/* Accent orb behind panel */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%', right: '-5%', width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'glow-breathe 6s ease-in-out infinite',
        }}
      />

      <div className="container relative z-10">
        <div className="demo-head text-center max-w-2xl mx-auto mb-16">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.12em] mb-6"
            style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', color: '#06b6d4' }}
          >
            INTERACTIVE DEMO
          </span>
          <h2
            className="font-bold leading-[1.1] tracking-tight mb-5"
            style={{ fontSize: 'clamp(30px, 3.8vw, 50px)', color: '#0a1628' }}
          >
            See Truvala in action.
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#64748b' }}>
            A real analysis layout — click the tabs to explore what Truvala
            surfaces on every listing you browse.
          </p>
        </div>

        <div className="demo-body grid lg:grid-cols-[1fr_1.15fr] gap-8 items-start">
          {/* Listing card */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.12em] mb-4" style={{ color: '#94a3b8' }}>LISTING VIEWED</p>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(4,18,48,0.94)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
              }}
            >
              {/* Browser bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.025)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,95,87,0.55)' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,189,46,0.55)' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(40,200,64,0.55)' }} />
                </div>
                <div
                  className="flex-1 ml-2 text-xs text-center py-0.5 px-3 rounded-md"
                  style={{ background: 'rgba(255,255,255,0.04)', color: '#4d7aaa' }}
                >
                  zillow.com/homedetails/4721-meadowbrook-lane
                </div>
              </div>

              <div className="p-5">
                {/* Photo */}
                <div
                  className="rounded-xl mb-5 relative overflow-hidden"
                  style={{
                    height: 180,
                    background: 'linear-gradient(140deg, #071a42 0%, #0d2d6b 50%, #0b2458 100%)',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0.1 }}>
                    <svg width="120" height="90" viewBox="0 0 120 90" fill="white">
                      <polygon points="60,8 112,42 8,42" />
                      <rect x="25" y="42" width="70" height="42" />
                      <rect x="50" y="55" width="20" height="29" fill="rgba(0,0,0,0.4)" />
                      <rect x="33" y="50" width="15" height="14" fill="rgba(255,255,255,0.2)" />
                      <rect x="72" y="50" width="15" height="14" fill="rgba(255,255,255,0.2)" />
                    </svg>
                  </div>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ background: 'rgba(251,191,36,0.14)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}
                    >
                      47 days on market
                    </span>
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ background: 'rgba(239,68,68,0.14)', border: '1px solid rgba(239,68,68,0.28)', color: '#f87171' }}
                    >
                      Price reduced 2×
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="font-bold text-white text-lg">$672,000</p>
                    <p className="text-xs mt-0.5" style={{ color: '#7db0d4' }}>4 bd · 3 ba · 2,100 sqft</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: '#7db0d4' }}>Built 1987</p>
                    <p className="text-xs" style={{ color: '#7db0d4' }}>HOA $280/mo</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white">4721 Meadowbrook Lane</p>
                <p className="text-xs mb-5" style={{ color: '#5b8ab5' }}>Austin, TX 78749</p>

                {/* Summary row */}
                <div
                  className="grid grid-cols-3 gap-3 text-center pt-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {[
                    { label: 'Buyer Fit',  value: '78/100', color: '#c9a76e' },
                    { label: 'Reliability', value: '3 flags', color: '#fbbf24' },
                    { label: 'Risk Level', value: 'High',    color: '#f87171' },
                  ].map(({ label, value, color }) => (
                    <div key={label}>
                      <p className="text-xs font-bold" style={{ color }}>{value}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#4d7aaa' }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Truvala analysis panel */}
          <div>
            <p className="text-[10px] font-semibold tracking-[0.12em] mb-4" style={{ color: '#94a3b8' }}>TRUVALA ANALYSIS</p>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(4,18,48,0.97)',
                border: '1px solid rgba(96,165,250,0.16)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.22), 0 0 0 1px rgba(59,130,246,0.05), 0 0 80px rgba(34,211,238,0.04)',
              }}
            >
              {/* Panel header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ background: 'rgba(37,99,235,0.06)', borderBottom: '1px solid rgba(96,165,250,0.08)' }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-[5px]"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #22d3ee)' }}
                  />
                  <span className="font-bold tracking-[0.18em] text-sm" style={{ color: '#60a5fa' }}>TRUVALA</span>
                </div>
                <span className="text-xs" style={{ color: '#4d7aaa' }}>4721 Meadowbrook Ln</span>
              </div>

              {/* Tabs */}
              <div className="flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {tabs.map(({ id, label, count, color }) => (
                  <button
                    key={id}
                    onClick={() => handleTabChange(id)}
                    className="flex-1 px-2 py-3 text-xs font-medium transition-all duration-200 relative"
                    style={{
                      color: activeTab === id ? color : '#5b8ab5',
                      background: activeTab === id ? `${color}09` : 'transparent',
                    }}
                  >
                    {label}
                    {activeTab === id && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                        style={{ background: color }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span
                      className="block text-xs mt-0.5 font-semibold tabular-nums"
                      style={{ color: activeTab === id ? color : '#3d5a7a' }}
                    >
                      {count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="p-5 min-h-[360px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                  >
                    {activeTab === 'fit'         && <BuyerFitTab score={score} />}
                    {activeTab === 'reliability' && <ReliabilityTab />}
                    {activeTab === 'risks'       && <RisksTab />}
                    {activeTab === 'costs'       && <CostsTab />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
              >
                <p className="text-xs" style={{ color: '#4d7aaa' }}>
                  Analysis from listing data
                </p>
                <button
                  className="text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200 active:scale-[0.97]"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)', color: 'white' }}
                >
                  Full Report
                  <span className="ml-1.5">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
