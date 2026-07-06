"use client"

import { motion } from "framer-motion"
import { LayoutTemplate, Store, Newspaper, Building2 } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const services: {
  title: string
  description: string
  icon: LucideIcon
  tags: string[]
}[] = [
  {
    title: "Front-end Development",
    description:
      "Modern, responsive interfaces with clean UI, smooth interactions, and fast load times — from landing pages to full web app experiences.",
    icon: LayoutTemplate,
    tags: ["Responsive", "Modern UI", "Performance"],
  },
  {
    title: "Custom Website for Businesses",
    description:
      "Business-focused websites tailored to your brand, goals, and audience — built to look professional, rank well, and turn visitors into customers.",
    icon: Store,
    tags: ["Brand-focused", "SEO-ready", "Custom fit"],
  },
  {
    title: "Website blogs",
    description:
      "Content-driven blog platforms with readable layouts, simple publishing workflows, and SEO-friendly structure — made for updates, stories, and articles.",
    icon: Newspaper,
    tags: ["Content-first", "Easy to manage", "SEO-friendly"],
  },
  {
    title: "Internal Company Management Systems",
    description:
      "End-to-end internal tools for HR, inventory, attendance, and data management — one reliable platform for your team's day-to-day operations.",
    icon: Building2,
    tags: ["HR", "Inventory", "Operations"],
  },
]

function ServiceCard({
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease }}
      viewport={{ once: true, margin: "-40px" }}
      className="group relative h-full"
    >
      <div className="relative h-full overflow-hidden rounded-xl px-4 py-5 transition-all duration-300 hover:bg-primary/[0.04] md:px-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 font-mono text-[11px] text-primary/40">{number}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <Icon
                className="h-4 w-4 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.6}
              />
              <h4 className="font-sans text-[1.05rem] font-normal leading-snug tracking-tight md:text-lg">
                {service.title}
              </h4>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            <p className="mt-3 font-mono text-[10px] text-muted-foreground/80">
              {service.tags.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="mb-10 max-w-2xl">
            <h3 className="mb-3 font-sans text-xl font-normal tracking-tight md:text-2xl">
              Services I Offer
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              From front-end builds and business websites to blogs and internal systems — I deliver
              digital solutions that look professional and work reliably for your team.
            </p>
          </div>

          <div className="grid gap-1 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-6">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
