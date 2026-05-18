'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const NAV_LINKS = [
  { label: 'Why Truvala', href: '#problem'  },
  { label: 'How It Works', href: '#features' },
  { label: 'Live Demo',    href: '#demo'     },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? {
        background: 'rgba(249,251,255,0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(37,99,235,0.08)',
        boxShadow: '0 1px 20px rgba(14,42,99,0.06)',
      } : {
        background: 'transparent',
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ padding: '0 32px', height: 60 }}
      >
        {/* Brand — flush left */}
        <a
          href="/"
          className="select-none inline-flex items-center gap-2.5 group"
          onClick={(e) => {
            e.preventDefault()
            if (window.location.pathname !== '/') {
              window.location.href = '/'
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
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
          <span className="font-bold tracking-tight" style={{ fontSize: 25, color: '#0a1628' }}>
            Truvala
          </span>
        </a>

        {/* Nav links — right side */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-medium transition-colors duration-200 hover:text-blue-600"
              style={{ fontSize: 16, color: '#4a5568' }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}
