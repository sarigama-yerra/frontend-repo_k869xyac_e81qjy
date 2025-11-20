import { motion } from 'framer-motion'

export default function About() {
  const items = [
    { k: 'Years Experience', v: '6+' },
    { k: 'Projects Shipped', v: '40+' },
    { k: 'Shader Experiments', v: '120+' },
  ]

  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white">About me</h2>
          <p className="mt-4 text-slate-300/85">
            I blend art and engineering to create interfaces that feel alive. My toolkit spans WebGL/GLSL,
            Three.js, and modern React. I obsess over timing curves, micro‑interactions, and tactile feedback.
          </p>
          <p className="mt-3 text-slate-300/80">
            Beyond the screen, I explore generative art and audio‑reactive visuals. I’m currently experimenting with
            real‑time shaders that respond to cursor movement and device motion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-3 gap-4"
        >
          {items.map((it, i) => (
            <div key={it.k} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-5 py-6">
              <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-gradient-to-br from-fuchsia-500/20 via-indigo-500/20 to-cyan-400/20 blur-2xl" />
              <div className="relative">
                <div className="text-2xl font-semibold text-white">{it.v}</div>
                <div className="text-xs text-white/70 mt-1">{it.k}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
