import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'Neon Grid Shader',
    description: 'A customizable WebGL fragment shader that renders an infinite neon grid with chromatic aberration and bloom post-processing.',
    tags: ['WebGL', 'GLSL', 'PostFX'],
    link: '#'
  },
  {
    title: 'Holographic UI Kit',
    description: 'A motion-first component kit inspired by sci‑fi HUDs with layered glass, glow, and parallax interactions.',
    tags: ['Framer Motion', 'Design', 'UI'],
    link: '#'
  },
  {
    title: 'Cosmic Particles',
    description: 'GPU-accelerated particle playground with field equations and spline-controlled camera animations.',
    tags: ['Three.js', 'GPGPU', 'Shaders'],
    link: '#'
  }
]

export default function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">Selected work</h2>
          <p className="mt-3 text-slate-300/80">A mix of shader experiments and interface explorations.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
            >
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-fuchsia-500/25 via-indigo-500/25 to-cyan-400/25 blur-2xl group-hover:scale-110 transition" />
              <div className="relative">
                <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                  {p.title}
                  <ExternalLink size={16} className="text-white/70" />
                </h3>
                <p className="mt-2 text-sm text-slate-300/80">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">{t}</span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
