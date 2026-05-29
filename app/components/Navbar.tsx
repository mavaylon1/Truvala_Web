'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'What is Truvala',   href: '/what-is-truvala'   },
  { label: 'Who are we',        href: '/who-are-we'        },
  { label: 'Upcoming Products', href: '/upcoming-products' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

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
      <div className="flex items-center gap-6" style={{ padding: '0 32px', height: 60 }}>
        {/* Brand */}
        <Link href="/" className="select-none inline-flex items-center gap-2.5 group flex-shrink-0">
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
          <span className="font-bold tracking-tight" style={{ fontSize: 22, color: '#0a1628' }}>
            Truvala
          </span>
        </Link>

        {/* Divider */}
        <div style={{ width: 1, height: 18, background: 'rgba(37,99,235,0.18)', flexShrink: 0 }} />

        {/* Nav links — left side */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href
            return (
              <Link
                key={label}
                href={href}
                className="font-medium transition-all duration-200 hover:text-blue-600 relative"
                style={{ fontSize: 15, color: isActive ? '#2563eb' : '#4a5568' }}
              >
                {label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: 2,
                      borderRadius: 1,
                      background: '#2563eb',
                    }}
                  />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </motion.header>
  )
}
