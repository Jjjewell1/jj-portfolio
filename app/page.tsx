'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Github, Linkedin, Mail, ExternalLink, Code2, Server, Zap, Shield } from 'lucide-react';

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const projects = [
    {
      id: 'vortex',
      name: 'Vortex',
      subtitle: 'Cinematic Tornado Experience',
      description: 'Next.js site with Three.js 3D rendering, GSAP animations, real-time NWS radar integration, and local AI chat.',
      tech: ['Next.js', 'Three.js', 'GSAP', 'AI Integration'],
      icon: Zap,
      color: 'from-amber-500 to-red-600',
      link: 'https://vortex.jewellcore.com',
    },
    {
      id: 'pickflick',
      name: 'PickFlick',
      subtitle: 'Jellyfin Movie Voting',
      description: 'Family-friendly Jellyfin integration for democratic movie selection with real-time voting and UI polish.',
      tech: ['Next.js', 'Jellyfin API', 'Docker', 'Prisma'],
      icon: Code2,
      color: 'from-purple-500 to-pink-600',
      link: '#',
    },
    {
      id: 'wishlist',
      name: 'Christmas Wishlist',
      subtitle: 'Family Gift Coordination',
      description: 'Real-time collaborative wishlist with claim-link sharing, child portals, and SQLite persistence.',
      tech: ['Next.js 14', 'Prisma', 'SQLite', 'Real-time Sync'],
      icon: Code2,
      color: 'from-red-500 to-rose-600',
      link: '#',
    },
    {
      id: 'homelab',
      name: 'Homelab Infrastructure',
      subtitle: 'Self-Hosted Full Stack',
      description: 'Unraid "Venus" server running Coolify, Home Assistant, Jellyfin, Sonarr/Radarr, all exposed via Cloudflare Tunnels.',
      tech: ['Unraid', 'Docker', 'Coolify', 'ZFS', 'CI/CD'],
      icon: Server,
      color: 'from-blue-500 to-cyan-600',
      link: '#',
    },
    {
      id: 'ai-stack',
      name: 'Local AI Stack',
      subtitle: 'Self-Hosted LLM Development',
      description: 'Ollama + RTX 5060 + OpenCode + Cline for agentic coding, with MCP servers and OpenRouter fallback.',
      tech: ['Ollama', 'OpenCode', 'MCP Servers', 'Local Models'],
      icon: Zap,
      color: 'from-green-500 to-emerald-600',
      link: '#',
    },
    {
      id: 'adventures',
      name: 'Family Adventures',
      subtitle: 'Travel & Memories Platform',
      description: 'Collaborative family travel platform with photo galleries, itineraries, and ComfyUI-generated content.',
      tech: ['Next.js', 'ComfyUI', 'Coolify', 'Cloudflare'],
      icon: Code2,
      color: 'from-cyan-500 to-blue-600',
      link: 'https://adventures.jewellcore.com',
    },
  ];

  const skills = [
    { category: 'Containerization', items: ['Docker', 'Docker Compose', 'Coolify', 'Portainer'] },
    { category: 'Infrastructure', items: ['Unraid', 'KVM/QEMU', 'ZFS', 'Linux Admin'] },
    { category: 'Web Development', items: ['Next.js', 'React', 'TypeScript', 'Tailwind'] },
    { category: 'AI & Automation', items: ['Ollama', 'OpenCode', 'Cline', 'MCP Servers'] },
    { category: 'DevOps', items: ['GitHub', 'CI/CD', 'Git', 'Cloudflare'] },
    { category: 'Databases', items: ['PostgreSQL', 'MySQL', 'Prisma', 'SQLite'] },
    { category: 'Security', items: ['Network Security', 'Access Control', 'Firewalls', 'CompTIA A+'] },
    { category: 'Cloud', items: ['Azure AZ-900', 'AWS', 'Networking', 'TCP/IP'] },
  ];

  const stats = [
    { label: 'Years Leadership', value: '11+' },
    { label: 'Technical Skills', value: '30+' },
    { label: 'Projects Built', value: '5' },
    { label: 'Certifications', value: '6' },
  ];

  return (
    <div ref={containerRef} className="bg-slate-950 text-slate-100 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2s" />
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4s" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition">
            JJ
          </a>
          <div className="flex gap-8 items-center">
            <a href="#projects" className="hover:text-cyan-400 transition text-sm font-medium">
              Projects
            </a>
            <a href="#skills" className="hover:text-cyan-400 transition text-sm font-medium">
              Skills
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition text-sm font-medium">
              Contact
            </a>
            <a href="https://github.com/Jjjewell1" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-slate-800 rounded-lg transition">
              <Github size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-full" style={{ perspective: '1000px' }}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-full backdrop-blur-sm">
            <span className="text-cyan-300 text-sm font-semibold">Welcome to My Lab</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Jeffrey JJ Jewell
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            IT Professional & Cybersecurity Student crafting full-stack self-hosted infrastructure, agentic AI workflows, and the tools that power it all.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#projects"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:scale-105 transition flex items-center justify-center gap-2 group"
            >
              View Projects
              <ChevronRight className="group-hover:translate-x-1 transition" size={20} />
            </a>
            <a
              href="https://github.com/Jjjewell1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 transition flex items-center justify-center gap-2"
            >
              <Github size={20} />
              GitHub
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg backdrop-blur-sm hover:border-cyan-500/50 transition group"
              >
                <div className="text-3xl font-bold text-cyan-400 group-hover:scale-110 transition">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-cyan-400 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Real problems, thoughtful solutions. Each project showcases full-stack capabilities and infrastructure expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group relative h-80 rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  transform: hoveredProject === project.id ? 'translateY(-8px)' : 'translateY(0)',
                }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                {/* Border glow */}
                <div className="absolute inset-0 border border-slate-700 group-hover:border-cyan-500/50 rounded-xl transition-colors" />

                {/* Content */}
                <div className="relative p-6 h-full flex flex-col justify-between">
                  <div>
                    <Icon className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition" />
                    <h3 className="text-2xl font-bold mb-2 text-white">{project.name}</h3>
                    <p className="text-sm text-cyan-400 font-semibold mb-3">{project.subtitle}</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, j) => (
                      <span
                        key={j}
                        className="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded border border-slate-600 group-hover:border-cyan-500/50 transition"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover overlay with link */}
                {project.link !== '#' && (
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-xl">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-cyan-600 rounded-lg font-semibold hover:bg-cyan-700 transition"
                    >
                      View Live
                      <ExternalLink size={18} />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Technical Arsenal
            </span>
          </h2>
          <p className="text-slate-400 text-lg">Full-stack capabilities spanning infrastructure, development, and automation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-cyan-500/50 hover:bg-slate-800 transition-all duration-300 group"
            >
              <h3 className="font-bold text-lg text-cyan-400 mb-4 flex items-center gap-2">
                <Shield size={20} />
                {skill.category}
              </h3>
              <ul className="space-y-2">
                {skill.items.map((item, j) => (
                  <li key={j} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-cyan-400 mt-1">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <div className="p-12 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-cyan-500/20 rounded-2xl backdrop-blur-sm">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to build something incredible?</h2>
          <p className="text-lg text-slate-300 mb-8">
            Whether it's infrastructure design, full-stack development, or AI-powered automation, let's collaborate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:jj@jewellcore.com"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:scale-105 transition flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              Get In Touch
            </a>
            <a
              href="https://linkedin.com/in/jjewell"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-cyan-500 rounded-lg font-semibold hover:bg-cyan-500/10 transition flex items-center justify-center gap-2"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                JJ
              </div>
              <p className="text-slate-400 text-sm">Building the future, one container at a time.</p>
            </div>

            <div className="flex gap-6">
              <a href="https://github.com/Jjjewell1" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/jjewell" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition">
                <Linkedin size={24} />
              </a>
              <a href="mailto:jj@jewellcore.com" className="text-slate-400 hover:text-cyan-400 transition">
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-sm">
            <p>© 2026 Jeffrey JJ Jewell. Built with React, Next.js, and too much caffeine.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2s {
          animation-delay: 2s;
        }

        .animation-delay-4s {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
