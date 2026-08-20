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
  CheckIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  SparklesIcon,
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
  slug: string
}[] = [
  {
    label: "Clean User Interface",
    short: "UI Craft",
    keyword: "Clarity",
    slug: "clarity",
    detail:
      "Layouts that feel intentional — clear hierarchy, spacing that breathes, and visuals that support the product.",
    icon: PaintBrushIcon,
  },
  {
    label: "Fast Response",
    short: "Velocity",
    keyword: "Speed",
    slug: "velocity",
    detail:
      "Clear communication and steady progress so stakeholders always know what's next and when it lands.",
    icon: BoltIcon,
  },
  {
    label: "Clean Aesthetics",
    short: "UI Taste",
    keyword: "Polish",
    slug: "polish",
    detail:
      "Visuals that feel refined without noise — balanced type, calm color, and spacing that lets the product breathe.",
    icon: SwatchIcon,
  },
  {
    label: "Client Focused",
    short: "Outcomes",
    keyword: "Impact",
    slug: "impact",
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

/** Mini practice canvases — one visual language per principle */
function PrincipleCanvas({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 rounded-md border border-border/80 bg-muted/30 px-2 py-1.5">
          <MagnifyingGlassIcon className="h-3 w-3 text-muted-foreground" aria-hidden />
          <span className="h-1 w-[55%] rounded-full bg-muted-foreground/20" />
        </div>
        <div className="space-y-1">
          {[72, 52].map((w, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-md border border-border/50 bg-background px-2 py-1.5"
            >
              <span className="h-5 w-5 shrink-0 rounded bg-primary/15" />
              <span
                className="h-1 rounded-full bg-muted-foreground/25"
                style={{ width: `${w}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <span className="rounded-md bg-primary px-2.5 py-1 font-mono text-[8px] uppercase tracking-wider text-primary-foreground">
            Continue
          </span>
        </div>
      </div>
    )
  }

  if (index === 1) {
    const steps = ["Brief locked", "First draft shared", "Feedback in"]
    return (
      <div className="space-y-2">
        <ul className="space-y-1">
          {steps.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-2 rounded-md border border-border/60 bg-background px-2 py-1.5"
            >
              <span
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                  i < 2 ? "bg-primary text-primary-foreground" : "border border-border bg-muted/40"
                )}
              >
                {i < 2 ? (
                  <CheckIcon className="h-2.5 w-2.5" strokeWidth={2.5} aria-hidden />
                ) : (
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                )}
              </span>
              <span className="font-mono text-[10px] text-foreground/80">{step}</span>
              {i < 2 && (
                <span className="ml-auto font-mono text-[8px] uppercase tracking-wider text-primary/80">
                  done
                </span>
              )}
            </li>
          ))}
        </ul>
        <div>
          <div className="mb-0.5 flex justify-between font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
            <span>Cycle</span>
            <span>68%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-primary/10">
            <div className="h-full w-[68%] rounded-full bg-primary" />
          </div>
        </div>
      </div>
    )
  }

  if (index === 2) {
    return (
      <div className="space-y-2.5">
        <div className="flex items-end justify-between gap-2 px-0.5">
          {[
            { glyph: "Aa", size: "text-2xl", weight: "font-normal" },
            { glyph: "Ag", size: "text-xl", weight: "font-medium" },
            { glyph: "Av", size: "text-lg", weight: "font-semibold" },
          ].map((t) => (
            <div key={t.glyph} className="flex flex-col items-center gap-0.5">
              <span className={cn("leading-none tracking-tight text-foreground", t.size, t.weight)}>
                {t.glyph}
              </span>
              <span className="font-mono text-[7px] uppercase tracking-widest text-muted-foreground">
                type
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          {["bg-primary", "bg-foreground", "bg-background border border-border", "bg-primary/25"].map(
            (swatch, i) => (
              <span
                key={i}
                className={cn("h-5 flex-1 rounded", swatch)}
                aria-hidden
              />
            )
          )}
        </div>
      </div>
    )
  }

  // Impact
  const outcomes = [
    { icon: ChatBubbleLeftRightIcon, label: "Trust" },
    { icon: HeartIcon, label: "Clarity" },
    { icon: SparklesIcon, label: "Results" },
  ]
  return (
    <div className="space-y-2">
      <div className="flex gap-1.5">
        {outcomes.map(({ icon: OutcomeIcon, label }) => (
          <div
            key={label}
            className="flex flex-1 flex-col items-center gap-1 rounded-md border border-border/70 bg-background px-1.5 py-2"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
              <OutcomeIcon className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="rounded-md border border-dashed border-primary/25 bg-primary/[0.04] px-2.5 py-1.5">
        <p className="font-mono text-[9px] leading-relaxed text-muted-foreground">
          outcome → decision → ship
        </p>
      </div>
    </div>
  )
}

/** What I Bring — select a principle, see it in practice */
function PrinciplesStage() {
  const [active, setActive] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const current = workPrinciples[active]
  const Icon = current.icon

  const go = (dir: -1 | 1) => {
    setActive((i) => (i + dir + workPrinciples.length) % workPrinciples.length)
  }

  return (
    <div className="mt-2.5 flex min-h-0 flex-1 flex-col gap-2">
      {/* 2×2 principle picker — stretches to match practice card */}
      <div
        className="grid min-h-[7.5rem] flex-1 grid-cols-2 grid-rows-2 gap-1.5"
        role="tablist"
        aria-label="Work principles"
      >
        {workPrinciples.map((item, i) => {
          const isActive = active === i
          return (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={cn(
                "relative flex h-full flex-col justify-center rounded-lg border px-2.5 py-2 text-left transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "border-border/70 bg-background/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              )}
            >
              {isActive && (
                <span
                  aria-hidden
                  className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-primary-foreground/70"
                />
              )}
              <span
                className={cn(
                  "font-mono text-[8px] tabular-nums tracking-wider",
                  isActive ? "text-primary-foreground/65" : "text-muted-foreground/70"
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-1 block text-[11px] font-medium leading-snug tracking-tight sm:text-[12px]">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Practice card — same height share as the picker */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border/70 bg-background/70 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.35)]">
        <div className="flex shrink-0 items-center justify-between border-b border-border/60 px-3 py-1.5">
          <div className="flex items-center gap-2">
            <span className="flex gap-1" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-border" />
              <span className="h-1.5 w-1.5 rounded-full bg-border" />
              <span className="h-1.5 w-1.5 rounded-full bg-border" />
            </span>
            <span className="font-mono text-[9px] text-muted-foreground">
              principle.{current.slug}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.16em] text-primary">
            <Icon className="h-3 w-3" aria-hidden />
            {current.keyword}
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.slug}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease }}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="min-h-0 flex-1">
                <PrincipleCanvas index={active} />
              </div>
              <p className="mt-2.5 shrink-0 text-[12px] leading-snug text-muted-foreground">
                {current.detail}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-auto flex shrink-0 items-center justify-between gap-3 border-t border-border/50 pt-2">
            <span className="font-mono text-[9px] tabular-nums text-muted-foreground">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(workPrinciples.length).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-0.5">
              <div className="mr-1.5 hidden gap-1 sm:flex" aria-hidden>
                {workPrinciples.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1 rounded-full transition-all",
                      i === active ? "w-3.5 bg-primary" : "w-1.5 bg-border"
                    )}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(-1)}
                className="rounded-md px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="rounded-md px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                Next
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
    <div className="mt-2 overflow-hidden rounded-xl border border-border/70 bg-background/40">
      <div className="grid md:grid-cols-[1.15fr_0.95fr]">
        {/* Hero number */}
        <div className="relative flex min-h-[9rem] flex-col justify-between border-b border-border/70 p-4 md:min-h-[10.5rem] md:border-b-0 md:border-r md:p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
              Metric {String(active + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              {current.hint}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.label}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease }}
              className="py-1.5"
            >
              <p className="font-sans text-[clamp(2.75rem,7vw,3.75rem)] font-normal leading-none tracking-tight text-primary">
                <Counter key={current.label} to={current.value} suffix={current.suffix} />
              </p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground">
                {current.label}
              </p>
            </motion.div>
          </AnimatePresence>

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
                  "relative flex flex-1 items-center justify-between gap-2 border-border/60 px-3.5 py-2 text-left transition-colors",
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
                      "font-sans text-base tabular-nums tracking-tight transition-colors",
                      isActive ? "text-primary" : "text-foreground/70"
                    )}
                  >
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
                <span className="font-mono text-[9px] text-muted-foreground/50">
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
    <div className="mt-2">
      {/* Desktop bento — active fills left stage, others stack right */}
      <div className="hidden h-[13.5rem] grid-cols-3 grid-rows-3 gap-1.5 lg:grid xl:h-[14.5rem]">
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
                "relative overflow-hidden rounded-xl border text-left",
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
              <div className="relative flex h-full flex-col p-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "font-mono text-[9px] tabular-nums",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    className={cn(
                      "text-primary transition-all duration-300",
                      isActive ? "h-5 w-5" : "h-3.5 w-3.5 opacity-70"
                    )}
                    aria-hidden
                  />
                </div>

                <div className="mt-auto">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                    {item.short}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 font-sans font-normal tracking-tight",
                      isActive ? "text-xl" : "text-xs"
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
                        exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.25, ease }}
                        className="mt-2"
                      >
                        <p className="max-w-sm text-[12px] leading-snug text-muted-foreground">
                          {item.desc}
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-primary/20 bg-background/60 px-2 py-0.5 font-mono text-[9px] text-primary"
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

      {/* Tablet + mobile — stacked promote */}
      <div className="space-y-1.5 lg:hidden">
        {strengths.map((item, index) => {
          const Icon = item.icon
          const isActive = active === index
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative w-full overflow-hidden rounded-xl border p-3 text-left transition-colors",
                isActive
                  ? "border-primary/30 bg-primary/[0.05]"
                  : "border-border/70 bg-background/40"
              )}
            >
              <div className="relative flex items-start gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-sans text-sm tracking-tight">{item.title}</p>
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
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {item.desc}
                        </p>
                        <p className="mt-1.5 font-mono text-[10px] text-primary/80">
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
    <section
      id="about"
      className="relative overflow-x-hidden px-4 py-10 md:px-8 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.4)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)] opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl">
        <SectionHeading number="I" title="About Me" className="mb-4 md:mb-5" />

        <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-7">
          {/* Profile + principles — stretches to right column height */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            viewport={{ once: true }}
            className="flex h-full min-h-0 flex-col lg:col-span-5"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Profile
            </p>

            <div className="mt-2.5 flex items-center gap-3.5">
              <div className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-dashed border-primary/25"
                />
                <div className="absolute inset-[3px] overflow-hidden rounded-full">
                  <Image
                    src="/profile.png"
                    alt="John Aivanne Molato"
                    fill
                    className="object-cover object-center"
                    sizes="64px"
                    quality={95}
                    priority
                  />
                </div>
                <span className="absolute bottom-0 right-0 z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-background bg-emerald-500">
                  <span className="h-1 w-1 rounded-full bg-white" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-sans text-base font-normal tracking-tight sm:text-lg">
                  John Aivanne Molato
                </h3>
                <p className="font-mono text-xs text-muted-foreground sm:text-sm">
                  Full-stack Web Developer
                </p>
                <div className="mt-1.5 font-mono text-[10px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPinIcon className="h-3 w-3 shrink-0 text-primary" aria-hidden />
                    {profileMeta.location}
                  </span>
                </div>
              </div>
            </div>

            <div
              id="about-what-i-bring"
              className="mt-4 flex min-h-0 flex-1 flex-col border-t border-primary/10 pt-3.5"
            >
              <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                What I Bring
              </p>
              <p className="mt-1 max-w-xs shrink-0 text-[11px] leading-snug text-muted-foreground">
                How I work — select a principle to see it in practice.
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
            className="flex h-full flex-col lg:col-span-7"
          >
            <h3 className="font-sans text-[clamp(1.2rem,2.6vw,1.65rem)] font-normal leading-snug tracking-tight">
              Turning ideas into functional digital experiences.
            </h3>

            <div className="mt-2.5 space-y-2 text-[13px] leading-relaxed text-muted-foreground">
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

            <div className="mt-4">
              <div className="flex items-end justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  At a glance
                </p>
                <p className="hidden font-mono text-[9px] text-muted-foreground/70 sm:block">
                  Select a metric to spotlight
                </p>
              </div>
              <MetricBoard />
            </div>

            <div className="mt-3.5">
              <div className="flex items-end justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Core strengths
                </p>
                <p className="hidden font-mono text-[9px] text-muted-foreground/70 sm:block">
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
