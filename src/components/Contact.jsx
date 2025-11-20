import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">Let’s build</h2>
          <p className="mt-3 text-slate-300/80">Tell me about your idea and timeline. I’ll get back within 24 hours.</p>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-gradient-to-br from-fuchsia-500/25 via-indigo-500/25 to-cyan-400/25 blur-2xl" />
            <div className="relative grid gap-4">
              <input required placeholder="Name" className="w-full rounded-lg bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40" />
              <input required type="email" placeholder="Email" className="w-full rounded-lg bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40" />
              <textarea required rows={5} placeholder="Project details" className="w-full rounded-lg bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40" />
              <button className="inline-flex justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-cyan-400 px-5 py-3 text-sm font-medium text-white shadow-[0_0_40px_-10px_rgba(168,85,247,0.7)]">
                {sent ? 'Thanks! I will reply soon.' : 'Send message'}
              </button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid gap-4 content-start"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300/85">
              <div className="text-white font-medium">Capabilities</div>
              <ul className="mt-3 grid gap-2 text-sm list-disc list-inside">
                <li>WebGL/GLSL shader development</li>
                <li>Motion design and micro‑interactions</li>
                <li>3D web with Three.js and Spline</li>
                <li>Design systems and UI engineering</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300/85">
              <div className="text-white font-medium">Location</div>
              <div className="mt-2">Remote / Worldwide</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
