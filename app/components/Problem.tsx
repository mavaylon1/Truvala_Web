'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const problems = [
  {
    num: '01',
    tag: 'Listing Language',
    title: 'Listings tell you what they want you to know.',
    body: 'A "beautifully updated kitchen" could mean new cabinet pulls. "Cozy" could mean 900 sqft. Listings are marketing documents, not objective reports.',
    accent: '#d97706',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    num: '02',
    tag: 'Hidden Signals',
    title: 'Risk hides in plain sight.',
    body: '47 days on market. Original 1987 HVAC. Three permits, no final inspections. The signals exist in every listing — but you have to know where to look.',
    accent: '#dc2626',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    num: '03',
    tag: 'True Cost',
    title: 'The real price is never on the listing.',
    body: 'The price tag says $672,000. It doesn\'t say: roof in five years, HVAC now, $280/mo HOA forever, and $2,500 a year to maintain what\'s already there.',
    accent: '#2563eb',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75" />
      </svg>
    ),
  },
  {
    num: '04',
    tag: 'Decision Gap',
    title: 'You don\'t know what you don\'t know.',
    body: 'Most buyers ask the right questions after they\'ve moved in. Truvala tells you before you commit — the questions you didn\'t know to ask, surfaced automatically.',
    accent: '#7c3aed',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
]

export default function Problem() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.prob-head', {
        y: 28, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.prob-head', start: 'top 84%' },
      })
      gsap.from('.prob-row', {
        x: -24, opacity: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.prob-list', start: 'top 80%' },
      })
    },
    { scope: ref }
  )

  return (
    <section id="problem" ref={ref} className="section-base relative" style={{ background: 'rgba(238, 243, 255, 0.82)' }}>
      <div className="absolute inset-0 grid-bg pointer-events-none" style={{ opacity: 0.5 }} />

      <div className="container relative z-10">
        {/* Header */}
        <div className="prob-head max-w-2xl mb-16">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.12em] mb-6"
            style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.18)', color: '#dc2626' }}
          >
            THE PROBLEM
          </span>
          <h2
            className="font-bold leading-[1.1] tracking-tight mb-5"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: '#0a1628' }}
          >
            Listings are designed<br /> to sell. Not to inform.
          </h2>
          <p className="text-lg leading-relaxed max-w-[480px]" style={{ color: '#64748b' }}>
            You&apos;re browsing homes with tools built for search, not decision-making.
            The information gap between buyer and seller has never been wider.
          </p>
        </div>

        {/* Editorial problem list */}
        <div className="prob-list" style={{ borderTop: '1px solid rgba(14,42,99,0.08)' }}>
          {problems.map((p, i) => (
            <div
              key={p.num}
              className="prob-row grid gap-8 lg:gap-16 py-12 lg:py-14"
              style={{
                gridTemplateColumns: 'clamp(56px,7vw,96px) 1fr',
                borderBottom: '1px solid rgba(14,42,99,0.07)',
              }}
            >
              {/* Number column */}
              <div className="pt-1">
                <span
                  className="font-bold tabular-nums block"
                  style={{
                    fontSize: 'clamp(52px, 6vw, 80px)',
                    lineHeight: 1,
                    color: `rgba(10,22,40,0.06)`,
                    transform: 'translateY(-4px)',
                    display: 'block',
                  }}
                >
                  {p.num}
                </span>
              </div>

              {/* Content column */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex items-center justify-center w-7 h-7 rounded-lg"
                    style={{ background: `${p.accent}14`, color: p.accent }}
                  >
                    {p.icon}
                  </span>
                  <span
                    className="text-xs font-semibold tracking-[0.1em]"
                    style={{ color: p.accent }}
                  >
                    {p.tag}
                  </span>
                </div>
                <h3
                  className="font-bold leading-snug"
                  style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', color: '#0a1628' }}
                >
                  {p.title}
                </h3>
                <p className="text-base leading-relaxed max-w-[580px]" style={{ color: '#64748b' }}>
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
