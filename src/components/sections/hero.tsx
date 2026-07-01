"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const heroLinks = [
  { label: "view projects", href: "#projects" },
  { label: "my stack", href: "#skills" },
  { label: "get in touch", href: "#contact" },
]

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans font-normal text-[clamp(2.25rem,7vw,4.5rem)] leading-[1.05] tracking-tight text-foreground"
        >
          John Aivanne Molato
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-5 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          Full-stack web developer. I build modern websites and custom systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex items-center justify-center gap-2 font-mono text-xs text-muted-foreground sm:text-sm"
        >
          <span>Turning imagination into functional</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="h-4 w-0.5 bg-primary"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 mb-12 flex flex-wrap items-center justify-center gap-3 md:mt-12"
        >
          {heroLinks.map((link, index) => (
            <Button
              key={link.href}
              variant={index === heroLinks.length - 1 ? "default" : "outline"}
              className="font-mono text-xs lowercase tracking-wide"
              asChild
            >
              <a href={link.href}>{link.label}</a>
            </Button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            variant="ghost"
            size="lg"
            className="animate-bounce"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
