import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import ShaderTile from './ShaderTile'
import { neonGrid, plasma, particleFlow } from './shaders'

const projects = [
  {
    title: 'Neon Grid Shader',
    description: 'An infinite neon grid with glow and subtle scanlines. Move your cursor to interact.',
    tags: ['WebGL', 'GLSL', 'PostFX'],
    link: '#',
    frag: neonGrid,
  },
  {
    title: 'Holographic Plasma',
    description: 'A holographic plasma field with color cycling and bloom-like accents.',
    tags: ['GLSL', 'Procedural'],
    link: '#',
    frag: plasma,
  },
  {
    title: 'Cosmic Particle Flow',
    description: 'Field-driven particle glow that responds to your mouse attractor.',
    tags: ['WebGL', 'Flow Field'],
    link: '#',
    frag: particleFlow,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">Selected work</h2>
          <p className="mt-3 text-slate-300/80">Live shader previews running directly on the tiles.</p>
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
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              {/* Shader preview */}
              <div className="relative w-full aspect-[4/3]">
                <ShaderTile frag={p.frag} className="absolute inset-0" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent mix-blend-plus-lighter" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6">
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

              {/* Glow accent */}
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-fuchsia-500/25 via-indigo-500/25 to-cyan-400/25 blur-2xl group-hover:scale-110 transition" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
