"use client"

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import type { ComponentType, SVGProps } from "react"
import {
  MapPinIcon,
  PaintBrushIcon,
  ServerStackIcon,
  CubeIcon,
  CodeBracketIcon,
  BoltIcon,
  ViewfinderCircleIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"

type HeroIcon = ComponentType<SVGProps<SVGSVGElement>>

const profileMeta = {
  location: "Puerto Princesa, PH",
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
  { value: 24, suffix: "h", label: "Response Time", hint: "Typical reply window", fill: 85 },
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
    label: "Clean Aesthetics",
    short: "UI Taste",
    keyword: "Polish",
    detail:
      "Visuals that feel refined without noise — balanced type, calm color, and spacing that lets the product breathe.",
    icon: SwatchIcon,
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

/** What I Bring — principle theater (big numeral + morph) */
function PrinciplesStage() {
  const [active, setActive] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const current = workPrinciples[active]
  const Icon = current.icon

  const go = (dir: -1 | 1) => {
    setActive((i) => (i + dir + workPrinciples.length) % workPrinciples.length)
  }

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-border/70 bg-background/50">
      <div className="relative min-h-[15.5rem] p-5 md:min-h-[16.5rem] md:p-6">
        {/* Keyword stacked above the watermark — top-right only */}
        <div className="pointer-events-none absolute right-3 top-2 z-0 flex w-[7.5rem] flex-col items-end md:right-5 md:top-3 md:w-[9rem]">
          <AnimatePresence mode="wait">
            <motion.span
              key={`kw-${active}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25, ease }}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
            >
              {current.keyword}
            </motion.span>
          </AnimatePresence>
          <motion.span
            key={`wm-${active}`}
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease }}
            aria-hidden
            className="mt-0.5 select-none font-sans text-[4.75rem] font-normal leading-none tracking-tighter text-primary/[0.07] md:text-[6rem]"
          >
            {String(active + 1).padStart(2, "0")}
          </motion.span>
        </div>

        <div className="relative z-10 flex h-full min-h-[13rem] flex-col">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              <Icon className="h-3.5 w-3.5" aria-hidden />
              {current.short}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.label}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease }}
              className="mt-6 max-w-[min(100%,18rem)] pr-2 md:max-w-[16.5rem]"
            >
              <h4 className="font-sans text-[1.55rem] font-normal leading-[1.15] tracking-tight md:text-[1.85rem]">
                {current.label}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {current.detail}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-auto flex items-center justify-between gap-3 pt-8">
            <div className="flex gap-1.5">
              {workPrinciples.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Principle ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    i === active
                      ? "w-7 bg-primary"
                      : "w-3 bg-border hover:bg-muted-foreground/40"
                  )}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous principle"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <span className="sr-only">Prev</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next principle"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <span className="sr-only">Next</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** At a Glance — one hero metric, selectable from a side stack */
function MetricBoard() {
  const [active, setActive] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const current = stats[active]

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-border/70 bg-background/40">
      <div className="grid md:grid-cols-[1.2fr_0.9fr]">
        {/* Hero number */}
        <div className="relative flex min-h-[12rem] flex-col justify-between border-b border-border/70 p-6 md:min-h-[14rem] md:border-b-0 md:border-r md:p-8">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Metric {String(active + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {current.hint}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.label}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease }}
              className="py-4"
            >
              <p className="font-sans text-[clamp(3.5rem,10vw,5.5rem)] font-normal leading-none tracking-tight text-primary">
                <Counter key={current.label} to={current.value} suffix={current.suffix} />
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-foreground">
                {current.label}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Fill bar for the active metric */}
          <div className="h-1 w-full overflow-hidden rounded-full bg-primary/10">
            <motion.div
              key={`fill-${active}`}
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${current.fill}%` }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease }}
            />
          </div>
        </div>

        {/* Selectors */}
        <div className="flex flex-col" role="tablist" aria-label="Metrics">
          {stats.map((stat, index) => {
            const isActive = active === index
            return (
              <button
                key={stat.label}
                type="button"
                role="tab"
                aria-selected={isActive}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={cn(
                  "relative flex flex-1 items-center justify-between gap-3 border-border/60 px-5 py-4 text-left transition-colors",
                  index < stats.length - 1 && "border-b",
                  isActive ? "bg-primary/[0.06]" : "hover:bg-muted/40"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId={prefersReducedMotion ? undefined : "metric-side"}
                    className="absolute inset-y-0 left-0 w-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <div>
                  <p
                    className={cn(
                      "font-sans text-lg tabular-nums tracking-tight transition-colors",
                      isActive ? "text-primary" : "text-foreground/70"
                    )}
                  >
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/** Core Strengths — bento mosaic (active cell grows) */
function StrengthsExpand() {
  const [active, setActive] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="mt-4">
      {/* Desktop bento — active fills left stage, others stack right */}
      <div className="hidden h-[26rem] grid-cols-3 grid-rows-3 gap-2 md:grid">
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
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className={cn(
                "relative overflow-hidden rounded-2xl border text-left",
                isActive
                  ? "col-span-2 row-span-3 border-primary/30 bg-primary/[0.04]"
                  : "col-span-1 row-span-1 border-border/70 bg-background/40 hover:border-primary/20"
              )}
            >
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70",
                  item.motif
                )}
              />
              <div className="relative flex h-full flex-col p-4 md:p-5">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "font-mono text-[10px] tabular-nums",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    className={cn(
                      "text-primary transition-all duration-300",
                      isActive ? "h-6 w-6" : "h-4 w-4 opacity-70"
                    )}
                    aria-hidden
                  />
                </div>

                <div className="mt-auto">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {item.short}
                  </p>
                  <p
                    className={cn(
                      "mt-1 font-sans font-normal tracking-tight",
                      isActive ? "text-2xl" : "text-sm"
                    )}
                  >
                    {item.title}
                  </p>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="body"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.28, ease }}
                        className="mt-3"
                      >
                        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                          {item.desc}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-primary/20 bg-background/60 px-2.5 py-1 font-mono text-[10px] text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Mobile — stacked promote */}
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
                  : "border-border/70 bg-background/40"
              )}
            >
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
                    {isActive && (
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
        <SectionHeading number="I" title="About Me" className="mb-6 md:mb-8" />

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
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

            {/* Compact horizontal identity */}
            <div className="mt-4 flex items-start gap-4 sm:gap-5">
              <div className="relative h-[4.75rem] w-[4.75rem] shrink-0 sm:h-[5.25rem] sm:w-[5.25rem]">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-dashed border-primary/25"
                />
                <div className="absolute inset-[4px] overflow-hidden rounded-full">
                  <Image
                    src="/profile.png"
                    alt="John Aivanne Molato"
                    fill
                    className="object-cover object-center"
                    sizes="128px"
                    quality={95}
                    priority
                  />
                </div>
                <span className="absolute bottom-0.5 right-0.5 z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background bg-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <h3 className="font-sans text-lg font-normal tracking-tight md:text-xl">
                  John Aivanne Molato
                </h3>
                <p className="mt-0.5 font-mono text-sm text-muted-foreground">
                  Full-stack Web Developer
                </p>

                <div className="mt-3 font-mono text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                    {profileMeta.location}
                  </span>
                </div>
              </div>
            </div>

            <div id="about-what-i-bring" className="mt-7 border-t border-primary/10 pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                What I Bring
              </p>
              <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-muted-foreground">
                How I work — flip through the principles.
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
            <h3 className="font-sans text-[clamp(1.4rem,3.2vw,1.9rem)] font-normal leading-snug tracking-tight">
              Turning ideas into functional digital experiences.
            </h3>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              <p>
                I&apos;m a passionate Full-stack Web Developer from the Philippines who specializes
                in building modern, responsive, and user-friendly web applications — from polished
                business websites to full custom systems.
              </p>
              <p>
                I love turning complex problems into simple, intuitive designs that look great and
                deliver an exceptional experience. When I&apos;m not coding, I&apos;m exploring new
                technologies and sharpening my craft.
              </p>
            </div>

            <div className="mt-8">
              <div className="flex items-end justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  At a glance
                </p>
                <p className="hidden font-mono text-[10px] text-muted-foreground/70 sm:block">
                  Select a metric to spotlight
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
                  Hover a tile to promote it
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
