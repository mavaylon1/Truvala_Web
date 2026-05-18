'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? {
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(37,99,235,0.1)',
        boxShadow: '0 2px 20px rgba(14,42,99,0.06)',
      } : {}}
    >
      <div className="container flex items-center justify-between py-6">
        <a href="#" className="blue-text text-2xl font-bold tracking-wide select-none">
          Truvala
        </a>

        <div className="hidden md:flex items-center gap-10 text-base font-medium" style={{ color: '#475569' }}>
          {[
            { label: 'Why Truvala', href: '#problem'  },
            { label: 'See It Work',  href: '#demo'     },
            { label: 'Features',     href: '#features' },
            { label: 'Pricing',      href: '#waitlist' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="transition-colors duration-200 hover:text-blue-600"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
