"use client"

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import type { ComponentType, SVGProps } from "react"
import {
  MapPinIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  CakeIcon,
  PaintBrushIcon,
  ServerStackIcon,
  CubeIcon,
  CodeBracketIcon,
  BoltIcon,
  PuzzlePieceIcon,
  ViewfinderCircleIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>

const profileMeta = {
  location: "Puerto Princesa, PH",
  course: "Information Technology",
  school: "Palawan State University",
  age: 23,
}

const stats: {
  value: number
  suffix: string
  label: string
  hint: string
  fill: number
}[] = [
  { value: 5, suffix: "+", label: "Projects Built", hint: "Shipped & live", fill: 55 },
  { value: 12, suffix: "+", label: "Technologies", hint: "In active use", fill: 78 },
  { value: 1, suffix: "+", label: "Years Coding", hint: "And climbing", fill: 32 },
  { value: 100, suffix: "%", label: "Dedication", hint: "On every brief", fill: 100 },
]

const strengths: {
  icon: HeroIcon
  title: string
  short: string
  desc: string
  tags: string[]
  motif: string
}[] = [
  {
    icon: PaintBrushIcon,
    title: "Frontend",
    short: "UI",
    desc: "Interfaces that feel fast, clear, and intentional — motion with purpose, not decoration.",
    tags: ["UI", "Responsive", "Motion"],
    motif: "from-sky-500/20 via-primary/10 to-transparent",
  },
  {
    icon: ServerStackIcon,
    title: "Backend",
    short: "API",
    desc: "Solid APIs and data layers that keep the product reliable when traffic and features grow.",
    tags: ["APIs", "Data", "Logic"],
    motif: "from-cyan-500/15 via-primary/10 to-transparent",
  },
  {
    icon: CubeIcon,
    title: "Custom Systems",
    short: "SYS",
    desc: "Internal tools shaped around real workflows — HR, inventory, ops — not generic templates.",
    tags: ["Tailored", "Ops", "Secure"],
    motif: "from-blue-600/20 via-slate-500/10 to-transparent",
  },
  {
    icon: CodeBracketIcon,
    title: "Full-stack",
    short: "E2E",
    desc: "Own the path from first wireframe to production deploy — one cohesive experience end to end.",
    tags: ["Delivery", "Scope", "Ship"],
    motif: "from-primary/25 via-indigo-500/10 to-transparent",
  },
]

const workPrinciples: {
  label: string
  short: string
  detail: string
  icon: HeroIcon
  keyword: string
}[] = [
  {
    label: "Clean User Interface",
    short: "UI Craft",
    keyword: "Clarity",
    detail:
      "Layouts that feel intentional — clear hierarchy, spacing that breathes, and visuals that support the product.",
    icon: PaintBrushIcon,
  },
  {
    label: "Fast Response",
    short: "Velocity",
    keyword: "Speed",
    detail:
      "Clear communication and steady progress so stakeholders always know what's next and when it lands.",
    icon: BoltIcon,
  },
  {
    label: "Problem Solver",
    short: "Systems",
    keyword: "Logic",
    detail:
      "Break down messy requirements into focused flows and interfaces people can actually use.",
    icon: PuzzlePieceIcon,
  },
  {
    label: "Client Focused",
    short: "Outcomes",
    keyword: "Impact",
    detail:
      "Every decision ties back to the outcome you care about — clarity, trust, and results for real users.",
    icon: ViewfinderCircleIcon,
  },
]

const ease = [0.22, 1, 0.36, 1] as const

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * to))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, to])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

/** What I Bring — stage + rail (major layout) */
function PrinciplesStage() {
  const [active, setActive] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const current = workPrinciples[active]
  const Icon = current.icon

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-primary/15 bg-background/40">
      {/* Stage */}
      <div className="relative min-h-[13.5rem] overflow-hidden border-b border-primary/10 p-5 md:min-h-[14.5rem] md:p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--foreground)/0.04)_1px,transparent_0)] bg-[size:16px_16px]"
        />

        <div className="relative flex h-full flex-col justify-between gap-6">
          <div className="flex items-start justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/70">
              Principle {String(active + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {current.keyword}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.label}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease }}
              className="flex items-end gap-4"
            >
              <Icon className="mb-1 h-7 w-7 shrink-0 text-primary" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {current.short}
                </p>
                <h4 className="mt-1 font-sans text-xl font-normal leading-tight tracking-tight md:text-2xl">
                  {current.label}
                </h4>
                <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground md:text-sm">
                  {current.detail}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Rail */}
      <div
        role="tablist"
        aria-label="Principles"
        className="grid grid-cols-2 sm:grid-cols-4"
      >
        {workPrinciples.map((item, index) => {
          const isActive = active === index
          const RailIcon = item.icon
          return (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              className={cn(
                "relative flex flex-col items-start gap-2 border-primary/10 p-3 text-left transition-colors md:p-3.5",
                index % 2 === 0 && "border-r sm:border-r",
                index < 2 && "border-b sm:border-b-0",
                index < 3 && "sm:border-r",
                isActive ? "bg-primary/[0.07]" : "hover:bg-primary/[0.03]"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={prefersReducedMotion ? undefined : "principle-rail"}
                  className="absolute inset-x-0 top-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                <RailIcon className="h-3.5 w-3.5 text-primary/70" aria-hidden />
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "font-sans text-xs leading-snug tracking-tight md:text-sm",
                  isActive ? "text-foreground" : "text-foreground/55"
                )}
              >
                {item.short}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** At a Glance — kinetic metric board */
function MetricBoard() {
  const [active, setActive] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const boardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(boardRef, { once: true, margin: "-40px" })

  return (
    <div
      ref={boardRef}
      className="mt-4 overflow-hidden rounded-2xl border border-primary/15 bg-background/30"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const isActive = active === index
          return (
            <button
              key={stat.label}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              className={cn(
                "group relative flex flex-col items-start gap-3 border-primary/10 p-4 text-left transition-colors md:p-5",
                index % 2 === 0 && "border-r",
                index < 2 && "border-b lg:border-b-0",
                index === 2 && "border-r lg:border-r",
                index < 3 && "lg:border-r",
                isActive ? "bg-primary/[0.06]" : "hover:bg-primary/[0.03]"
              )}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span className="font-mono text-[10px] text-primary/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100">
                  {stat.hint}
                </span>
              </div>

              <p
                className={cn(
                  "font-sans text-4xl font-normal tabular-nums tracking-tight transition-colors md:text-5xl",
                  isActive ? "text-primary" : "text-primary/70"
                )}
              >
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>

              <div className="w-full">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {stat.label}
                </p>
                <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-primary/10">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{
                      width: inView ? `${stat.fill}%` : 0,
                      opacity: isActive ? 1 : 0.45,
                    }}
                    transition={{
                      width: {
                        duration: prefersReducedMotion ? 0 : 1.1,
                        delay: prefersReducedMotion ? 0 : index * 0.1,
                        ease,
                      },
                      opacity: { duration: 0.25 },
                    }}
                  />
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** Core Strengths — expanding horizontal / stacked panels */
function StrengthsExpand() {
  const [active, setActive] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="mt-4">
      {/* Desktop: expanding row */}
      <div className="hidden h-[17rem] gap-2 md:flex">
        {strengths.map((item, index) => {
          const Icon = item.icon
          const isActive = active === index
          return (
            <motion.button
              key={item.title}
              type="button"
              layout
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              animate={{
                flexGrow: isActive ? 2.4 : 0.7,
              }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className={cn(
                "relative flex h-full min-w-0 basis-0 flex-col overflow-hidden rounded-2xl border text-left",
                isActive
                  ? "border-primary/35 bg-card/80"
                  : "border-primary/10 bg-background/40"
              )}
            >
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80",
                  item.motif
                )}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] bg-[size:1.25rem_1.25rem] opacity-30"
              />

              <div className="relative flex h-full flex-col p-4 md:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-primary/55">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {item.short}
                  </span>
                </div>

                <div className="mt-auto">
                  <Icon
                    className={cn(
                      "mb-3 text-primary",
                      isActive ? "h-6 w-6" : "h-4 w-4"
                    )}
                    aria-hidden
                  />

                  <p
                    className={cn(
                      "font-sans font-normal tracking-tight",
                      isActive ? "text-xl" : "text-sm"
                    )}
                  >
                    {item.title}
                  </p>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="body"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={prefersReducedMotion ? undefined : { opacity: 0, y: 6 }}
                        transition={{ duration: 0.25, ease }}
                        className="mt-2"
                      >
                        <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
                          {item.desc}
                        </p>
                        <p className="mt-3 font-mono text-[10px] text-primary/80">
                          {item.tags.join(" · ")}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                          Focus area
                          <ArrowUpRightIcon className="h-3 w-3" aria-hidden />
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isActive && (
                    <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-muted-foreground/80">
                      {item.tags[0]}
                    </p>
                  )}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Mobile: stacked stage cards */}
      <div className="space-y-2 md:hidden">
        {strengths.map((item, index) => {
          const Icon = item.icon
          const isActive = active === index
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-colors",
                isActive
                  ? "border-primary/30 bg-primary/[0.05]"
                  : "border-primary/10 bg-background/40"
              )}
            >
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70",
                  item.motif
                )}
              />
              <div className="relative flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-sans text-base tracking-tight">{item.title}</p>
                    <span className="font-mono text-[9px] text-muted-foreground">
                      {item.short}
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isActive ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease }}
                        className="overflow-hidden"
                      >
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          {item.desc}
                        </p>
                        <p className="mt-2 font-mono text-[10px] text-primary/80">
                          {item.tags.join(" · ")}
                        </p>
                      </motion.div>
                    ) : (
                      <p className="mt-1 text-xs text-muted-foreground">{item.short} · tap to expand</p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-x-hidden px-4 py-14 md:px-8 lg:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.4)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)] opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading number="I" title="About Me" className="mb-8 md:mb-9" />

        <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Profile */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Profile
            </p>

            <div className="mt-4 flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="relative h-28 w-28 shrink-0 lg:h-[7.5rem] lg:w-[7.5rem]">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-dashed border-primary/25"
                />
                <div className="absolute inset-[5px] overflow-hidden rounded-full">
                  <Image
                    src="/profile.png"
                    alt="John Aivanne Molato"
                    fill
                    className="object-cover object-center"
                    sizes="256px"
                    quality={95}
                    priority
                  />
                </div>
                <span className="absolute bottom-1 right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </div>

              <h3 className="mt-4 font-sans text-lg font-normal tracking-tight md:text-xl">
                John Aivanne Molato
              </h3>
              <p className="mt-1 font-mono text-sm text-muted-foreground">Full-stack Web Developer</p>

              <div className="mt-4 space-y-2 font-mono text-xs text-muted-foreground">
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 lg:justify-start">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPinIcon className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {profileMeta.location}
                  </span>
                  <span className="hidden text-primary/30 sm:inline">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <AcademicCapIcon className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {profileMeta.course}
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 lg:justify-start">
                  <span className="inline-flex items-center gap-1.5">
                    <BuildingLibraryIcon className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {profileMeta.school}
                  </span>
                  <span className="hidden text-primary/30 sm:inline">·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <CakeIcon className="h-3.5 w-3.5 text-primary" aria-hidden />
                    {profileMeta.age} years old
                  </span>
                </div>
              </div>
            </div>

            <div id="about-what-i-bring" className="mt-6 border-t border-primary/10 pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                What I Bring
              </p>
              <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-muted-foreground">
                An interactive principle board — switch the stage to see how I work.
              </p>
              <PrinciplesStage />
            </div>
          </motion.div>

          {/* Story + metrics + strengths */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <h3 className="font-sans text-[clamp(1.35rem,3.5vw,1.85rem)] font-normal leading-snug tracking-tight">
              Turning ideas into functional digital experiences.
            </h3>

            <div className="mt-5 space-y-3 text-muted-foreground">
              <p className="leading-relaxed">
                I&apos;m a passionate Full-stack Web Developer from the Philippines who specializes
                in building modern, responsive, and user-friendly web applications — from polished
                business websites to full custom systems.
              </p>
              <p className="leading-relaxed">
                I love turning complex problems into simple, intuitive designs that look great and
                deliver an exceptional experience. When I&apos;m not coding, I&apos;m exploring new
                technologies and sharpening my craft.
              </p>
            </div>

            <div className="mt-7">
              <div className="flex items-end justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  At a glance
                </p>
                <p className="hidden font-mono text-[10px] text-muted-foreground/70 sm:block">
                  Hover a metric to focus
                </p>
              </div>
              <MetricBoard />
            </div>

            <div className="mt-7">
              <div className="flex items-end justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Core strengths
                </p>
                <p className="hidden font-mono text-[10px] text-muted-foreground/70 sm:block">
                  Expand a panel
                </p>
              </div>
              <StrengthsExpand />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
