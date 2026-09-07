"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { Braces, Database, ChevronDown } from "lucide-react"
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
    employment: "Full-time",
    duration: "11 mos",
    workplace: "On-site",
    initial: "P",
    logo: "/companies/petrosphere.png",
    roles: [
      {
        title: "Information Systems & Training Officer",
        period: "Sep 2026 — Present",
        tenure: "1 mo",
        location: "Palawan, Mimaropa, Philippines",
        description:
          "Additional responsibilities as a training facilitator in the Training Department. Facilitate training activities for programs such as ACLS, BOSH, COSH, and more.",
      },
      {
        title: "Information Security & Digital Solutions Associate",
        period: "Nov 2025 — Present",
        tenure: "11 mos",
        location: "Puerto Princesa, Mimaropa, Philippines",
        description:
          "Supporting the development of the company’s core systems while assisting in protecting digital assets and strengthening security practices. Implementing secure, reliable, and scalable digital solutions.",
        focus: ["Web Development", "Information Security"],
      },
    ],
  },
  {
    company: "Nova North SG",
    employment: "Contract",
    duration: "2025",
    workplace: "Remote",
    initial: "N",
    logo: undefined as string | undefined,
    roles: [
      {
        title: "Freelance Web Developer",
        period: "2025",
        location: "Singapore · Remote",
        description:
          "Rebuilt the business website with a modern design and stronger UI/UX — clearer navigation, better accessibility, and a browsing experience built for engagement.",
        focus: ["Next.js", "UI/UX", "Responsive"],
      },
    ],
  },
  {
    company: "Princesa Garden Island Resort and Spa",
    employment: "On-call",
    duration: "2025",
    workplace: "On-site",
    initial: "PG",
    logo: "/companies/princesa-garden.png",
    roles: [
      {
        title: "Service Associate (Oncall)",
        period: "2025",
        location: "Puerto Princesa",
        description:
          "Delivered guest-facing service — preparing tables, serving with care, and keeping the dining environment clean and welcoming under real-time hospitality pressure.",
        focus: ["Service", "Teamwork", "Detail"],
      },
    ],
  },
] as const

const ease = [0.22, 1, 0.36, 1] as const

function ExperienceEditorial() {
  const [openCompany, setOpenCompany] = useState<string | null>(
    workExperience[0]?.company ?? null
  )

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        Experience
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Where I&apos;ve worked — expand a company for details.
      </p>

      <ul className="mt-8 space-y-3">
        {workExperience.map((exp, companyIndex) => {
          const multiRole = exp.roles.length > 1
          const isOpen = openCompany === exp.company
          const latestRole = exp.roles[0]

          return (
            <motion.li
              key={exp.company}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: companyIndex * 0.06, ease }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-xl border border-border/70 bg-background/40"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() =>
                  setOpenCompany((current) =>
                    current === exp.company ? null : exp.company
                  )
                }
                className="flex w-full items-start gap-3.5 p-3.5 text-left transition-colors hover:bg-muted/30 sm:p-4"
              >
                <div
                  aria-hidden
                  className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-background"
                >
                  {exp.logo ? (
                    <Image
                      src={exp.logo}
                      alt=""
                      fill
                      className="object-contain p-1"
                      sizes="44px"
                    />
                  ) : (
                    <span className="font-mono text-[11px] font-medium tracking-tight text-foreground">
                      {exp.initial}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="font-sans text-[15px] font-medium tracking-tight text-foreground">
                        {exp.company}
                      </h4>
                      <p className="mt-0.5 text-[13px] text-muted-foreground">
                        {exp.employment}
                        <span className="mx-1.5 text-border">·</span>
                        {exp.duration}
                        {exp.workplace ? (
                          <>
                            <span className="mx-1.5 text-border">·</span>
                            {exp.workplace}
                          </>
                        ) : null}
                      </p>
                      {!isOpen && (
                        <p className="mt-1.5 truncate text-[13px] text-foreground/75">
                          {latestRole.title}
                          {multiRole ? (
                            <span className="text-muted-foreground">
                              {" "}
                              · {exp.roles.length} roles
                            </span>
                          ) : null}
                        </p>
                      )}
                    </div>
                    <ChevronDown
                      className={cn(
                        "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden
                    />
                  </div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <div
                      className={cn(
                        "border-t border-border/60 px-3.5 pb-4 pt-3 sm:px-4",
                        multiRole ? "ml-[21px] border-l border-l-border pl-[21px]" : "sm:ml-[55px]"
                      )}
                    >
                      <ul className={cn(multiRole ? "space-y-5" : "space-y-0")}>
                        {exp.roles.map((role) => (
                          <li key={role.title} className="relative">
                            {multiRole && (
                              <span
                                aria-hidden
                                className="absolute -left-[25px] top-[7px] h-2 w-2 rounded-full bg-muted-foreground/55 ring-[3px] ring-background"
                              />
                            )}

                            <h5 className="font-sans text-[15px] font-medium leading-snug tracking-tight text-foreground">
                              {role.title}
                            </h5>
                            <p className="mt-1 text-[13px] text-muted-foreground">
                              {role.period}
                              {"tenure" in role && role.tenure ? (
                                <>
                                  <span className="mx-1.5 text-border">·</span>
                                  {role.tenure}
                                </>
                              ) : null}
                            </p>
                            <p className="text-[13px] text-muted-foreground">
                              {role.location}
                            </p>
                            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                              {role.description}
                            </p>
                            {"focus" in role &&
                              role.focus &&
                              role.focus.length > 0 && (
                                <p className="mt-2.5 font-mono text-[11px] text-foreground/80">
                                  {role.focus.join(", ")}
                                </p>
                              )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          )
        })}
      </ul>
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
    <section id="skills" className="bg-muted/30 px-4 py-20 md:px-8 md:py-24">
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
