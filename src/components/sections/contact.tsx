"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  Github,
  Linkedin,
  Facebook,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"

const EMAIL = "molatojohnaivanneofficial@gmail.com"

const details = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+63 993 739 2300",
    href: "tel:+639937392300",
    icon: Phone,
  },
  {
    label: "Location",
    value: "Puerto Princesa, Philippines",
    href: undefined as string | undefined,
    icon: MapPin,
  },
]

const socials = [
  { icon: Github, href: "https://github.com/aybanmola22y", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/john-aivanne-molato/",
    label: "LinkedIn",
  },
  { icon: Facebook, href: "https://www.facebook.com/xxxayban", label: "Facebook" },
]

const ease = [0.22, 1, 0.36, 1] as const

const fieldClass =
  "mt-2.5 w-full rounded-md border border-border/80 bg-background/60 px-3.5 py-3 text-[15px] text-foreground outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-muted-foreground/45 focus:border-primary/50 focus:bg-background focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contact" className="relative px-4 pb-16 pt-12 md:px-8 md:pb-20 md:pt-16">
      {/* Atmosphere clipped so blurs can't create page scroll */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_72%)] opacity-40" />
        <div className="absolute -left-20 top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-16 bottom-24 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          number="IV"
          title="Contact"
          description="Have a project, a question, or just want to say hi? My inbox is always open."
          className="mb-8 md:mb-10"
        />

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left — channels */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary/80">
              Open for work
            </p>
            <h3 className="mt-4 max-w-md font-sans text-[clamp(1.75rem,3.4vw,2.35rem)] font-normal leading-[1.15] tracking-tight text-foreground">
              Let&apos;s build something
              <span className="text-muted-foreground"> worth shipping.</span>
            </h3>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              Whether it&apos;s a website, a custom system, or a quick question —
              send a message and I&apos;ll get back to you within 24 hours.
            </p>

            <ul className="mt-7 space-y-3">
              {details.map((item, index) => {
                const Icon = item.icon
                const content = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border/70 bg-background/50 text-muted-foreground transition-colors duration-300 group-hover:border-primary/30 group-hover:text-primary">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="mt-1 block truncate text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                        {item.value}
                      </span>
                    </span>
                    {item.href && (
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-muted-foreground/0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                        strokeWidth={1.75}
                      />
                    )}
                  </>
                )

                return (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.12 + index * 0.06, ease }}
                    viewport={{ once: true }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        className="group flex items-center gap-4 rounded-xl border border-border/60 bg-background/40 px-4 py-3.5 transition-colors duration-300 hover:border-primary/25 hover:bg-background/70"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-4 rounded-xl border border-border/60 bg-background/40 px-4 py-3.5">
                        {content}
                      </div>
                    )}
                  </motion.li>
                )
              })}
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Social
              </span>
              <span className="h-px flex-1 bg-border/80" />
              <div className="flex items-center gap-2">
                {socials.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/70 text-muted-foreground transition-all duration-300 hover:border-primary/35 hover:text-primary"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Right — form panel */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-background/55 p-6 shadow-[0_1px_0_hsl(var(--foreground)/0.03)] backdrop-blur-[2px] md:p-8">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease }}
                  className="flex min-h-[380px] flex-col items-start justify-center"
                >
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-primary">
                    <CheckCircle2 className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <p className="font-sans text-2xl tracking-tight text-foreground">
                    Message sent
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Thank you for reaching out. I&apos;ll review your message and
                    reply soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
                  >
                    Send another message
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        Send a message
                      </p>
                      <h4 className="mt-2 font-sans text-xl font-normal tracking-tight text-foreground md:text-[1.35rem]">
                        Tell me about your project.
                      </h4>
                    </div>
                    <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70 sm:block">
                      ~24h reply
                    </span>
                  </div>

                  <form
                    className="space-y-5"
                    onSubmit={(e) => {
                      e.preventDefault()
                      setSubmitted(true)
                    }}
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Your name"
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="you@email.com"
                          className={fieldClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        placeholder="Project goals, timeline, or a quick hello…"
                        className={cn(fieldClass, "resize-none")}
                      />
                    </div>

                    <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        Your info stays private — no spam, ever.
                      </p>
                      <button
                        type="submit"
                        className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-[opacity,transform] duration-300 hover:opacity-90 active:scale-[0.98] sm:w-auto"
                      >
                        Send message
                        <Send
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.75}
                        />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>

        <footer className="relative z-10 mt-12 border-t border-border/80 md:mt-14">
          <div className="flex flex-col items-center gap-3 py-6 sm:flex-row sm:justify-between md:py-7">
            <p className="font-mono text-xs uppercase leading-[2] tracking-[0.14em] text-muted-foreground">
              John Aivanne Molato
            </p>
            <p className="text-sm leading-normal text-muted-foreground">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </section>
  )
}
