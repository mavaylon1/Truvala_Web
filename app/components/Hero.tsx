'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SCORE_TARGET = 78
const CIRCUMFERENCE = 2 * Math.PI * 38

const PARTICLES = [
  { left: '6%',  top: '20%', size: 4, color: '#2563eb', dur: 13, delay: 0   },
  { left: '16%', top: '70%', size: 3, color: '#06b6d4', dur: 11, delay: 1.2 },
  { left: '30%', top: '12%', size: 3, color: '#7c3aed', dur: 16, delay: 0.5 },
  { left: '52%', top: '80%', size: 4, color: '#3b82f6', dur: 14, delay: 2.1 },
  { left: '68%', top: '8%',  size: 3, color: '#06b6d4', dur: 12, delay: 0.8 },
  { left: '80%', top: '62%', size: 3, color: '#2563eb', dur: 17, delay: 1.6 },
  { left: '90%', top: '25%', size: 4, color: '#7c3aed', dur: 15, delay: 0.3 },
  { left: '3%',  top: '52%', size: 3, color: '#3b82f6', dur: 18, delay: 2.8 },
  { left: '57%', top: '90%', size: 3, color: '#06b6d4', dur: 10, delay: 1.9 },
  { left: '94%', top: '78%', size: 4, color: '#2563eb', dur: 13, delay: 0.7 },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [score, setScore] = useState(0)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const introDelay = prefersReduced ? 0.2 : 3.3

      const tl = gsap.timeline({ delay: introDelay })
      tl
        .from('.h-badge',  { y: 20, opacity: 0, duration: 0.55, ease: 'power3.out' })
        .from('.h-line',   { yPercent: 115, duration: 0.9, stagger: 0.11, ease: 'power4.out' }, '-=0.28')
        .from('.h-sub',    { y: 22, opacity: 0, duration: 0.65, ease: 'power3.out' }, '-=0.5')
        .from('.h-cta',    { y: 16, opacity: 0, duration: 0.55, ease: 'power3.out' }, '-=0.4')
        .from('.h-badges', { y: 12, opacity: 0, duration: 0.4  }, '-=0.3')
        .from('.h-mockup', { y: 60, opacity: 0, duration: 1.2,  ease: 'power3.out' }, '-=0.85')

      if (prefersReduced) return

      // Scroll parallax on orb wrappers
      gsap.to('.hero-orb-1', { y: -120, ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 2 } })
      gsap.to('.hero-orb-2', { y: -70,  ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 3 } })
      gsap.to('.hero-orb-3', { y: -45,  ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 2.5 } })
    },
    { scope: containerRef }
  )

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startDelay = prefersReduced ? 500 : 4200
    const t = setTimeout(() => {
      let c = 0
      const iv = setInterval(() => {
        c += 2
        if (c >= SCORE_TARGET) { setScore(SCORE_TARGET); clearInterval(iv) }
        else setScore(c)
      }, 22)
      return () => clearInterval(iv)
    }, startDelay)
    return () => clearTimeout(t)
  }, [])

  const dashOffset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
      style={{ background: '#ffffff' }}
    >
      {/* ── Subtle light orbs — tint on white, not dark ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-orb-1 absolute" style={{ top: '-15%', left: '-10%' }}>
          <div className="rounded-full" style={{
            width: 900, height: 900,
            background: 'radial-gradient(circle, rgba(37,99,235,0.09) 0%, rgba(59,130,246,0.04) 45%, transparent 70%)',
            filter: 'blur(72px)',
            animation: 'orb-1 20s ease-in-out infinite',
          }} />
        </div>
        <div className="hero-orb-2 absolute" style={{ top: '5%', right: '-15%' }}>
          <div className="rounded-full" style={{
            width: 750, height: 750,
            background: 'radial-gradient(circle, rgba(6,182,212,0.09) 0%, rgba(34,211,238,0.04) 45%, transparent 70%)',
            filter: 'blur(72px)',
            animation: 'orb-2 24s ease-in-out infinite',
          }} />
        </div>
        <div className="hero-orb-3 absolute" style={{ bottom: '-20%', left: '20%' }}>
          <div className="rounded-full" style={{
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
            filter: 'blur(64px)',
            animation: 'orb-3 16s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />

      {/* Micro particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <div key={i} className="absolute rounded-full" style={{
            left: p.left, top: p.top,
            width: p.size, height: p.size,
            background: p.color,
            opacity: 0.35,
            animation: `float-slow ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }} />
        ))}
      </div>

      {/* Light ray */}
      <div className="hero-ray" style={{ top: '46%' }} />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
        {/* ── Left copy ── */}
        <div>
          {/* Badge */}
          <div
            className="h-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 w-fit"
            style={{
              background: 'rgba(37,99,235,0.07)',
              border: '1px solid rgba(37,99,235,0.18)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: '#2563eb',
                animation: 'badge-pulse 2s ease-in-out infinite',
              }}
            />
            <span className="text-sm font-medium" style={{ color: '#2563eb' }}>
              Browser Extension · Free · Works on Zillow & Redfin
            </span>
          </div>

          {/* Headline — per-line curtain reveal */}
          <h1 className="text-5xl lg:text-[64px] xl:text-[72px] font-bold leading-[1.06] tracking-tight mb-7">
            <div className="overflow-hidden">
              <div className="h-line" style={{ color: '#0a1628' }}>Buy with</div>
            </div>
            <div className="overflow-hidden">
              <div className="h-line blue-text">clarity.</div>
            </div>
            <div className="overflow-hidden">
              <div className="h-line" style={{ color: '#94a3b8' }}>Not just hope.</div>
            </div>
          </h1>

          <p className="h-sub text-lg lg:text-xl leading-relaxed mb-10 max-w-lg" style={{ color: '#475569' }}>
            Truvala adds a decision layer to every listing you browse — surfacing buyer fit,
            reliability flags, hidden risks, and true ownership costs before you fall in love.
          </p>

          <div className="h-cta flex flex-wrap gap-4">
            {/* Primary CTA — solid vivid blue */}
            <a
              href="#waitlist"
              className="group relative flex items-center gap-3 px-7 py-4 rounded-full font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
              style={{ boxShadow: '0 4px 24px rgba(37,99,235,0.35)' }}
            >
              <span className="btn-blue absolute inset-0 rounded-full" />
              <span className="relative z-10 flex items-center gap-3">
                Add to Chrome — Free
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </span>
            </a>
            {/* Secondary */}
            <a
              href="#demo"
              className="flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-blue-50"
              style={{
                color: '#2563eb',
                border: '1.5px solid rgba(37,99,235,0.25)',
                background: 'white',
              }}
            >
              See it in action ↓
            </a>
          </div>

          <div className="h-badges mt-10 flex flex-wrap items-center gap-2">
            <span className="text-xs mr-1" style={{ color: '#94a3b8' }}>Works on</span>
            {['Zillow', 'Redfin', 'Realtor.com', 'Homes.com'].map(site => (
              <span
                key={site}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  color: '#2563eb',
                  background: 'rgba(37,99,235,0.07)',
                  border: '1px solid rgba(37,99,235,0.15)',
                }}
              >
                {site}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: Browser mockup — stays dark (it's software UI) ── */}
        <div className="h-mockup">
          <div className="mockup-float">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: '#0d1e3a',
                border: '1px solid rgba(37,99,235,0.2)',
                boxShadow:
                  '0 40px 100px rgba(14,42,99,0.2), 0 8px 32px rgba(14,42,99,0.12), 0 0 0 1px rgba(37,99,235,0.08)',
              }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3" style={{
                background: 'rgba(255,255,255,0.04)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                </div>
                <div className="flex-1 ml-3">
                  <div className="rounded px-3 py-1 text-xs text-center"
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#64748b' }}>
                    zillow.com/homedetails/4721-meadowbrook-lane-austin-tx
                  </div>
                </div>
              </div>

              <div className="flex min-h-0">
                {/* Listing side */}
                <div className="flex-1 p-5">
                  <div className="rounded-xl mb-4 relative overflow-hidden flex items-end p-3" style={{
                    height: 140,
                    background: 'linear-gradient(135deg, #0d2451 0%, #163d7a 40%, #112e60 100%)',
                  }}>
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-15">
                      <svg width="80" height="60" viewBox="0 0 80 60" fill="white">
                        <polygon points="40,5 75,30 5,30" />
                        <rect x="20" y="30" width="40" height="25" />
                        <rect x="33" y="38" width="14" height="17" fill="rgba(0,0,0,0.4)" />
                      </svg>
                    </div>
                    <span className="relative z-10 px-2 py-0.5 rounded text-xs font-medium"
                      style={{ background: 'rgba(217,119,6,0.2)', border: '1px solid rgba(217,119,6,0.45)', color: '#fbbf24' }}>
                      47 days on market
                    </span>
                  </div>
                  <p className="font-semibold text-sm text-white">4721 Meadowbrook Lane</p>
                  <p className="text-xs mb-3" style={{ color: '#475569' }}>Austin, TX 78749</p>
                  <p className="font-bold text-xl text-white mb-1">$672,000</p>
                  <p className="text-xs mb-1" style={{ color: '#475569' }}>4 bd · 3 ba · 2,100 sqft</p>
                  <p className="text-xs" style={{ color: '#475569' }}>Built 1987 · HOA $280/mo</p>
                </div>

                {/* Truvala panel */}
                <div className="w-44 p-4 flex flex-col" style={{
                  background: 'rgba(37,99,235,0.08)',
                  borderLeft: '1px solid rgba(37,99,235,0.15)',
                }}>
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="w-4 h-4 rounded" style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)' }} />
                    <span className="text-xs font-bold tracking-widest" style={{ color: '#60a5fa' }}>TRUVALA</span>
                  </div>

                  <div className="flex flex-col items-center mb-5">
                    <svg width="88" height="88" viewBox="0 0 88 88">
                      <defs>
                        <linearGradient id="heroScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%"   stopColor="#2563eb" />
                          <stop offset="60%"  stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                      <circle cx="44" cy="44" r="38" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="7" />
                      <circle cx="44" cy="44" r="38" fill="none"
                        stroke="url(#heroScoreGrad)" strokeWidth="7" strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE} strokeDashoffset={dashOffset}
                        transform="rotate(-90 44 44)" className="score-ring" />
                      <text x="44" y="40" textAnchor="middle" dominantBaseline="middle"
                        fill="white" fontSize="18" fontWeight="700" fontFamily="system-ui">{score}</text>
                      <text x="44" y="55" textAnchor="middle" dominantBaseline="middle"
                        fill="#64748b" fontSize="8" fontFamily="system-ui">BUYER FIT</text>
                    </svg>
                  </div>

                  <div className="space-y-2.5 flex-1">
                    {[
                      { label: 'Reliability', value: '3 flags', color: '#f59e0b' },
                      { label: 'Risks',        value: '2 high',  color: '#ef4444' },
                      { label: 'Hidden costs', value: '~$55k',   color: '#06b6d4' },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="flex items-center justify-between text-xs">
                        <span style={{ color: '#64748b' }}>{label}</span>
                        <span style={{ color }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 py-2 rounded-lg text-xs font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)' }}>
                    View Report
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs mt-4" style={{ color: '#cbd5e1' }}>
            Shown on any listing you view — no data import required
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs" style={{ color: '#cbd5e1' }}>Scroll to explore</span>
        <div style={{ animation: 'scroll-bounce 2.2s ease-in-out infinite' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
