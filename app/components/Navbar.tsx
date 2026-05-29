'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const NAV_LINKS = [
  { label: 'What is Truvala',   href: '#what-is-truvala'   },
  { label: 'Who are we',        href: '#who-are-we'        },
  { label: 'Upcoming Products', href: '#upcoming-products' },
]

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [activeSection, setActive]  = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['what-is-truvala', 'who-are-we', 'upcoming-products']
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-30% 0px -60% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const close = () => setMenuOpen(false)

  const glassBg = {
    background: 'rgba(249,251,255,0.95)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderBottom: '1px solid rgba(37,99,235,0.08)',
    boxShadow: '0 1px 20px rgba(14,42,99,0.06)',
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled || menuOpen ? glassBg : { background: 'transparent' }}
    >
      <div className="flex items-center justify-between" style={{ padding: '0 24px', height: 60 }}>

        {/* Left: logo + desktop nav */}
        <div className="flex items-center gap-5">
          <a href="#" onClick={close} className="select-none inline-flex items-center gap-2.5 group flex-shrink-0">
            <div
              className="flex items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-[1.05]"
              style={{
                width: 32, height: 32,
                background: 'linear-gradient(140deg, #2563eb 0%, #1e3a8a 100%)',
                boxShadow: '0 2px 10px rgba(37,99,235,0.3)',
                flexShrink: 0,
              }}
            >
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                <path d="M8 0.5L15.5 6V13.5H11V9H5V13.5H0.5V6L8 0.5Z" fill="white" />
              </svg>
            </div>
            <span className="font-bold tracking-tight" style={{ fontSize: 22, color: '#0a1628' }}>Truvala</span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-5">
            <div style={{ width: 1, height: 18, background: 'rgba(37,99,235,0.18)', flexShrink: 0 }} />
            <nav className="flex items-center gap-6">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = activeSection === href.slice(1)
                return (
                  <a
                    key={label}
                    href={href}
                    className="font-medium transition-colors duration-200 hover:text-blue-600 relative"
                    style={{ fontSize: 15, color: isActive ? '#2563eb' : '#4a5568' }}
                  >
                    {label}
                    {isActive && (
                      <span style={{
                        position: 'absolute', bottom: -3, left: 0, right: 0,
                        height: 2, borderRadius: 1, background: '#2563eb',
                      }} />
                    )}
                  </a>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex items-center justify-center"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle navigation"
          style={{ width: 36, height: 36, borderRadius: 8, color: '#0a1628' }}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="5" y1="5" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="15" y1="5" x2="5" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="3" y1="6"  x2="17" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden"
            style={{ padding: '8px 24px 20px', borderTop: '1px solid rgba(37,99,235,0.08)' }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={close}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  fontSize: 17,
                  fontWeight: 600,
                  color: '#0a1628',
                  borderBottom: '1px solid rgba(37,99,235,0.07)',
                }}
              >
                {label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
