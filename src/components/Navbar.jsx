import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#home', label: 'Home' },
    { href: '#projects', label: 'Work' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <div className="backdrop-blur-xl bg-slate-900/50 border border-white/10 rounded-2xl shadow-[0_0_60px_-15px_rgba(59,130,246,0.35)]">
          <div className="flex items-center justify-between px-6 py-4">
            <a href="#home" className="group inline-flex items-center gap-2">
              <div className="relative">
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-cyan-400 text-white shadow-lg"
                >
                  <Sparkles size={18} />
                </motion.span>
                <span className="absolute inset-0 rounded-lg blur-md opacity-40 bg-gradient-to-br from-fuchsia-500/60 via-indigo-500/60 to-cyan-400/60" />
              </div>
              <span className="font-semibold tracking-tight text-white text-lg">Your Name</span>
            </a>

            <div className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-4 py-2 text-sm text-slate-200 hover:text-white rounded-lg hover:bg-white/5 transition"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                className="ml-2 inline-flex items-center gap-2 rounded-lg bg-white/10 text-white px-4 py-2 text-sm border border-white/10 hover:bg-white/20 transition"
              >
                <span>Let’s talk</span>
              </a>
            </div>

            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/90"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden border-t border-white/10"
              >
                <div className="px-6 py-4 grid gap-2">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="px-4 py-3 rounded-lg text-white/90 hover:text-white hover:bg-white/5 transition"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
