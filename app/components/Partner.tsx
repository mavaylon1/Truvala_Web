'use client'

import { motion } from 'motion/react'

export default function Partner() {
  return (
    <section className="section-base" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <motion.div
          className="max-w-4xl mx-auto rounded-3xl p-10 lg:p-16 relative overflow-hidden"
          style={{
            background: 'white',
            border: '1px solid rgba(37,99,235,0.14)',
            boxShadow: '0 8px 48px rgba(14,42,99,0.08)',
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none" style={{
            background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)',
            filter: 'blur(40px)',
            transform: 'translate(30%, -30%)',
          }} />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-5"
                style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)', color: '#2563eb' }}
              >
                FOR AGENTS & PARTNERS
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-5 leading-tight" style={{ color: '#0a1628' }}>
                Built for buyers.<br />Welcomed by agents.
              </h2>
              <p className="text-base leading-relaxed" style={{ color: '#64748b' }}>
                Truvala doesn&apos;t replace your agent — it makes you a better client.
                Buyers who use Truvala arrive with smarter questions, cleaner offers,
                and fewer regrets. That&apos;s a better transaction for everyone.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: '🤝',
                  title: 'Agent-additive, not agent-replacement',
                  body: 'Truvala identifies what to verify. Your agent tells you how.',
                },
                {
                  icon: '📋',
                  title: 'Shareable reports',
                  body: 'Send your Truvala report to your agent before a showing. Arrive prepared.',
                },
                {
                  icon: '🔑',
                  title: 'No data access required',
                  body: 'Truvala works from the listing itself. No MLS access, no agent credentials.',
                },
              ].map(({ icon, title, body }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-xl"
                  style={{ background: 'rgba(37,99,235,0.04)', border: '1px solid rgba(37,99,235,0.1)' }}
                >
                  <span className="text-2xl">{icon}</span>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: '#0a1628' }}>{title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
