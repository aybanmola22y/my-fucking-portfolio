"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"

const projects = [
  {
    title: "Nova North SG Website",
    description:
      "A modern business website for a Singapore-based company with improved UI/UX, enhanced accessibility, and better user engagement.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "#",
    live: "#",
    preview: "from-slate-600/20 via-blue-600/15 to-slate-900/10",
  },
  {
    title: "Capstone Project",
    description:
      "A comprehensive capstone project featuring a well-designed user interface and seamless user experience.",
    tech: ["React", "Node.js", "MySQL"],
    github: "#",
    live: "#",
    preview: "from-violet-600/20 via-indigo-600/15 to-slate-900/10",
  },
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio website showcasing skills, experience, and projects with modern design and smooth animations.",
    tech: ["Next.js", "Shadcn UI", "Framer Motion"],
    github: "#",
    live: "#",
    preview: "from-primary/25 via-blue-600/15 to-slate-900/10",
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const number = String(index + 1).padStart(2, "0")
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease }}
      viewport={{ once: true, margin: "-40px" }}
      className="group flex h-full flex-col"
    >
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 transition-all duration-300 hover:border-primary/25 hover:shadow-sm hover:shadow-primary/5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary/70 via-primary/30 to-transparent transition-transform duration-500 group-hover:scale-x-100" />

        {/* Preview strip */}
        <div
          className={cn(
            "relative aspect-[16/10] overflow-hidden bg-gradient-to-br",
            project.preview
          )}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.25)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.25)_1px,transparent_1px)] bg-[size:1.25rem_1.25rem] opacity-40" />
          <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-white/10 bg-black/10 px-3 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            <span className="ml-2 h-1.5 flex-1 max-w-[40%] rounded-full bg-white/10" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/30 transition-colors duration-300 group-hover:text-primary/50">
              preview
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex flex-1 flex-col p-5 md:p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] text-primary/50">{number}</span>
            <div className="flex items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                <Github className="h-3.5 w-3.5" strokeWidth={1.6} />
                <span className="hidden sm:inline">Code</span>
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live site`}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.6} />
                <span className="hidden sm:inline">Live</span>
              </a>
            </div>
          </div>

          <h3 className="font-sans font-normal text-lg leading-snug tracking-tight lowercase transition-colors duration-300 group-hover:text-primary">
            {project.title}
          </h3>

          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-1 gap-y-1 border-t border-primary/10 pt-4">
            {project.tech.map((tech, i) => (
              <span key={tech} className="inline-flex items-center">
                <span className="font-mono text-[11px] text-primary/80">{tech}</span>
                {i < project.tech.length - 1 && (
                  <span className="mx-1.5 text-muted-foreground/40">·</span>
                )}
              </span>
            ))}
          </div>

          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100"
          >
            View project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative overflow-hidden py-24 px-4 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_8%,transparent_72%)] opacity-40" />
      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          number="III"
          title="projects"
          description="Selected work — from business websites to full-stack applications."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
