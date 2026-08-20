"use client"

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion"
import { useEffect, useState, type MouseEvent } from "react"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSmoothScroll } from "@/components/smooth-scroll"
import { HeroMiniGame } from "@/components/hero-mini-game"
import { cn } from "@/lib/utils"

const heroLinks = [
  { label: "view projects", href: "#projects" },
  { label: "my stack", href: "#skills" },
  { label: "get in touch", href: "#contact" },
]

const typedPhrases = ["functional", "digital products", "custom systems", "clear interfaces"]

const brand = "TheAivanneEffect"
const ease = [0.22, 1, 0.36, 1] as const

function useTypeCycle(phrases: string[], enabled: boolean) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setText(phrases[0] ?? "")
      return
    }

    const current = phrases[index % phrases.length]
    const delay = deleting ? 36 : text === current ? 1600 : 55

    const id = window.setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true)
        return
      }
      if (deleting && text === "") {
        setDeleting(false)
        setIndex((i) => (i + 1) % phrases.length)
        return
      }
      const nextLen = text.length + (deleting ? -1 : 1)
      setText(current.slice(0, nextLen))
    }, delay)

    return () => window.clearTimeout(id)
  }, [text, deleting, index, phrases, enabled])

  return text
}

export function HeroSection() {
  const smoothScroll = useSmoothScroll()
  const prefersReducedMotion = useReducedMotion()
  const typed = useTypeCycle(typedPhrases, !prefersReducedMotion)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const springX = useSpring(mouseX, { stiffness: 70, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 70, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${springX}% ${springY}%, hsl(var(--primary) / 0.12), transparent 55%)`

  const scrollToAbout = () => {
    if (smoothScroll) {
      smoothScroll.scrollToSection("about", { padding: 20, align: "start" })
      return
    }
    const about = document.getElementById("about")
    if (!about) return
    const top = about.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top - 20, behavior: "smooth" })
  }

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100)
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <section
      id="home"
      onMouseMove={onMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Soft interactive wash (works in light mode too) */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-90 dark:opacity-50"
          style={{ background: spotlight }}
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06),transparent_60%)] dark:bg-none"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.45)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.45)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_18%,transparent_70%)] opacity-40 dark:opacity-20"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center">
        {/* Brand — 3D flip / tumble reveal */}
        <h1
          className="font-sans text-[clamp(2.25rem,7vw,4.5rem)] font-normal leading-[1.05] tracking-tight text-foreground"
          style={{ perspective: "800px" }}
        >
          <span className="sr-only">{brand}</span>
          <span
            aria-hidden
            className="group inline-flex flex-wrap justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {brand.split("").map((char, i) => {
              const isAccent = i >= 3 && i <= 9 // "Aivanne"
              const tumbleDir = i % 2 === 0 ? 1 : -1
              return (
                <motion.span
                  key={`${char}-${i}`}
                  initial={
                    prefersReducedMotion
                      ? false
                      : {
                          opacity: 0,
                          rotateX: tumbleDir * 90,
                          rotateZ: tumbleDir * 8,
                          y: tumbleDir * 18,
                          filter: "blur(4px)",
                        }
                  }
                  animate={{
                    opacity: 1,
                    rotateX: 0,
                    rotateZ: 0,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.65,
                    delay: 0.08 + i * 0.055,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          rotateX: tumbleDir * -18,
                          y: -3,
                          color: "hsl(var(--primary))",
                          transition: { duration: 0.25 },
                        }
                  }
                  className={cn(
                    "inline-block origin-bottom cursor-default will-change-transform",
                    isAccent && "group-hover:text-primary"
                  )}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {char}
                </motion.span>
              )
            })}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.45, ease }}
          className="mx-auto mt-5 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          Full-stack web developer. I build modern websites and custom systems.
        </motion.p>

        {/* Typing line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-5 flex min-h-[1.5rem] items-center justify-center gap-2.5 font-mono text-xs text-muted-foreground sm:text-sm"
        >
          <span>Turning imagination into</span>
          <span className="relative inline-flex min-w-[15ch] justify-start text-left text-foreground">
            <span className="text-primary">{typed}</span>
            <motion.span
              aria-hidden
              animate={
                prefersReducedMotion ? undefined : { opacity: [1, 0, 1] }
              }
              transition={{ duration: 0.9, repeat: Infinity }}
              className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-primary"
            />
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.75, ease }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12"
        >
          {heroLinks.map((link, index) => (
            <motion.div
              key={link.href}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              <Button
                variant={index === heroLinks.length - 1 ? "default" : "outline"}
                className="font-mono text-xs lowercase tracking-wide shadow-sm transition-shadow hover:shadow-md hover:shadow-primary/10"
                asChild
              >
                <a href={link.href}>{link.label}</a>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.88, ease }}
          className="mt-5 mb-12"
        >
          <HeroMiniGame />
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          type="button"
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="group inline-flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Scroll to about"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
            Explore
          </span>
          <motion.span
            animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm transition-colors group-hover:border-primary/40"
          >
            <ArrowDown className="h-4 w-4" strokeWidth={1.75} />
          </motion.span>
        </motion.button>
      </div>
    </section>
  )
}
