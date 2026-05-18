'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'motion/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const problems = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'Listings tell you what they want you to know',
    body: 'A "beautifully updated kitchen" could mean new cabinet pulls. "Cozy" could mean 900 sqft. Listings are marketing, not objective reports.',
    accent: '#d97706',
    bg: 'rgba(217,119,6,0.08)',
    border: 'rgba(217,119,6,0.2)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    title: 'Risk hides in plain sight',
    body: '47 days on market. Original 1987 HVAC. Three permits, no final inspections. The signals exist in every listing — but you have to know where to look.',
    accent: '#dc2626',
    bg: 'rgba(220,38,38,0.07)',
    border: 'rgba(220,38,38,0.18)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75" />
      </svg>
    ),
    title: 'True costs are never listed',
    body: 'The price tag says $672,000. It doesn\'t say: roof in five years, HVAC now, $280/mo HOA forever, and $2,500 a year just to maintain what\'s there.',
    accent: '#2563eb',
    bg: 'rgba(37,99,235,0.07)',
    border: 'rgba(37,99,235,0.18)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
    title: "You don't know what you don't know",
    body: 'Most buyers ask the right questions after they\'ve moved in. Truvala tells you before you commit — the questions you didn\'t know to ask.',
    accent: '#7c3aed',
    bg: 'rgba(124,58,237,0.07)',
    border: 'rgba(124,58,237,0.18)',
  },
]

export default function Problem() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.prob-head', {
        y: 32, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.prob-head', start: 'top 84%' },
      })
      gsap.from('.prob-card', {
        y: 48, opacity: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out',
        scrollTrigger: { trigger: '.prob-grid', start: 'top 82%' },
      })
    },
    { scope: ref }
  )

  return (
    <section id="problem" ref={ref} className="section-base relative" style={{ background: 'var(--surface)' }}>
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      <div className="container relative z-10">
        <div className="prob-head text-center max-w-3xl mx-auto mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-5"
            style={{ background: 'rgba(220,38,38,0.09)', border: '1px solid rgba(220,38,38,0.2)', color: '#dc2626' }}
          >
            THE PROBLEM
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: '#0a1628' }}>
            Listings are designed to sell.{' '}
            <span style={{ color: '#94a3b8' }}>Not to inform.</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#64748b' }}>
            You're browsing homes with tools built for search — not decision-making.
            The information gap between buyer and seller has never been wider.
          </p>
        </div>

        <div className="prob-grid grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {problems.map((p) => (
            <motion.div
              key={p.title}
              className="prob-card rounded-2xl p-7 cursor-default"
              style={{ background: 'white', border: `1px solid ${p.border}`, boxShadow: '0 2px 16px rgba(14,42,99,0.05)' }}
              whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(14,42,99,0.1)' }}
              transition={{ duration: 0.25 }}
            >
              <div
                className="mb-5 w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: p.bg, color: p.accent }}
              >
                {p.icon}
              </div>
              <h3 className="font-semibold mb-3 text-base leading-snug" style={{ color: '#0a1628' }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
