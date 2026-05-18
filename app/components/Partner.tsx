'use client'

import { motion } from 'motion/react'

const points = [
  {
    title: 'Agent-additive, not agent-replacement',
    body: 'Truvala identifies what to verify. Your agent tells you how.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: 'Shareable reports',
    body: 'Send your Truvala report to your agent before a showing. Arrive prepared.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    title: 'No data access required',
    body: 'Truvala works from the listing itself. No MLS access, no agent credentials.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
]

export default function Partner() {
  return (
    <section className="section-base" style={{ background: 'var(--background)' }}>
      <div className="container">
        <motion.div
          className="max-w-4xl mx-auto rounded-3xl p-10 lg:p-16 relative overflow-hidden"
          style={{
            background: 'white',
            border: '1px solid rgba(37,99,235,0.1)',
            boxShadow: '0 8px 48px rgba(14,42,99,0.07)',
          }}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background accent */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)',
              filter: 'blur(48px)',
              transform: 'translate(30%, -30%)',
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.12em] mb-6"
                style={{ background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.18)', color: '#2563eb' }}
              >
                FOR AGENTS &amp; PARTNERS
              </span>
              <h2
                className="font-bold leading-snug mb-5"
                style={{ fontSize: 'clamp(24px, 3vw, 38px)', color: '#0a1628' }}
              >
                Built for buyers.
                <br />
                Welcomed by agents.
              </h2>
              <p className="text-base leading-relaxed" style={{ color: '#64748b' }}>
                Truvala doesn&apos;t replace your agent — it makes you a better client.
                Buyers who use Truvala arrive with smarter questions, cleaner offers,
                and fewer regrets.
              </p>
            </div>

            <div className="space-y-4">
              {points.map(({ icon, title, body }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-xl transition-all duration-200 hover:shadow-sm"
                  style={{ background: 'rgba(37,99,235,0.035)', border: '1px solid rgba(37,99,235,0.08)' }}
                >
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
                    style={{ background: 'rgba(37,99,235,0.1)', color: '#2563eb' }}
                  >
                    {icon}
                  </span>
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
