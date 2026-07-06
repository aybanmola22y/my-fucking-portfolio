"use client"

import { motion } from "framer-motion"
import { Braces } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiMysql,
  SiFirebase,
  SiSupabase,
  SiGit,
  SiGithub,
  SiVercel,
} from "react-icons/si"
import { TbBrandVscode } from "react-icons/tb"
import { IconType } from "react-icons"

const ShadcnIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M5 19L19 5" />
    <path d="M9 19L19 9" />
  </svg>
)

const CursorIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
  </svg>
)

type SkillIcon = IconType | React.ComponentType<{ size?: number }>

type Skill = { name: string; icon: SkillIcon; iconClass: string }

const frontendSkills: Skill[] = [
  { name: "TypeScript", icon: SiTypescript, iconClass: "text-blue-600" },
  { name: "Tailwind CSS", icon: SiTailwindcss, iconClass: "text-cyan-500" },
  { name: "Next.js", icon: SiNextdotjs, iconClass: "text-foreground" },
  { name: "Shadcn UI", icon: ShadcnIcon, iconClass: "text-foreground" },
  { name: "React.js", icon: SiReact, iconClass: "text-cyan-400" },
  { name: "JavaScript", icon: SiJavascript, iconClass: "text-yellow-500" },
  { name: "HTML5", icon: SiHtml5, iconClass: "text-orange-500" },
  { name: "CSS3", icon: SiCss, iconClass: "text-blue-500" },
]

const backendSkills: Skill[] = [
  { name: "Node.js", icon: SiNodedotjs, iconClass: "text-green-600" },
  { name: "PHP", icon: SiPhp, iconClass: "text-indigo-500" },
  { name: "Python", icon: SiPython, iconClass: "text-yellow-500" },
  { name: "MySQL", icon: SiMysql, iconClass: "text-blue-700" },
  { name: "Firebase", icon: SiFirebase, iconClass: "text-amber-500" },
  { name: "Supabase", icon: SiSupabase, iconClass: "text-emerald-500" },
  { name: "REST APIs", icon: Braces, iconClass: "text-primary" },
]

const toolsSkills: Skill[] = [
  { name: "Visual Studio Code", icon: TbBrandVscode, iconClass: "text-blue-500" },
  { name: "Cursor AI", icon: CursorIcon, iconClass: "text-foreground" },
  { name: "Git", icon: SiGit, iconClass: "text-orange-600" },
  { name: "GitHub", icon: SiGithub, iconClass: "text-foreground" },
  { name: "Vercel", icon: SiVercel, iconClass: "text-foreground" },
]

const skillCategories: { num: string; title: string; skills: Skill[] }[] = [
  { num: "01", title: "Frontend", skills: frontendSkills },
  { num: "02", title: "Backend & Database", skills: backendSkills },
  { num: "03", title: "Tools & Environment", skills: toolsSkills },
]

const workExperience = [
  {
    company: "Petrosphere Incorporated",
    role: "Information Security & Digital Solutions Officer",
    period: "2025 - Present",
    description: "Information Security & Digital Solutions Associate at Petrosphere Incorporated, responsible for maintaining and securing WordPress-based digital assets, including plugins and website infrastructure.",
  },
  {
    company: "Nova North SG (786 SG PTE. LTD. Singapore)",
    role: "Freelance Web Developer",
    period: "2025 - 2025",
    description: "Recreate their business website with a modern design and improved UI/UX to enhance user engagement, accessibility, and overall browsing experience.",
  },
  {
    company: "Princesa Garden Island Resort and Spa",
    role: "Service Associate (Oncall)",
    period: "2025 - 2025",
    description: "Provides excellent customer service by preparing tables with proper cutlery, serving food and drinks, and ensuring a clean and welcoming dining environment.",
  },
]

const ExperienceItem = ({
  exp,
  index,
}: {
  exp: (typeof workExperience)[number]
  index: number
}) => {
  const isCurrent = exp.period.toLowerCase().includes("present")
  const number = String(index + 1).padStart(2, "0")
  const ease = [0.22, 1, 0.36, 1] as const
  const isLast = index === workExperience.length - 1

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease }}
      viewport={{ once: true }}
      className={cn("group relative pl-7", !isLast && "pb-8")}
    >
      <div
        className={cn(
          "absolute left-0 top-1.5 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-background transition-colors duration-300",
          isCurrent ? "bg-primary" : "bg-muted-foreground/35 group-hover:bg-primary"
        )}
      />

      <div className="relative rounded-xl px-3 py-2 transition-all duration-300 hover:bg-primary/[0.04]">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-mono text-[10px] text-primary/40">{number}</span>
          <span className="font-mono text-[11px] text-muted-foreground">{exp.period}</span>
          {isCurrent && (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Current
            </span>
          )}
        </div>

        <h4 className="mt-2 text-[15px] font-normal leading-snug tracking-tight transition-colors duration-300 group-hover:text-primary">
          {exp.company}
        </h4>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-primary/70">
          {exp.role}
        </p>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
      </div>
    </motion.div>
  )
}

function SkillChip({ skill, index }: { skill: Skill; index: number }) {
  const Icon = skill.icon
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03, ease }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="inline-flex items-center gap-2.5 rounded-xl border border-primary/10 px-3.5 py-2.5 transition-all duration-300 hover:border-primary/25 hover:bg-primary/[0.04]">
        <Icon className={cn("h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110", skill.iconClass)} size={16} />
        <span className="text-xs font-medium leading-none">{skill.name}</span>
      </div>
    </motion.div>
  )
}

function SkillCategory({
  category,
  categoryIndex,
}: {
  category: (typeof skillCategories)[number]
  categoryIndex: number
}) {
  const ease = [0.22, 1, 0.36, 1] as const
  let skillOffset = 0
  for (let i = 0; i < categoryIndex; i++) {
    skillOffset += skillCategories[i].skills.length
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: categoryIndex * 0.08, ease }}
      viewport={{ once: true }}
      className="group/category"
    >
      <div className="mb-4 flex items-baseline justify-between gap-3 border-b border-primary/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-primary/40">{category.num}</span>
          <h4 className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            {category.title}
          </h4>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground/60">
          {category.skills.length} tools
        </span>
      </div>
      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill, index) => (
          <SkillChip key={skill.name} skill={skill} index={skillOffset + index} />
        ))}
      </div>
    </motion.div>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen py-20 px-4 md:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeading number="II" title="My Stack & Experience" />

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              My Techstack
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Technologies I use to build modern, reliable web applications.
            </p>

            <div className="mt-6 space-y-8">
              {skillCategories.map((category, index) => (
                <SkillCategory key={category.title} category={category} categoryIndex={index} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Work Experience
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Roles and projects that shaped my professional journey.
            </p>

            <div className="relative mt-6 ml-1 border-l border-primary/15 pl-5">
              {workExperience.map((exp, index) => (
                <ExperienceItem key={exp.company} exp={exp} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
