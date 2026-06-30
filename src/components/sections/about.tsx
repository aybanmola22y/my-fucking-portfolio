"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { MapPin, GraduationCap, Code2, Palette, Server, Boxes, Sparkles, Zap, Puzzle, Target } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const stats: { value: number; suffix: string; label: string }[] = [
  { value: 5, suffix: "+", label: "Projects Built" },
  { value: 12, suffix: "+", label: "Technologies" },
  { value: 1, suffix: "+", label: "Years Coding" },
  { value: 100, suffix: "%", label: "Dedication" },
]

const services: { icon: LucideIcon; title: string; desc: string; tags: string[] }[] = [
  { icon: Palette, title: "Frontend", desc: "Clean, responsive interfaces", tags: ["UI", "Responsive", "Modern"] },
  { icon: Server, title: "Backend", desc: "Reliable APIs & databases", tags: ["APIs", "Databases", "Logic"] },
  { icon: Boxes, title: "Custom Systems", desc: "Tailored business tools", tags: ["Tailored", "Scalable", "Secure"] },
  { icon: Code2, title: "Full-stack", desc: "End-to-end solutions", tags: ["End-to-end", "Full scope", "Delivery"] },
]

const workPrinciples: { label: string; desc: string; icon: LucideIcon }[] = [
  { label: "Clean User Interface", desc: "Modern, polished interfaces", icon: Sparkles },
  { label: "Fast Response", desc: "Quick replies & delivery", icon: Zap },
  { label: "Problem Solver", desc: "Complex needs, simple solutions", icon: Puzzle },
  { label: "Client Focused", desc: "Built around your goals", icon: Target },
]

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

function StatItem({
  stat,
  index,
}: {
  stat: (typeof stats)[number]
  index: number
}) {
  const ease = [0.22, 1, 0.36, 1] as const
  const number = String(index + 1).padStart(2, "0")

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease }}
      viewport={{ once: true }}
      className="group relative px-2 text-center sm:px-4"
    >
      <span className="font-mono text-[10px] text-primary/40">{number}</span>
      <p className="mt-1 text-3xl font-normal tabular-nums text-primary transition-transform duration-300 group-hover:scale-105 md:text-4xl">
        <Counter to={stat.value} suffix={stat.suffix} />
      </p>
      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        {stat.label}
      </p>
    </motion.div>
  )
}

function StrengthCard({
  service,
  index,
}: {
  service: (typeof services)[number]
  index: number
}) {
  const Icon = service.icon
  const number = String(index + 1).padStart(2, "0")
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.08, ease }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl border border-primary/10 p-4 transition-all duration-300 hover:border-primary/25 hover:bg-primary/[0.03] md:p-5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary/70 via-primary/30 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
        <div className="pointer-events-none absolute inset-y-3 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-y-100" />

        <div className="flex items-start gap-3">
          <span className="mt-0.5 font-mono text-[11px] text-primary/40">{number}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Icon
                className="h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.6}
              />
              <p className="font-sans font-normal text-base leading-none tracking-tight lowercase">
                {service.title}
              </p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{service.desc}</p>
            <p className="mt-3 font-mono text-[10px] text-muted-foreground/80">
              {service.tags.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PrincipleItem({
  item,
  index,
}: {
  item: (typeof workPrinciples)[number]
  index: number
}) {
  const Icon = item.icon
  const number = String(index + 1).padStart(2, "0")
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease }}
      viewport={{ once: true }}
      className="group relative flex items-start gap-3 overflow-hidden rounded-xl px-3 py-3 transition-all duration-300 hover:bg-primary/[0.04]"
    >
      <div className="pointer-events-none absolute inset-y-2 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-y-100" />
      <span className="mt-0.5 font-mono text-[11px] text-primary/40">{number}</span>
      <Icon
        className="mt-0.5 h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110"
        strokeWidth={1.6}
      />
      <div className="min-w-0 text-left">
        <p className="text-sm font-medium leading-none">{item.label}</p>
        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{item.desc}</p>
      </div>
    </motion.div>
  )
}

export function AboutSection() {
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section id="about" className="relative overflow-hidden py-24 px-4 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.4)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)] opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading number="I" title="about me" />

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
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

            <div className="mt-5 flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="relative h-32 w-32 shrink-0">
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-dashed border-primary/25"
                />
                <div className="absolute inset-[5px] overflow-hidden rounded-full">
                  <Image
                    src="/profile.png"
                    alt="John Aivanne Molato"
                    fill
                    className="object-cover object-[50%_22%]"
                    sizes="128px"
                    priority
                  />
                </div>
                <span className="absolute bottom-1 right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </div>

              <h3 className="mt-5 font-sans font-normal text-xl tracking-tight">John Aivanne Molato</h3>
              <p className="mt-1 font-mono text-sm text-muted-foreground">Full-stack Web Developer</p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground lg:justify-start">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" strokeWidth={1.6} />
                  Puerto Princesa, PH
                </span>
                <span className="hidden text-primary/30 sm:inline">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-primary" strokeWidth={1.6} />
                  Information Technology
                </span>
              </div>
            </div>

            <div className="mt-8 border-t border-primary/10 pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                What I Bring
              </p>
              <div className="mt-3 grid gap-0.5">
                {workPrinciples.map((item, index) => (
                  <PrincipleItem key={item.label} item={item} index={index} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Story + stats */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <h3 className="font-sans font-normal text-[clamp(1.35rem,3.5vw,1.85rem)] leading-snug tracking-tight lowercase">
              turning ideas into functional digital experiences.
            </h3>

            <div className="mt-5 space-y-4 text-muted-foreground">
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

            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                At a glance
              </p>
              <div className="mt-4 grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-y-0">
                {stats.map((stat, index) => (
                  <StatItem key={stat.label} stat={stat} index={index} />
                ))}
              </div>
            </div>

            <div className="mt-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Core strengths
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {services.map((service, index) => (
                  <StrengthCard key={service.title} service={service} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
