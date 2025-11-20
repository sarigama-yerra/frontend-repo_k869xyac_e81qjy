import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlays to enhance contrast without blocking interactions */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,6,23,0.15),rgba(2,6,23,0.85))]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-950" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-28 w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <div className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_12px_3px_rgba(232,121,249,0.7)]" />
            Available for freelance projects
          </div>

          <h1 className="mt-5 text-4xl sm:text-6xl font-semibold tracking-tight text-white">
            Building cyberpunk-inspired experiences with motion and shaders
          </h1>
          <p className="mt-5 text-slate-200/80 max-w-xl">
            I’m a creative developer focusing on immersive web interfaces, WebGL shaders, and silky-smooth interactions. Let’s craft something otherworldly.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-cyan-400 text-white px-5 py-3 text-sm shadow-[0_0_40px_-10px_rgba(168,85,247,0.7)]">
              View work
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-slate-100 text-sm hover:bg-white/10 transition">
              Get in touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
