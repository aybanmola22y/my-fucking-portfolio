"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import {
  ComputerDesktopIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  CubeTransparentIcon,
  ArrowUpRightIcon,
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
    <section id="services" className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-3 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Services
              </p>
              <h3 className="mt-2 font-sans text-2xl font-normal tracking-tight md:text-3xl">
                What I can build for you
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Hover or tap a service to explore scope, outcome, and focus areas.
            </p>
          </div>

          {/* Desktop — expanding panels */}
          <div className="mt-8 hidden h-[22rem] gap-2 md:flex">
            {services.map((service, index) => {
              const ItemIcon = service.icon
              const isActive = active === index

              return (
                <motion.button
                  key={service.title}
                  type="button"
                  layout
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  animate={{ flexGrow: isActive ? 2.6 : 0.65 }}
                  transition={{ type: "spring", stiffness: 280, damping: 30 }}
                  className={cn(
                    "relative flex h-full min-w-0 basis-0 flex-col overflow-hidden rounded-2xl border text-left transition-colors",
                    isActive
                      ? "border-primary/30 bg-primary/[0.04]"
                      : "border-border bg-background/40 hover:border-primary/20"
                  )}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.08),transparent_55%)] opacity-0 transition-opacity duration-300"
                    style={{ opacity: isActive ? 1 : 0 }}
                  />

                  <div className="relative flex h-full flex-col p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "font-mono text-[11px] tabular-nums",
                          isActive ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <ItemIcon
                        className={cn(
                          "transition-all duration-300",
                          isActive ? "h-5 w-5 text-primary" : "h-4 w-4 text-primary/50"
                        )}
                        aria-hidden
                      />
                    </div>

                    <div className="mt-auto">
                      <p
                        className={cn(
                          "font-mono text-[10px] uppercase tracking-[0.16em]",
                          isActive ? "text-primary/80" : "text-muted-foreground"
                        )}
                      >
                        {service.short}
                      </p>
                      <h4
                        className={cn(
                          "mt-2 font-sans font-normal tracking-tight",
                          isActive ? "text-xl md:text-2xl" : "text-sm"
                        )}
                      >
                        {service.title}
                      </h4>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            key="body"
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 6 }}
                            transition={{ duration: 0.28, ease }}
                            className="mt-4"
                          >
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {service.description}
                            </p>
                            <p className="mt-4 text-sm text-foreground/85">{service.outcome}</p>
                            <p className="mt-5 font-mono text-[11px] text-primary/80">
                              {service.tags.join(" · ")}
                            </p>
                            <span className="mt-6 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                              Available to start
                              <ArrowUpRightIcon className="h-3 w-3" aria-hidden />
                            </span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Mobile — index + detail */}
          <div className="mt-6 md:hidden">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {services.map((service, index) => (
                <button
                  key={service.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1.5 font-mono text-[11px] transition-colors",
                    active === index
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {String(index + 1).padStart(2, "0")} · {service.short}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
                className="mt-5 rounded-2xl border border-border p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] text-primary">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <h4 className="mt-3 font-sans text-xl font-normal tracking-tight">{current.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {current.description}
                </p>
                <p className="mt-3 text-sm text-foreground/85">{current.outcome}</p>
                <p className="mt-4 font-mono text-[11px] text-primary/80">
                  {current.tags.join(" · ")}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
