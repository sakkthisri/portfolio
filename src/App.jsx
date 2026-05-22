import { useEffect, useRef, useState } from 'react'
import './App.css'

// ── Intersection Observer hook ──────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

// ── Profile Photo — served from public/profile.jpg ─────────────────────────
function ProfilePhoto({ size = 'lg', className = '' }) {
  const [err, setErr] = useState(false)
  const sizes = {
    sm: 'w-24 h-24 text-4xl',
    md: 'w-36 h-36 text-5xl',
    lg: 'w-48 h-48 text-7xl',
  }
  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden border-2 border-[#38bdf8]/50 shadow-xl shadow-[#38bdf8]/15 ${className}`}>
      {!err ? (
        <img
          src="/profile.jpg"
          alt="Sakkthi Sri S"
          className="w-full h-full object-cover object-top"
          onError={() => setErr(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#38bdf8]/20 to-[#818cf8]/20 flex items-center justify-center">
          <span className={sizes[size].split(' ')[2]}>👩‍💻</span>
        </div>
      )}
    </div>
  )
}

// ── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const links = ['About', 'Skills', 'Projects', 'Achievements', 'Certifications', 'Contact']

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0f172a]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="text-[#38bdf8] font-bold text-xl tracking-tight">SS</a>
        <ul className="hidden md:flex gap-8">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="nav-link text-gray-300 hover:text-[#38bdf8] text-sm font-medium">{l}</a>
            </li>
          ))}
        </ul>
        <button className="md:hidden text-gray-300 hover:text-[#38bdf8]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#1e293b] border-t border-[#334155] px-6 py-4">
          <ul className="flex flex-col gap-4">
            {links.map(l => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className="text-gray-300 hover:text-[#38bdf8] text-sm font-medium" onClick={() => setMenuOpen(false)}>{l}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

// ── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const [typed, setTyped] = useState('')
  const full = 'AI/ML Enthusiast | AWS DevOps Learner | Beginner Python Developer'
  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      setTyped(full.slice(0, i + 1))
      i++
      if (i >= full.length) clearInterval(t)
    }, 40)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 pt-24 pb-16"
    >
      {/* Background radial glow — centred */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] bg-[#38bdf8]/5 rounded-full blur-3xl" />
      </div>

      {/* ── Centred content column ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl mx-auto gap-7">

        {/* 1 · Welcome badge with decorative side lines */}
        <div className="animate-fade-in-up flex items-center gap-3 w-full justify-center">
          <span className="flex-1 max-w-[72px] h-px bg-gradient-to-r from-transparent to-[#38bdf8]/70" />
          <span className="text-[#38bdf8] text-[11px] font-bold tracking-[0.22em] uppercase whitespace-nowrap select-none">
            Welcome to my portfolio
          </span>
          <span className="flex-1 max-w-[72px] h-px bg-gradient-to-l from-transparent to-[#38bdf8]/70" />
        </div>

        {/* 2 · Profile photo — circular with glow */}
        <div className="animate-fade-in-up delay-100 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-[#38bdf8]/25 to-[#818cf8]/25 blur-lg" />
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-2 border-[#38bdf8]/50 shadow-2xl shadow-[#38bdf8]/20">
              <img
                src="/profile.jpg"
                alt="Sakkthi Sri S"
                className="w-full h-full object-cover object-top"
                onError={e => { e.currentTarget.style.display='none'; e.currentTarget.nextSibling.style.display='flex' }}
              />
              <div className="hidden w-full h-full bg-gradient-to-br from-[#38bdf8]/20 to-[#818cf8]/20 items-center justify-center text-6xl">
                👩‍💻
              </div>
            </div>
          </div>
        </div>

        {/* 3 · Name */}
        <div className="animate-fade-in-up delay-200 text-center px-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Hi, I'm{' '}
            <span className="gradient-text">Sakkthi Sri S</span>
          </h1>
        </div>

        {/* 4 · Typewriter subtitle */}
        <div className="animate-fade-in-up delay-300 text-center min-h-[1.6rem] px-2">
          <p className="text-gray-400 text-sm sm:text-base md:text-lg font-medium">
            {typed}
            <span className="animate-blink text-[#38bdf8] ml-0.5">|</span>
          </p>
        </div>

        {/* 5 · Accent divider */}
        <div className="animate-fade-in-up delay-400 w-14 h-0.5 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#818cf8]" />

        {/* 6 · Buttons */}
        <div className="animate-fade-in-up delay-500 flex flex-wrap gap-3 justify-center w-full px-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="glow-btn bg-[#38bdf8] text-[#0f172a] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#7dd3fc] text-sm transition-all duration-300"
          >
            📄 View My Resume
          </a>
          <a href="https://github.com/sakkthisri" target="_blank" rel="noreferrer"
            className="glow-btn flex items-center gap-2 border border-[#38bdf8] text-[#38bdf8] px-5 py-2.5 rounded-lg hover:bg-[#38bdf8]/10 text-sm transition-all duration-300">
            <GithubIcon /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/sakkthi-sri-1880a8326/" target="_blank" rel="noreferrer"
            className="glow-btn flex items-center gap-2 border border-[#38bdf8] text-[#38bdf8] px-5 py-2.5 rounded-lg hover:bg-[#38bdf8]/10 text-sm transition-all duration-300">
            <LinkedinIcon /> LinkedIn
          </a>
          <a href="https://www.geeksforgeeks.org/profile/sakkthigclr?tab=activity" target="_blank" rel="noreferrer"
            className="glow-btn flex items-center gap-2 border border-[#38bdf8] text-[#38bdf8] px-5 py-2.5 rounded-lg hover:bg-[#38bdf8]/10 text-sm transition-all duration-300">
            <GfgIcon /> GeeksforGeeks
          </a>
          <a href="https://takeuforward.org/profile/sakkthisri" target="_blank" rel="noreferrer"
            className="glow-btn flex items-center gap-2 border border-[#38bdf8] text-[#38bdf8] px-5 py-2.5 rounded-lg hover:bg-[#38bdf8]/10 text-sm transition-all duration-300">
            <TufIcon /> Take U Forward
          </a>
        </div>

        {/* 7 · Scroll cue */}
        <div className="animate-fade-in delay-600 mt-2">
          <a href="#about" className="text-gray-500 hover:text-[#38bdf8] transition-colors">
            <svg className="w-6 h-6 mx-auto animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}

// ── About ───────────────────────────────────────────────────────────────────
function About() {
  const [ref, visible] = useReveal()
  return (
    <section id="about" ref={ref} className={`py-24 px-6 section-hidden ${visible ? 'section-visible' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <SectionTitle>About Me</SectionTitle>
        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <div className="flex justify-center md:justify-start">
            <ProfilePhoto size="lg" />
          </div>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              I'm an <span className="text-[#38bdf8] font-semibold">Information Technology student</span> at Sri Krishna College of Technology, passionate about building intelligent systems and scalable cloud solutions.
            </p>
            <p>
              My focus areas include <span className="text-white font-medium">AI/ML</span> — particularly computer vision with deep learning models like YOLOv8 and Swin Transformer — and <span className="text-white font-medium">cloud computing</span> through hands-on AWS DevOps experience.
            </p>
            <p>
              I enjoy solving real-world problems through code, whether it's automating workflows, building web applications with Flask, or training models that see and understand the world.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {['AI / ML', 'Cloud Computing', 'Python', 'Deep Learning'].map(tag => (
                <span key={tag} className="text-xs bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/30 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Skills ──────────────────────────────────────────────────────────────────
const skillGroups = [
  {
    label: 'Languages',
    skills: [
      { name: 'Python', icon: '🐍' },
      { name: 'Java', icon: '☕' },
      { name: 'HTML/CSS', icon: '🌐' },
    ],
  },
  {
    label: 'Frameworks & Tools',
    skills: [
      { name: 'Flask', icon: '🔥' },
      { name: 'Git', icon: '🔀' },
      { name: 'MySQL', icon: '🗄️' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', icon: '☁️' },
    ],
  },
  {
    label: 'AI / ML',
    skills: [
      { name: 'YOLOv8', icon: '👁️' },
      { name: 'Swin Transformer', icon: '🤖' },
      { name: 'Deep Learning', icon: '🧠' },
    ],
  },
]

function Skills() {
  const [ref, visible] = useReveal()
  return (
    <section id="skills" ref={ref} className={`py-24 px-6 bg-[#0a1120] section-hidden ${visible ? 'section-visible' : ''}`}>
      <div className="max-w-5xl mx-auto">
        <SectionTitle>Skills</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {skillGroups.map(group => (
            <div key={group.label} className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 card-hover">
              <h3 className="text-[#38bdf8] text-xs font-semibold uppercase tracking-widest mb-4">{group.label}</h3>
              <div className="flex flex-col gap-3">
                {group.skills.map(s => (
                  <div key={s.name} className="skill-pill flex items-center gap-3 bg-[#0f172a] border border-[#334155] rounded-lg px-4 py-2 cursor-default">
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-gray-200 text-sm font-medium">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Projects ────────────────────────────────────────────────────────────────
const projects = [
  {
    title: 'Deep Learning-Based Weed Detection',
    description: 'A computer vision system that detects and classifies weeds in agricultural fields using YOLOv8 for real-time object detection combined with Swin Transformer for enhanced feature extraction and classification accuracy.',
    tech: ['YOLOv8', 'Swin Transformer', 'Python', 'Deep Learning', 'OpenCV'],
    icon: '🌿',
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    title: 'Takeaway Food Order Manager',
    description: 'A full-stack web application built with Flask that streamlines food ordering for takeaway restaurants. Features customer and admin login, AI-powered preparation time prediction, and JSON-based order tracking.',
    tech: ['Flask', 'Python', 'MySQL', 'HTML/CSS', 'JavaScript'],
    icon: '🍔',
    color: 'from-orange-500/20 to-amber-500/20',
  },
]

function Projects() {
  const [ref, visible] = useReveal()
  return (
    <section id="projects" ref={ref} className={`py-24 px-6 bg-[#0a1120] section-hidden ${visible ? 'section-visible' : ''}`}>
      <div className="max-w-5xl mx-auto">
        <SectionTitle>Projects</SectionTitle>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {projects.map(p => (
            <div key={p.title} className="bg-[#1e293b] border border-[#334155] rounded-xl overflow-hidden card-hover flex flex-col">
              <div className={`bg-gradient-to-br ${p.color} p-8 flex items-center justify-center text-6xl`}>
                {p.icon}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-white text-lg font-bold mb-3">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{p.description}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {p.tech.map(t => (
                    <span key={t} className="text-xs bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 px-2 py-1 rounded-md">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Achievements ────────────────────────────────────────────────────────────
const achievements = [
  { icon: '🥈', title: '2nd Place — 8-Hour Hackathon', desc: 'Secured runner-up position in a competitive 8-hour hackathon and received a cash prize.' },
  { icon: '💻', title: '100+ Coding Problems Solved', desc: 'Solved 100+ problems across LeetCode and GeeksforGeeks, sharpening DSA skills consistently.' },
  { icon: '🏆', title: 'Participated in 3+ Hackathons', desc: 'Competed in SIH, MSME Innovation Hackathon, PSG Ideathon, and more team-based events.' },
]

function Achievements() {
  const [ref, visible] = useReveal()
  return (
    <section id="achievements" ref={ref} className={`py-24 px-6 section-hidden ${visible ? 'section-visible' : ''}`}>
      <div className="max-w-5xl mx-auto">
        <SectionTitle>Achievements</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {achievements.map(a => (
            <div key={a.title} className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 text-center card-hover">
              <div className="text-5xl mb-4">{a.icon}</div>
              <h3 className="text-white font-bold mb-2">{a.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Certifications ──────────────────────────────────────────────────────────
const certs = [
  { title: 'NPTEL Elite — Fundamentals of AI', issuer: 'NPTEL', icon: '🎓', color: 'border-purple-500/40 bg-purple-500/5' },
  { title: 'NPTEL Elite — Foundations of Cryptography', issuer: 'NPTEL', icon: '🔐', color: 'border-blue-500/40 bg-blue-500/5' },
]

function Certifications() {
  const [ref, visible] = useReveal()
  return (
    <section id="certifications" ref={ref} className={`py-24 px-6 bg-[#0a1120] section-hidden ${visible ? 'section-visible' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <SectionTitle>Certifications</SectionTitle>
        <div className="flex flex-col gap-5 mt-12">
          {certs.map(c => (
            <div key={c.title} className={`flex items-center gap-6 border ${c.color} rounded-xl p-6 card-hover`}>
              <div className="text-4xl shrink-0">{c.icon}</div>
              <div>
                <h3 className="text-white font-bold">{c.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{c.issuer}</p>
              </div>
              <div className="ml-auto shrink-0">
                <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1 rounded-full">Certified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Contact ─────────────────────────────────────────────────────────────────
const contacts = [
  { label: 'Email', value: 'sakkthisri941@gmail.com', href: 'mailto:sakkthisri941@gmail.com', icon: '✉️' },
  { label: 'LinkedIn', value: 'linkedin.com/in/sakkthi-sri-1880a8326', href: 'https://www.linkedin.com/in/sakkthi-sri-1880a8326/', icon: '💼' },
  { label: 'GitHub', value: 'github.com/sakkthisri', href: 'https://github.com/sakkthisri', icon: '🐙' },
  { label: 'GeeksforGeeks', value: 'geeksforgeeks.org/profile/sakkthigclr', href: 'https://www.geeksforgeeks.org/profile/sakkthigclr?tab=activity', icon: '🟢' },
  { label: 'Take U Forward / LeetCode Practice', value: 'takeuforward.org/profile/sakkthisri', href: 'https://takeuforward.org/profile/sakkthisri', icon: '⚡' },
]

function Contact() {
  const [ref, visible] = useReveal()
  return (
    <section id="contact" ref={ref} className={`py-24 px-6 section-hidden ${visible ? 'section-visible' : ''}`}>
      <div className="max-w-4xl mx-auto text-center">
        <SectionTitle>Get In Touch</SectionTitle>
        <p className="text-gray-400 mt-4 mb-12 max-w-xl mx-auto">
          I'm open to opportunities, collaborations, and interesting conversations. Feel free to reach out through any of the platforms below.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {contacts.map(c => (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
              className="flex items-center gap-4 bg-[#1e293b] border border-[#334155] rounded-xl p-5 card-hover text-left group">
              <div className="text-3xl shrink-0">{c.icon}</div>
              <div className="min-w-0">
                <p className="text-gray-400 text-xs uppercase tracking-widest">{c.label}</p>
                <p className="text-white font-medium group-hover:text-[#38bdf8] transition-colors truncate">{c.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-[#1e293b] py-8 text-center text-gray-500 text-sm">
      <p>Built with React & Tailwind CSS · <span className="text-[#38bdf8]">Sakkthi Sri S</span> © 2025</p>
    </footer>
  )
}

// ── Shared: Section Title ───────────────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white">{children}</h2>
      <div className="mt-3 mx-auto w-16 h-1 bg-gradient-to-r from-[#38bdf8] to-[#818cf8] rounded-full" />
    </div>
  )
}

// ── Icons ───────────────────────────────────────────────────────────────────
function GithubIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GfgIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.773 10.424c-.975-3.215-3.895-5.424-7.273-5.424-2.552 0-4.837 1.188-6.35 3.046C7.638 6.188 5.353 5 2.8 5 1.254 5 0 6.254 0 7.8c0 .663.232 1.27.615 1.748C.232 10.026 0 10.633 0 11.3c0 1.546 1.254 2.8 2.8 2.8 2.553 0 4.838-1.188 6.35-3.046C10.663 12.812 12.948 14 15.5 14c3.378 0 6.298-2.209 7.273-5.424.15-.494.227-1.01.227-1.576s-.077-1.082-.227-1.576zM4.2 12.6c-.772 0-1.4-.628-1.4-1.4s.628-1.4 1.4-1.4 1.4.628 1.4 1.4-.628 1.4-1.4 1.4zm11.3 0c-.772 0-1.4-.628-1.4-1.4s.628-1.4 1.4-1.4 1.4.628 1.4 1.4-.628 1.4-1.4 1.4z"/>
    </svg>
  )
}

function TufIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  )
}

// ── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="bg-[#0f172a] min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  )
}
