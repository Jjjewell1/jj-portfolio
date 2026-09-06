'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Film,
  Gift,
  Plane,
  BookOpen,
  Ticket,
  Clapperboard,
  Shield,
  Terminal,
} from 'lucide-react';
import { useScrollTracker } from '@/lib/useScrollTracker';
import { useScrollStore } from '@/lib/scroll-store';

// The Canvas needs the browser (WebGL), so it's excluded from SSR entirely.
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });

const SECTION_COUNT = 4;

function useIsActive(index: number) {
  return useScrollStore((s) => s.activeSection === index);
}

const projects = [
  {
    id: 'vortex',
    name: 'Vortex',
    subtitle: 'Cinematic Tornado Experience',
    description:
      'A Next.js site with a live Three.js storm renderer, GSAP-driven camera moves, real-time NWS radar overlays, and a local AI chat assistant baked in.',
    tech: ['Next.js', 'Three.js', 'GSAP', 'Local AI'],
    icon: Clapperboard,
    accent: 'amber' as const,
    link: 'https://vortex.jewellcore.com',
  },
  {
    id: 'pickflick',
    name: 'PickFlick',
    subtitle: 'Jellyfin Movie Voting',
    description:
      'A family-friendly companion app for Jellyfin: democratic movie-night voting with a real-time tally and a UI everyone actually wants to use.',
    tech: ['Next.js', 'Jellyfin API', 'Docker', 'Prisma'],
    icon: Film,
    accent: 'teal' as const,
    link: '#',
  },
  {
    id: 'wishlist',
    name: 'Christmas Wishlist',
    subtitle: 'Family Gift Coordination',
    description:
      'A real-time collaborative wishlist with claim-link sharing and a dedicated kids-only portal, so nobody doubles up on gifts again.',
    tech: ['Next.js 14', 'Prisma', 'SQLite', 'Real-time Sync'],
    icon: Gift,
    accent: 'amber' as const,
    link: '#',
  },
  {
    id: 'adventures',
    name: 'Family Adventures',
    subtitle: 'Travel & Memories Platform',
    description:
      'A collaborative travel platform for planning family trips  --  shared itineraries, photo galleries, and ComfyUI-generated trip art.',
    tech: ['Next.js', 'ComfyUI', 'Coolify', 'Cloudflare'],
    icon: Plane,
    accent: 'teal' as const,
    link: 'https://adventures.jewellcore.com',
  },
  {
    id: 'study-assistant',
    name: 'AnythingLLM Study Assistant',
    subtitle: 'Local RAG for Cert Prep',
    description:
      'A self-hosted study assistant on AnythingLLM, fed on cert study materials and homelab notes, answering questions entirely on local hardware  --  no cloud round-trip.',
    tech: ['AnythingLLM', 'Ollama', 'RAG', 'Self-Hosted'],
    icon: BookOpen,
    accent: 'amber' as const,
    link: '#',
  },
  {
    id: 'golden-ticket',
    name: 'The Golden Ticket',
    subtitle: 'Project details incoming',
    description:
      'Placeholder copy  --  swap this out with the real pitch for The Golden Ticket before launch (see OPENCODE.md).',
    tech: ['TBD'],
    icon: Ticket,
    accent: 'teal' as const,
    link: '#',
  },
];

const skills = [
  { category: 'Containerization', items: ['Docker', 'Docker Compose', 'Coolify', 'Portainer'] },
  { category: 'Infrastructure', items: ['Unraid', 'Cloudflare Tunnels', 'ZFS', 'Linux Admin'] },
  { category: 'Web Development', items: ['Next.js', 'React Three Fiber', 'TypeScript', 'GSAP'] },
  { category: 'AI & Automation', items: ['Ollama', 'OpenCode', 'Cline', 'MCP Servers'] },
  { category: 'DevOps', items: ['GitHub', 'GitHub Actions', 'CI/CD', 'Git'] },
  { category: 'Databases', items: ['PostgreSQL', 'Prisma', 'SQLite', 'MySQL'] },
  { category: 'Security', items: ['Network Security', 'Access Control', 'Firewalls', 'CompTIA A+'] },
  { category: 'Cloud', items: ['Azure AZ-900', 'AWS Basics', 'Networking', 'TCP/IP'] },
];

const accentText = {
  amber: 'text-grid-amber',
  teal: 'text-grid-teal',
} as const;
const accentBorder = {
  amber: 'group-hover:border-grid-amber/60',
  teal: 'group-hover:border-grid-teal/60',
} as const;

export default function Portfolio() {
  useScrollTracker(SECTION_COUNT);
  const heroActive = useIsActive(0);
  const projectsActive = useIsActive(1);
  const stackActive = useIsActive(2);
  const contactActive = useIsActive(3);

  // Nudge each section fully opaque as soon as it's the active station,
  // and fade siblings back so the 3D scene reads as the "main character".
  const opacity = (active: boolean) => (active ? 1 : 0.25);

  return (
    <div className="text-grid-ink">
      <Experience />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md bg-grid-bg/70 border-b border-grid-teal/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#hero" className="font-mono-grid text-lg tracking-widest text-grid-teal">
            JJ<span className="text-grid-amber">://</span>grid
          </a>
          <div className="flex gap-6 items-center font-mono-grid text-xs uppercase tracking-widest">
            <a href="#projects" className="hover:text-grid-teal transition">Projects</a>
            <a href="#stack" className="hover:text-grid-teal transition">Stack</a>
            <a href="#contact" className="hover:text-grid-teal transition">Contact</a>
            <a
              href="https://github.com/Jjjewell1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-grid-teal/10 rounded-lg transition"
            >
              <Github size={18} />
            </a>
          </div>
        </div>
      </nav>

      {/* Station 0 — Hero */}
      <section
        id="hero"
        className="grid-section flex flex-col justify-center items-center px-6 relative"
        style={{ opacity: opacity(heroActive) }}
      >
        <div className="max-w-3xl mx-auto text-center z-10">
          <div className="inline-block mb-6 px-4 py-1.5 grid-panel rounded-full">
            <span className="font-mono-grid text-xs tracking-widest text-grid-teal">
              SYSTEM ONLINE // WELCOME TO THE GRID
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-glow-teal">Jeffrey</span>{' '}
            <span className="text-grid-amber text-glow-amber">&quot;JJ&quot;</span>{' '}
            <span className="text-glow-teal">Jewell</span>
          </h1>

          <p className="text-lg md:text-xl text-grid-muted mb-10 leading-relaxed max-w-xl mx-auto">
            IT &amp; Cybersecurity student running a full self-hosted stack  --  homelab
            infrastructure, agentic AI tooling, and the pipelines that ship it all.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center font-mono-grid text-sm">
            <a
              href="#projects"
              className="px-7 py-3 border border-grid-amber/50 text-grid-amber rounded-lg hover:bg-grid-amber/10 transition"
            >
              &gt; view_projects
            </a>
            <a
              href="https://github.com/Jjjewell1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 border border-grid-teal/50 text-grid-teal rounded-lg hover:bg-grid-teal/10 transition"
            >
              &gt; open_github
            </a>
          </div>
        </div>
      </section>

      {/* Station 1 — Projects */}
      <section
        id="projects"
        className="grid-section py-24 px-6 max-w-6xl mx-auto"
        style={{ opacity: opacity(projectsActive) }}
      >
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-mono-grid">
            <span className="text-grid-teal">01.</span> Projects
          </h2>
          <p className="text-grid-muted">Shipped and self-hosted, end to end.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className={`group relative grid-panel rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${accentBorder[project.accent]}`}
              >
                <Icon className={`w-9 h-9 mb-4 ${accentText[project.accent]}`} />
                <h3 className="text-xl font-bold mb-1">{project.name}</h3>
                <p className={`text-xs font-mono-grid mb-3 ${accentText[project.accent]}`}>
                  {project.subtitle}
                </p>
                <p className="text-sm text-grid-muted leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono-grid px-2 py-1 bg-white/5 border border-white/10 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-xs font-mono-grid mt-2 ${accentText[project.accent]}`}
                  >
                    view_live <ExternalLink size={12} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Station 2 — Stack / Skills */}
      <section
        id="stack"
        className="grid-section py-24 px-6 max-w-6xl mx-auto"
        style={{ opacity: opacity(stackActive) }}
      >
        <div className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-mono-grid">
            <span className="text-grid-amber">02.</span> Stack
          </h2>
          <p className="text-grid-muted">
            OpenCode / Cline &rarr; GitHub &rarr; Coolify &rarr; Unraid ("Venus") &rarr; Cloudflare Tunnels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((skill) => (
            <div key={skill.category} className="grid-panel rounded-lg p-5">
              <h3 className="font-mono-grid text-sm text-grid-teal mb-3 flex items-center gap-2">
                <Shield size={16} />
                {skill.category}
              </h3>
              <ul className="space-y-1.5">
                {skill.items.map((item) => (
                  <li key={item} className="text-sm text-grid-muted flex items-start gap-2">
                    <span className="text-grid-amber mt-0.5">&rarr;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Station 3 — Contact */}
      <section
        id="contact"
        className="grid-section flex flex-col justify-center items-center px-6"
        style={{ opacity: opacity(contactActive) }}
      >
        <div className="max-w-xl mx-auto text-center grid-panel rounded-2xl p-10 md:p-14">
          <Terminal className="w-8 h-8 text-grid-teal mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono-grid">
            <span className="text-grid-amber">03.</span> Contact
          </h2>
          <p className="text-grid-muted mb-8">
            Infrastructure design, full-stack builds, or agentic AI automation  --  open to
            talking through it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center font-mono-grid text-sm">
            <a
              href="mailto:[email protected]"
              className="px-6 py-3 border border-grid-amber/50 text-grid-amber rounded-lg hover:bg-grid-amber/10 transition flex items-center justify-center gap-2"
            >
              <Mail size={16} /> email_me
            </a>
            <a
              href="https://github.com/Jjjewell1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-grid-teal/50 text-grid-teal rounded-lg hover:bg-grid-teal/10 transition flex items-center justify-center gap-2"
            >
              <Github size={16} /> github
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition flex items-center justify-center gap-2"
            >
              <Linkedin size={16} /> linkedin
            </a>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-grid-muted text-xs font-mono-grid border-t border-grid-teal/10">
        <p>&copy; 2026 Jeffrey &quot;JJ&quot; Jewell  --  built on the Grid.</p>
      </footer>
    </div>
  );
}
