"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { Braces, Database } from "lucide-react"
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
  SiPostgresql,
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
  { name: "Postgres", icon: SiPostgresql, iconClass: "text-sky-700" },
  { name: "Navicat", icon: Database, iconClass: "text-blue-600" },
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
    period: "2025 — Present",
    type: "Full-time",
    location: "Philippines",
    description:
      "Maintaining and securing WordPress-based digital assets — plugins, site infrastructure, and day-to-day digital solutions that keep the business online and protected.",
    focus: ["Security", "WordPress", "Infrastructure"],
    current: true,
  },
  {
    company: "Nova North SG",
    role: "Freelance Web Developer",
    period: "2025",
    type: "Contract",
    location: "Singapore · Remote",
    description:
      "Rebuilt the business website with a modern design and stronger UI/UX — clearer navigation, better accessibility, and a browsing experience built for engagement.",
    focus: ["Next.js", "UI/UX", "Responsive"],
    current: false,
  },
  {
    company: "Princesa Garden Island Resort and Spa",
    role: "Service Associate (Oncall)",
    period: "2025",
    type: "On-call",
    location: "Puerto Princesa",
    description:
      "Delivered guest-facing service — preparing tables, serving with care, and keeping the dining environment clean and welcoming under real-time hospitality pressure.",
    focus: ["Service", "Teamwork", "Detail"],
    current: false,
  },
] as const

const ease = [0.22, 1, 0.36, 1] as const

function ExperienceEditorial() {
  const [active, setActive] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        Experience
      </p>
      <p className="mt-1 text-sm text-muted-foreground">Where I&apos;ve worked.</p>

      <div className="relative mt-8">
        <div aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-border" />
        <motion.div
          aria-hidden
          className="absolute left-[5px] top-2 w-px origin-top bg-primary"
          initial={false}
          animate={{
            height: `calc(${(active / Math.max(workExperience.length - 1, 1)) * 100}% )`,
          }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease }}
          style={{ maxHeight: "calc(100% - 1rem)" }}
        />

        <ul className="space-y-0">
          {workExperience.map((exp, index) => {
            const isActive = active === index
            const isPast = index <= active

            return (
              <li key={exp.company} className="border-b border-border/80 last:border-b-0">
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className="group relative grid w-full grid-cols-[16px_1fr] gap-4 py-4 text-left"
                >
                  <span className="relative z-10 mt-1.5 flex justify-center">
                    <motion.span
                      className={cn(
                        "block h-2.5 w-2.5 rounded-full border-2 border-background",
                        isActive
                          ? "bg-primary"
                          : isPast
                            ? "bg-primary/70"
                            : "bg-muted-foreground/30 group-hover:bg-primary/50"
                      )}
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : {
                              scale: isActive ? 1.25 : 1,
                              boxShadow: isActive
                                ? "0 0 0 4px hsl(var(--primary) / 0.15)"
                                : "0 0 0 0px hsl(var(--primary) / 0)",
                            }
                      }
                      transition={{ duration: 0.25, ease }}
                    />
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <p
                        className={cn(
                          "font-mono text-[11px] tracking-tight transition-colors duration-300",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {exp.period}
                      </p>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70">
                        {exp.type}
                      </span>
                      {exp.current && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                          Present
                        </span>
                      )}
                    </div>

                    <h4
                      className={cn(
                        "mt-1.5 font-sans text-base font-normal tracking-tight transition-colors duration-300",
                        isActive ? "text-foreground" : "text-foreground/65 group-hover:text-foreground"
                      )}
                    >
                      {exp.company}
                    </h4>

                    <p
                      className={cn(
                        "mt-1 text-sm transition-colors duration-300",
                        isActive ? "text-foreground/80" : "text-muted-foreground"
                      )}
                    >
                      {exp.role}
                    </p>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="detail"
                          initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {exp.description}
                          </p>
                          <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                            {exp.location}
                            <span className="mx-2 text-border">·</span>
                            {exp.focus.join(" · ")}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function SkillChip({ skill, index }: { skill: Skill; index: number }) {
  const Icon = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03, ease }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="inline-flex items-center gap-2.5 rounded-xl border border-primary/10 px-3.5 py-2.5 transition-all duration-300 hover:border-primary/25 hover:bg-primary/[0.04]">
        <Icon
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110",
            skill.iconClass
          )}
          size={16}
        />
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
    <section id="skills" className="min-h-screen bg-muted/30 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="II" title="My Stack & Experience" />

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Techstack
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tools I use to ship modern, reliable products.
            </p>

            <div className="mt-8 grid gap-8">
              {skillCategories.map((category, index) => (
                <SkillCategory key={category.title} category={category} categoryIndex={index} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease }}
            viewport={{ once: true }}
          >
            <ExperienceEditorial />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
