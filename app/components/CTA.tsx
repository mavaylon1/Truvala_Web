'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

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
        background: 'linear-gradient(135deg, #0e2157 0%, #1e3a8a 35%, #2563eb 65%, #0891b2 100%)',
      }}
    >
      {/* Soft orbs on the dark blue section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{
          top: '-20%', left: '-10%', width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div className="absolute rounded-full" style={{
          bottom: '-20%', right: '-10%', width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
      </div>
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22d3ee' }} />
            <span className="text-sm font-medium text-white">Early access — free forever for founding users</span>
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            Clarity starts{' '}
            <span style={{
              background: 'linear-gradient(135deg, #bfdbfe, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              here.
            </span>
          </h2>

          <p className="text-lg leading-relaxed mb-10" style={{ color: 'rgba(255,255,255,0.72)' }}>
            Join thousands of homebuyers getting access to Truvala.
            Add it to Chrome free — works immediately on any listing you browse.
          </p>

          {/* Primary CTA */}
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg mb-8 text-blue-900"
            style={{
              background: 'white',
              boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
            }}
            whileHover={{ scale: 1.03, boxShadow: '0 12px 56px rgba(0,0,0,0.28)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            Add to Chrome — Free
          </motion.a>

          {/* Waitlist form */}
          <div
            className="rounded-2xl p-8 text-left"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}
          >
            <p className="text-sm font-semibold text-white mb-1">Can&apos;t install right now?</p>
            <p className="text-xs mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Join the waitlist — we&apos;ll notify you when Truvala is ready for your browser.
            </p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex-1">
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setError('') }}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        border: error ? '1px solid rgba(252,165,165,0.7)' : '1px solid rgba(255,255,255,0.25)',
                        color: 'white',
                      }}
                    />
                    {error && <p className="text-xs mt-1.5 text-red-300">{error}</p>}
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl text-sm font-semibold shrink-0"
                    style={{ background: 'white', color: '#1e3a8a' }}
                  >
                    Join Waitlist
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="flex items-center gap-3 p-4 rounded-xl"
                  style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-white">You&apos;re on the list.</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>We&apos;ll reach out as soon as Truvala is ready for you.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {['✓ Free forever for early users', '✓ No account required', '✓ No data sold. Ever.'].map(s => (
              <span key={s} className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{s}</span>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-20 pt-8 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-2xl font-bold mb-2 text-white">Truvala</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © 2025 Truvala. All rights reserved.
            &nbsp;·&nbsp; Not affiliated with Zillow, Redfin, or any MLS.
          </p>
        </div>
      </div>
    </section>
  )
}
