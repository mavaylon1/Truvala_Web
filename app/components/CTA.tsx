'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const TRUST_SIGNALS = [
  'Free forever for early users',
  'No account required',
  'No data sold. Ever.',
]

export default function CTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      inputRef.current?.focus()
      return
    }
    setError('')
    setSubmitted(true)
  }

  return (
    <section
      id="waitlist"
      className="section-base relative overflow-hidden"
      style={{
        background: 'linear-gradient(150deg, #0e2157 0%, #1a3580 30%, #2563eb 65%, #0b91b3 100%)',
      }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            top: '-25%', left: '-8%', width: 640, height: 640,
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            filter: 'blur(72px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: '-25%', right: '-8%', width: 560, height: 560,
            background: 'radial-gradient(circle, rgba(6,182,212,0.16) 0%, transparent 70%)',
            filter: 'blur(72px)',
          }}
        />
      </div>

      <div className="absolute inset-0 grid-bg pointer-events-none" style={{ opacity: 0.12 }} />

      <div className="container relative z-10">
        <motion.div
          className="text-center max-w-xl mx-auto"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Status badge */}
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: '#22d3ee', animation: 'badge-pulse 2.2s ease-in-out infinite' }}
            />
            <span className="text-sm font-medium text-white">Early access — free forever for founding users</span>
          </div>

          <h2
            className="font-bold leading-[1.08] tracking-tight mb-6 text-white"
            style={{ fontSize: 'clamp(40px, 5.5vw, 68px)' }}
          >
            Clarity starts{' '}
            <span style={{ color: '#93c5fd' }}>here.</span>
          </h2>

          <p className="text-lg leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Join thousands of homebuyers getting access to Truvala.
            Add it to Chrome free — works immediately on any listing you browse.
          </p>

          {/* Primary CTA */}
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg mb-8"
            style={{
              background: 'white',
              color: '#1e3a8a',
              boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
            }}
            whileHover={{ scale: 1.03, boxShadow: '0 12px 52px rgba(0,0,0,0.26)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add to Chrome — Free
          </motion.a>

          {/* Waitlist form */}
          <div
            className="rounded-2xl p-7 text-left"
            style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.16)' }}
          >
            <p className="text-sm font-semibold text-white mb-1">Can&apos;t install right now?</p>
            <p className="text-xs mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Join the waitlist — we&apos;ll notify you when Truvala is ready for your browser.
            </p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-1">
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError('') }}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                      style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: error ? '1px solid rgba(252,165,165,0.6)' : '1px solid rgba(255,255,255,0.22)',
                        color: 'white',
                      }}
                    />
                    {error && <p className="text-xs mt-1.5 text-red-300">{error}</p>}
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl text-sm font-semibold shrink-0 transition-all duration-200 active:scale-[0.97]"
                    style={{ background: 'white', color: '#1e3a8a' }}
                  >
                    Join Waitlist
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="flex items-center gap-3.5 p-4 rounded-xl"
                  style={{ background: 'rgba(16,185,129,0.14)', border: '1px solid rgba(16,185,129,0.28)' }}
                  initial={{ opacity: 0, scale: 0.96, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-xl shrink-0"
                    style={{ background: 'rgba(16,185,129,0.2)', color: '#4ade80' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">You&apos;re on the list.</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      We&apos;ll reach out as soon as Truvala is ready for you.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {TRUST_SIGNALS.map(s => (
              <span key={s} className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-20 pt-8 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div
              className="flex items-center justify-center rounded-xl"
              style={{ width: 26, height: 26, background: 'rgba(255,255,255,0.12)' }}
            >
              <svg width="14" height="12" viewBox="0 0 16 14" fill="none">
                <path d="M8 0.5L15.5 6V13.5H11V9H5V13.5H0.5V6L8 0.5Z" fill="white" />
              </svg>
            </div>
            <a
              href="/"
              className="font-bold text-lg text-white"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Truvala
            </a>
          </div>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
            &copy; 2025 Truvala. All rights reserved.
            &nbsp;·&nbsp; Not affiliated with Zillow, Redfin, or any MLS.
          </p>
        </div>
      </div>
    </section>
  )
}
