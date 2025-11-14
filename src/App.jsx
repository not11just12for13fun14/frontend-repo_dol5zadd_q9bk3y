import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowDown, ExternalLink } from 'lucide-react'

function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ]
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'backdrop-blur bg-white/60 border-b border-white/20 shadow-sm' : 'bg-transparent'}`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="font-semibold text-gray-900 tracking-tight text-lg">dev<span className="text-blue-600">.me</span></a>
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">{l.label}</a>
            ))}
            <a href="#contact" className="inline-flex items-center rounded-full bg-gray-900 text-white text-sm px-4 py-2 hover:bg-gray-800 transition-colors">Get in touch</a>
          </div>
          <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-base text-gray-700 py-2" onClick={() => setOpen(false)}>{l.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center rounded-full bg-gray-900 text-white text-sm px-4 py-2 w-fit">Get in touch</a>
          </div>
        </div>
      )}
    </header>
  )
}

function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2])

  return (
    <section id="home" className="relative min-h-[110vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.25),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white" />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-40 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900"
        >
          Hi, I’m <span className="text-blue-600">a Software Engineer</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-4 max-w-2xl text-lg text-gray-600"
        >
          I build fast, delightful web apps with modern stacks. Explore my work and get to know how I think about product, design, and engineering.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="mt-8 flex items-center gap-4"
        >
          <a href="#projects" className="inline-flex items-center rounded-full bg-gray-900 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
            View Projects
          </a>
          <a href="#contact" className="inline-flex items-center rounded-full border border-gray-300 bg-white text-gray-900 px-6 py-3 text-sm font-medium hover:bg-gray-50 transition-colors">
            Contact Me
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-24 flex items-center gap-6 text-gray-600"
        >
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-gray-900"><Github className="h-6 w-6"/></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-gray-900"><Linkedin className="h-6 w-6"/></a>
          <a href="#contact" className="hover:text-gray-900"><Mail className="h-6 w-6"/></a>
        </motion.div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-700 animate-bounce hidden sm:block">
          <ArrowDown className="h-6 w-6" />
        </div>
      </motion.div>
    </section>
  )
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-white to-white" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium text-blue-600 tracking-wide uppercase">{eyebrow}</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">{title}</h2>
        </motion.div>
        <div className="mt-8">
          {children}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="Who I am">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-2 text-gray-600 leading-7"
        >
          <p>
            I’m a full‑stack engineer focused on crafting polished experiences. I love TypeScript, React, Python, and cloud-native architectures.
          </p>
          <p className="mt-4">
            My work blends product thinking with strong engineering practices, shipping features that are accessible, performant, and maintainable.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-xl border bg-white p-6 shadow-sm"
        >
          <h3 className="font-semibold text-gray-900">Highlights</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li>• 5+ years building production apps</li>
            <li>• Systems design & DX obsessed</li>
            <li>• Performance and a11y focused</li>
          </ul>
        </motion.div>
      </div>
    </Section>
  )
}

function Projects() {
  const items = [
    {
      title: 'Realtime Collab Board',
      desc: 'A Figma-like canvas with CRDT syncing and multiplayer cursors.',
      link: '#',
      tags: ['React', 'WebSocket', 'CRDT']
    },
    {
      title: 'AI Doc Chat',
      desc: 'Chat with your PDFs using embeddings and function calling.',
      link: '#',
      tags: ['Python', 'FastAPI', 'RAG']
    },
    {
      title: '3D Product Configurator',
      desc: 'Customize materials and variants in real-time, in the browser.',
      link: '#',
      tags: ['Three.js', 'UX', 'Shaders']
    },
  ]
  return (
    <Section id="projects" eyebrow="Work" title="Selected Projects">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
            className="group rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{p.title}</h3>
              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
            </div>
            <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map(t => (
                <span key={t} className="text-xs rounded-full bg-blue-50 text-blue-700 px-2 py-1">{t}</span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  )
}

function Skills() {
  const skills = ['JavaScript/TypeScript', 'React', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'AWS', 'CI/CD']
  return (
    <Section id="skills" eyebrow="Toolkit" title="Skills & Stack">
      <div className="flex flex-wrap gap-3">
        {skills.map((s, i) => (
          <motion.span
            key={s}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.02 * i }}
            className="rounded-full border bg-white px-3 py-1 text-sm text-gray-700 shadow-sm"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <Section id="contact" eyebrow="Say hello" title="Let’s build something together">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border bg-white p-6 shadow-sm"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Name" />
            <input className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Email" type="email" />
          </div>
          <textarea className="mt-4 w-full rounded-md border px-3 py-2 text-sm" placeholder="Your message" rows="5" />
          <button className="mt-4 inline-flex items-center rounded-md bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-800">Send</button>
        </motion.form>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col justify-center gap-4 text-gray-600"
        >
          <p>
            I’m open to full-time roles and selective freelance work. The fastest way to reach me is via email or LinkedIn.
          </p>
          <div className="flex items-center gap-4 text-gray-700">
            <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 hover:text-gray-900"><Mail className="h-5 w-5"/> hello@example.com</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-gray-900"><Linkedin className="h-5 w-5"/> LinkedIn</a>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <footer className="border-t py-10 mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-sm text-gray-500">© {new Date().getFullYear()} Built with love and clean code.</div>
      </footer>
    </div>
  )
}
