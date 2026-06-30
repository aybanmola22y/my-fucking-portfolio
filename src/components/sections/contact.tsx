"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  Send,
  Github,
  Linkedin,
  Facebook,
  ArrowUpRight,
  User,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle2,
} from "lucide-react"
import { TbAt, TbDeviceMobile, TbWorldLatitude } from "react-icons/tb"
import type { IconType } from "react-icons"
import { cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"

const contactInfo: {
  num: string
  icon: IconType
  label: string
  value: string
  href: string
}[] = [
  {
    num: "01",
    icon: TbAt,
    label: "Email",
    value: "molatojohnaivanneofficial@gmail.com",
    href: "mailto:molatojohnaivanneofficial@gmail.com",
  },
  {
    num: "02",
    icon: TbDeviceMobile,
    label: "Phone",
    value: "+63 993 739 2300",
    href: "tel:+639937392300",
  },
  {
    num: "03",
    icon: TbWorldLatitude,
    label: "Location",
    value: "Puerto Princesa, Philippines",
    href: "#",
  },
]

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub", handle: "@johnaivanne" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", handle: "John Aivanne" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook", handle: "John Aivanne Molato" },
]

const fieldBase =
  "peer w-full rounded-xl border border-input/80 bg-background/50 pl-11 pr-4 pt-6 pb-2.5 text-base outline-none transition-all duration-300 placeholder-transparent focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10"

const labelBase =
  "pointer-events-none absolute left-11 top-4 text-sm text-muted-foreground transition-all duration-300 peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-medium"

export function ContactSection() {
  const ease = [0.22, 1, 0.36, 1] as const
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="contact" className="relative overflow-hidden py-24 px-4 md:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_8%,transparent_72%)] opacity-40" />
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          number="IV"
          title="contact"
          description="Have a project, a question, or just want to say hi? My inbox is always open."
        />

        <div className="grid items-start gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left — contact details */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="font-sans font-normal text-[clamp(1.35rem,3vw,1.75rem)] leading-snug tracking-tight lowercase">
              let&apos;s build something great together.
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Whether it&apos;s a website, a custom system, or a quick question — drop a message
              and I&apos;ll get back to you as soon as I can.
            </p>

            <div className="mt-8 space-y-1">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08, ease }}
                    viewport={{ once: true }}
                    className="group relative flex items-center gap-4 overflow-hidden rounded-xl px-3 py-3.5 transition-all duration-300 hover:bg-primary/[0.04]"
                  >
                    <div className="pointer-events-none absolute inset-y-2 left-0 w-0.5 origin-top scale-y-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-y-100" />
                    <span className="w-6 shrink-0 font-mono text-[11px] text-primary/40">
                      {info.num}
                    </span>
                    <Icon className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110" />
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        {info.label}
                      </p>
                      <p className="truncate text-sm font-medium transition-colors group-hover:text-primary">
                        {info.value}
                      </p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100" />
                  </motion.a>
                )
              })}
            </div>

            <div className="mt-8 border-t border-primary/10 pt-6">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Find me online
              </p>
              <div className="space-y-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-all duration-300 hover:border-primary/15 hover:bg-primary/[0.04]"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-none">{social.label}</p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">{social.handle}</p>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:text-primary group-hover:opacity-100" />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.6} />
              <p className="text-xs">
                Typical response within{" "}
                <span className="font-medium text-foreground">24 hours</span>
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="mb-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Send a message
              </p>
              <h4 className="mt-2 font-sans font-normal text-xl tracking-tight lowercase">
                tell me about your project.
              </h4>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease }}
                className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-primary/15 bg-primary/[0.04] px-6 py-12 text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                  <CheckCircle2 className="h-7 w-7 text-primary" strokeWidth={1.6} />
                </div>
                <p className="font-sans font-normal text-xl lowercase">message received!</p>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  Thanks for reaching out. I&apos;ll review your message and get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                className="relative space-y-5"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="relative">
                    <User
                      className="pointer-events-none absolute left-4 top-[1.125rem] h-4 w-4 text-muted-foreground/70 transition-colors peer-focus:text-primary"
                      strokeWidth={1.6}
                    />
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      className={fieldBase}
                      required
                    />
                    <label htmlFor="name" className={labelBase}>
                      Name
                    </label>
                  </div>
                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute left-4 top-[1.125rem] h-4 w-4 text-muted-foreground/70"
                      strokeWidth={1.6}
                    />
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className={fieldBase}
                      required
                    />
                    <label htmlFor="email" className={labelBase}>
                      Email
                    </label>
                  </div>
                </div>

                <div className="relative">
                  <MessageSquare
                    className="pointer-events-none absolute left-4 top-[1.125rem] h-4 w-4 text-muted-foreground/70"
                    strokeWidth={1.6}
                  />
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Tell me about your project, timeline, or question..."
                    className={cn(fieldBase, "resize-none")}
                    required
                  />
                  <label htmlFor="message" className={labelBase}>
                    Message
                  </label>
                </div>

                <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Your info stays private — no spam, ever.
                  </p>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 sm:w-auto"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    Send Message
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center gap-3 border-t border-border pt-8 sm:flex-row sm:justify-between"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            John Aivanne Molato
          </p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
