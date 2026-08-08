"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Github, Linkedin, Facebook, ArrowUpRight, Send, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"

const EMAIL = "molatojohnaivanneofficial@gmail.com"

const details = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    label: "Phone",
    value: "+63 993 739 2300",
    href: "tel:+639937392300",
  },
  {
    label: "Location",
    value: "Puerto Princesa, Philippines",
    href: undefined as string | undefined,
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

const inputClass =
  "mt-2 w-full border-0 border-b border-border bg-transparent pb-3 text-[15px] outline-none transition-colors duration-300 placeholder:text-muted-foreground/50 focus:border-primary"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contact" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          number="IV"
          title="Contact"
          description="Have a project, a question, or just want to say hi? My inbox is always open."
        />

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Left — editorial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <h3 className="max-w-sm font-sans text-[clamp(1.5rem,3vw,2rem)] font-normal leading-snug tracking-tight text-foreground">
              Let&apos;s build something great together.
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Whether it&apos;s a website, a custom system, or a quick question —
              send a message and I&apos;ll get back to you within 24 hours.
            </p>

            <ul className="mt-10 space-y-0 border-t border-border">
              {details.map((item) => (
                <li key={item.label} className="border-b border-border">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="group flex items-baseline justify-between gap-6 py-4"
                    >
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="flex min-w-0 items-center gap-2 text-right text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                        <span className="truncate">{item.value}</span>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                          strokeWidth={1.75}
                        />
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-baseline justify-between gap-6 py-4">
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="text-right text-sm font-medium text-foreground">
                        {item.value}
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {socials.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.6} />
                    {social.label}
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            {submitted ? (
              <div className="flex min-h-[360px] flex-col justify-center">
                <CheckCircle2
                  className="mb-4 h-7 w-7 text-primary"
                  strokeWidth={1.5}
                />
                <p className="font-sans text-xl tracking-tight">Message sent</p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Thank you for reaching out. I&apos;ll review your message and
                  reply soon.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 w-fit text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Send a message
                  </p>
                  <h4 className="mt-2 font-sans text-xl font-normal tracking-tight">
                    Tell me about your project.
                  </h4>
                </div>

                <form
                  className="space-y-8"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSubmitted(true)
                  }}
                >
                  <div className="grid gap-8 sm:grid-cols-2">
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
                        className={inputClass}
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
                        className={inputClass}
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
                      rows={5}
                      placeholder="Project goals, timeline, or a quick hello…"
                      className={cn(inputClass, "resize-none")}
                    />
                  </div>

                  <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-muted-foreground">
                      Your info stays private — no spam, ever.
                    </p>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
                    >
                      Send message
                      <Send className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>

        <footer className="mt-20 flex flex-col items-center gap-2 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            John Aivanne Molato
          </p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  )
}
