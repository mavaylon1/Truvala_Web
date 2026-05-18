'use client'

import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SCORE_TARGET = 78
const CIRCUMFERENCE = 2 * Math.PI * 38

const SITE_BADGES = ['Zillow', 'Redfin', 'Realtor.com', 'Homes.com']

function BrowserMockup({ score }: { score: number }) {
  const dashOffset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE

  return (
    <div
      className="relative rounded-[18px] overflow-hidden"
      style={{
        background: '#0b1a35',
        border: '1px solid rgba(96,165,250,0.15)',
        boxShadow:
          '0 40px 90px rgba(5,15,40,0.22), 0 8px 32px rgba(14,42,99,0.14), 0 0 0 1px rgba(37,99,235,0.06)',
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <div className="flex-1 ml-2">
          <div
            className="rounded-md px-3 py-1.5 text-xs text-center truncate"
            style={{ background: 'rgba(255,255,255,0.04)', color: '#5b7aaa' }}
          >
            zillow.com/homedetails/4721-meadowbrook-lane
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex">
        {/* Listing col */}
        <div className="flex-1 p-5">
          {/* Photo placeholder */}
          <div
            className="rounded-xl mb-4 relative overflow-hidden"
            style={{
              height: 130,
              background: 'linear-gradient(140deg, #0d2451 0%, #133575 60%, #0f2d62 100%)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0.12 }}>
              <svg width="90" height="68" viewBox="0 0 90 68" fill="white">
                <polygon points="45,4 84,30 6,30" />
                <rect x="17" y="30" width="56" height="34" />
                <rect x="37" y="40" width="16" height="24" fill="rgba(0,0,0,0.35)" />
                <rect x="22" y="36" width="12" height="10" fill="rgba(255,255,255,0.2)" />
                <rect x="56" y="36" width="12" height="10" fill="rgba(255,255,255,0.2)" />
              </svg>
            </div>
            <div className="absolute bottom-3 left-3 flex gap-2">
              <span
                className="px-2 py-0.5 rounded text-xs font-medium"
                style={{
                  background: 'rgba(251,191,36,0.14)',
                  border: '1px solid rgba(251,191,36,0.35)',
                  color: '#fbbf24',
                }}
              >
                47 days on market
              </span>
              <span
                className="px-2 py-0.5 rounded text-xs font-medium"
                style={{
                  background: 'rgba(239,68,68,0.14)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: '#f87171',
                }}
              >
                Price reduced 2×
              </span>
            </div>
          </div>

          <p className="font-semibold text-sm text-white">4721 Meadowbrook Lane</p>
          <p className="text-xs mb-3" style={{ color: '#5b7aaa' }}>Austin, TX 78749</p>
          <p className="font-bold text-xl text-white mb-1">$672,000</p>
          <p className="text-xs" style={{ color: '#5b7aaa' }}>4 bd · 3 ba · 2,100 sqft · Built 1987</p>
        </div>

        {/* Truvala side panel */}
        <div
          className="w-44 p-4 flex flex-col"
          style={{
            background: 'rgba(37,99,235,0.07)',
            borderLeft: '1px solid rgba(96,165,250,0.1)',
          }}
        >
          <div className="flex items-center gap-1.5 mb-5">
            <div
              className="w-4 h-4 rounded-[4px]"
              style={{ background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)' }}
            />
            <span
              className="text-[10px] font-bold tracking-[0.18em]"
              style={{ color: '#60a5fa' }}
            >
              TRUVALA
            </span>
          </div>

          {/* Score ring */}
          <div className="flex flex-col items-center mb-5">
            <svg width="88" height="88" viewBox="0 0 88 88">
              <defs>
                <linearGradient id="heroScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#2563eb" />
                  <stop offset="60%"  stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <circle cx="44" cy="44" r="38" fill="none" stroke="rgba(96,165,250,0.1)" strokeWidth="7" />
              <circle
                cx="44" cy="44" r="38"
                fill="none"
                stroke="url(#heroScoreGrad)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 44 44)"
                className="score-ring"
              />
              <text x="44" y="40" textAnchor="middle" dominantBaseline="middle"
                fill="white" fontSize="18" fontWeight="700" fontFamily="var(--font-geist-sans, system-ui)">
                {score}
              </text>
              <text x="44" y="55" textAnchor="middle" dominantBaseline="middle"
                fill="#5b7aaa" fontSize="8" fontFamily="var(--font-geist-sans, system-ui)">
                BUYER FIT
              </text>
            </svg>
          </div>

          <div className="space-y-2.5 flex-1">
            {[
              { label: 'Reliability', value: '3 flags', color: '#f59e0b' },
              { label: 'Risks',       value: '2 high',  color: '#ef4444' },
              { label: 'Costs',       value: '~$55k',   color: '#22d3ee' },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between text-xs">
                <span style={{ color: '#5b7aaa' }}>{label}</span>
                <span style={{ color }}>{value}</span>
              </div>
            ))}
          </div>

          <button
            className="w-full mt-5 py-2 rounded-lg text-xs font-semibold text-white transition-all duration-200 active:scale-[0.97]"
            style={{ background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)' }}
          >
            View Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [score, setScore] = useState(0)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const introDelay = prefersReduced ? 0.2 : 3.3

      const tl = gsap.timeline({ delay: introDelay })
      tl
        .from('.h-eyebrow', { y: 18, opacity: 0, duration: 0.5, ease: 'power3.out' })
        .from('.h-line-1',  { yPercent: 110, duration: 0.85, ease: 'power4.out' }, '-=0.2')
        .from('.h-line-2',  { yPercent: 110, duration: 0.85, ease: 'power4.out' }, '-=0.7')
        .from('.h-line-3',  { yPercent: 110, duration: 0.85, ease: 'power4.out' }, '-=0.7')
        .from('.h-sub',     { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
        .from('.h-ctas',    { y: 14, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.38')
        .from('.h-sites',   { y: 10, opacity: 0, duration: 0.45 }, '-=0.25')
        .from('.h-mockup',  { y: 56, opacity: 0, duration: 1.1, ease: 'power3.out' }, '-=0.9')

      if (prefersReduced) return

      gsap.to('.hero-orb-1', {
        y: -100, ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 2 },
      })
      gsap.to('.hero-orb-2', {
        y: -60, ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 3 },
      })
    },
    { scope: containerRef }
  )

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startDelay = prefersReduced ? 400 : 4200
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center pt-28 pb-16"
      style={{ background: 'var(--background)' }}
    >
      {/* Background orbs — own overflow clip so wave can escape section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hero-orb-1 absolute" style={{ top: '-18%', left: '-8%' }}>
          <div
            className="rounded-full"
            style={{
              width: 860, height: 860,
              background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, rgba(59,130,246,0.03) 50%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'orb-1 22s ease-in-out infinite',
            }}
          />
        </div>
        <div className="hero-orb-2 absolute" style={{ top: '10%', right: '-12%' }}>
          <div
            className="rounded-full"
            style={{
              width: 700, height: 700,
              background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, rgba(34,211,238,0.03) 50%, transparent 70%)',
              filter: 'blur(72px)',
              animation: 'orb-2 26s ease-in-out infinite',
            }}
          />
        </div>
        <div className="absolute" style={{ bottom: '-10%', left: '35%' }}>
          <div
            className="rounded-full"
            style={{
              width: 500, height: 500,
              background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)',
              filter: 'blur(64px)',
              animation: 'orb-3 18s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" style={{ opacity: 0.7 }} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-16 xl:gap-24 items-center">

          {/* ── Left: Copy ── */}
          <div>
            {/* Eyebrow badge */}
            <div
              className="h-eyebrow inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(37,99,235,0.06)',
                border: '1px solid rgba(37,99,235,0.16)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: '#2563eb', animation: 'badge-pulse 2.2s ease-in-out infinite' }}
              />
              <span className="text-sm font-medium" style={{ color: '#2563eb' }}>
                Browser Extension · Free · Works on Zillow &amp; Redfin
              </span>
            </div>

            {/* Headline — clip reveal per line */}
            <h1
              className="font-bold leading-[1.05] tracking-tight mb-7"
              style={{ fontSize: 'clamp(48px, 6vw, 78px)', color: '#0a1628' }}
            >
              <div className="overflow-hidden">
                <div className="h-line-1">Buy with</div>
              </div>
              <div className="overflow-hidden">
                <div className="h-line-2" style={{ color: '#2563eb' }}>clarity.</div>
              </div>
              <div className="overflow-hidden">
                <div className="h-line-3" style={{ color: '#94a3b8' }}>Not just hope.</div>
              </div>
            </h1>

            <p
              className="h-sub text-lg lg:text-xl leading-relaxed mb-10 max-w-[480px]"
              style={{ color: '#4a5568' }}
            >
              Truvala adds a decision layer to every listing you browse — surfacing
              buyer fit, reliability flags, hidden risks, and true ownership costs
              before you fall in love.
            </p>

            {/* CTAs */}
            <div className="h-ctas flex flex-wrap gap-4">
              <a
                href="#waitlist"
                className="flex items-center gap-3 px-7 py-4 rounded-full font-semibold text-sm text-white btn-animated"
                style={{ boxShadow: '0 4px 20px rgba(37,99,235,0.32)' }}
              >
                Add to Chrome — Free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#demo"
                className="flex items-center gap-2.5 px-7 py-4 rounded-full font-semibold text-sm transition-all duration-200 hover:bg-blue-50 active:scale-[0.97]"
                style={{
                  color: '#2563eb',
                  border: '1.5px solid rgba(37,99,235,0.22)',
                  background: 'rgba(255,255,255,0.8)',
                }}
              >
                See it in action
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            {/* Platform badges */}
            <div className="h-sites mt-9 flex flex-wrap items-center gap-2">
              <span className="text-xs mr-1" style={{ color: '#94a3b8' }}>Works on</span>
              {SITE_BADGES.map(site => (
                <span
                  key={site}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    color: '#2563eb',
                    background: 'rgba(37,99,235,0.06)',
                    border: '1px solid rgba(37,99,235,0.14)',
                  }}
                >
                  {site}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Browser mockup ── */}
          <div className="h-mockup">
            <div className="mockup-float">
              <BrowserMockup score={score} />
            </div>
            <p className="text-center text-xs mt-4" style={{ color: '#94a3b8' }}>
              Shown on any listing you browse — no import required
            </p>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs" style={{ color: '#cbd5e1' }}>Scroll to explore</span>
        <div style={{ animation: 'scroll-bounce 2.4s ease-in-out infinite' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
