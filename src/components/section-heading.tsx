"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  number: string
  title: string
  description?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeading({
  number,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      viewport={{ once: true }}
      className={cn(
        "mb-12 md:mb-14",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="font-sans font-normal text-[clamp(1.75rem,4vw,2.5rem)] leading-tight tracking-tight text-foreground lowercase">
        <span className="normal-case text-muted-foreground">{number}</span>
        {" — "}
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
