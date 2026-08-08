"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import {
  ComputerDesktopIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline"
import type { ComponentType, SVGProps } from "react"
import { cn } from "@/lib/utils"

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>

const services: {
  title: string
  short: string
  description: string
  outcome: string
  icon: HeroIcon
  tags: string[]
}[] = [
  {
    title: "Front-end Development",
    short: "Interfaces",
    description:
      "Modern, responsive interfaces with clean UI, smooth interactions, and fast load times — from landing pages to full web app experiences.",
    outcome: "Polished product UI that feels fast and intentional.",
    icon: ComputerDesktopIcon,
    tags: ["Responsive", "Modern UI", "Performance"],
  },
  {
    title: "Custom Website for Businesses",
    short: "Business Web",
    description:
      "Business-focused websites tailored to your brand, goals, and audience — built to look professional, rank well, and turn visitors into customers.",
    outcome: "A credible online presence that supports real growth.",
    icon: BuildingStorefrontIcon,
    tags: ["Brand-focused", "SEO-ready", "Custom fit"],
  },
  {
    title: "Website Blogs",
    short: "Content",
    description:
      "Content-driven blog platforms with readable layouts, simple publishing workflows, and SEO-friendly structure — made for updates, stories, and articles.",
    outcome: "A publishing system your team can actually maintain.",
    icon: DocumentTextIcon,
    tags: ["Content-first", "Easy to manage", "SEO-friendly"],
  },
  {
    title: "Internal Management Systems",
    short: "Systems",
    description:
      "End-to-end internal tools for HR, inventory, attendance, and data management — one reliable platform for your team's day-to-day operations.",
    outcome: "Operations software shaped around how you work.",
    icon: CubeTransparentIcon,
    tags: ["HR", "Inventory", "Operations"],
  },
]

const ease = [0.22, 1, 0.36, 1] as const

export function ServicesSection() {
  const [active, setActive] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const current = services[active]
  const Icon = current.icon

  return (
    <section id="services" className="px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            03 — Services
          </p>

          <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <h3 className="max-w-xl font-sans text-[clamp(2rem,5vw,3.25rem)] font-normal leading-[1.05] tracking-tight">
              What I can build{" "}
              <span className="text-primary">for you.</span>
            </h3>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground lg:pb-1 lg:text-right">
              Four offerings. One focused delivery style. Select a line to read
              the brief.
            </p>
          </div>

          {/* Index */}
          <nav aria-label="Service list" className="mt-10">
            {services.map((service, index) => {
              const isActive = active === index
              return (
                <button
                  key={service.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={cn(
                    "group relative grid w-full grid-cols-[2.75rem_1fr] items-center gap-3 border-b border-foreground/10 py-5 text-left transition-colors duration-300 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-6 md:py-6",
                    isActive
                      ? "bg-primary/[0.03]"
                      : "hover:bg-foreground/[0.02]"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId={prefersReducedMotion ? undefined : "service-bar"}
                      className="absolute inset-y-0 left-0 w-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}

                  <span
                    className={cn(
                      "pl-3 font-mono text-sm tabular-nums transition-colors duration-300 md:pl-4",
                      isActive ? "text-primary" : "text-muted-foreground/45"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={cn(
                      "font-sans text-[1.05rem] tracking-tight transition-all duration-300 md:text-[1.35rem]",
                      isActive
                        ? "translate-x-1 text-foreground md:translate-x-1.5"
                        : "text-muted-foreground group-hover:text-foreground/75"
                    )}
                  >
                    {service.title}
                  </span>

                  <span
                    className={cn(
                      "hidden items-center gap-2 pr-4 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 sm:inline-flex",
                      isActive ? "text-primary/80" : "text-muted-foreground/50"
                    )}
                  >
                    {service.short}
                    <motion.span
                      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -4 }}
                      transition={{ duration: 0.25 }}
                      className="text-primary"
                      aria-hidden
                    >
                      →
                    </motion.span>
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Detail dock */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-foreground/10 md:mt-10">
            <div className="grid lg:grid-cols-12">
              <AnimatePresence mode="wait">
                <motion.aside
                  key={`plane-${active}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, x: 10 }}
                  transition={{ duration: 0.4, ease }}
                  className="relative flex min-h-[17rem] flex-col justify-between overflow-hidden bg-primary px-7 py-8 text-primary-foreground md:px-9 md:py-10 lg:col-span-5 lg:min-h-[24rem]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/70">
                      {current.short}
                    </span>
                  </div>

                  <div className="relative mt-12">
                    <p
                      aria-hidden
                      className="select-none font-sans text-[5.5rem] font-normal leading-none tracking-tighter text-primary-foreground/[0.18] md:text-[6.5rem]"
                    >
                      {String(active + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 max-w-[20ch] text-[15px] leading-relaxed text-primary-foreground/90">
                      {current.outcome}
                    </p>
                  </div>
                </motion.aside>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${active}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease }}
                  className="flex flex-col justify-between bg-background px-7 py-8 md:px-10 md:py-10 lg:col-span-7"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                        Scope
                      </p>
                      <span className="h-px flex-1 bg-foreground/10" />
                    </div>

                    <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/80 md:text-base md:leading-relaxed">
                      {current.description}
                    </p>

                    <ul className="mt-8 space-y-0 border-t border-foreground/10">
                      {current.tags.map((tag, i) => (
                        <li
                          key={tag}
                          className="flex items-center justify-between gap-4 border-b border-foreground/10 py-3.5"
                        >
                          <span className="font-mono text-[10px] tabular-nums text-primary/60">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1 text-sm text-foreground/85">
                            {tag}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/60">
                            Focus
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10 flex flex-col gap-5 border-t border-foreground/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <a
                      href="#contact"
                      className="group inline-flex w-fit items-center gap-3 text-sm font-medium"
                    >
                      <span className="relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-100 after:bg-foreground after:transition-transform after:duration-300 group-hover:after:scale-x-0">
                        Start a project
                      </span>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          aria-hidden
                        >
                          <path
                            d="M7 17L17 7M9 7h8v8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </a>

                    <div className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.16em]">
                      <button
                        type="button"
                        onClick={() =>
                          setActive(
                            (i) => (i - 1 + services.length) % services.length
                          )
                        }
                        className="rounded-md px-2.5 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        Prev
                      </button>
                      <span className="px-2 tabular-nums text-foreground">
                        {String(active + 1).padStart(2, "0")}
                        <span className="text-muted-foreground">
                          /{String(services.length).padStart(2, "0")}
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setActive((i) => (i + 1) % services.length)
                        }
                        className="rounded-md px-2.5 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
