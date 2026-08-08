"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

function supportsViewTransitions() {
  return typeof document !== "undefined" && "startViewTransition" in document
}

type ViewTransition = {
  ready: Promise<void>
  finished: Promise<void>
}

export function ThemeToggle({
  mobile = false,
  onToggle,
}: {
  mobile?: boolean
  onToggle?: () => void
}) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const locking = React.useRef(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = (resolvedTheme ?? theme) === "dark"
  const label = mounted ? (isDark ? "Light mode" : "Dark mode") : "Theme"
  const Icon = mounted && isDark ? Sun : Moon

  const handleToggle = async () => {
    if (!mounted || locking.current) return
    locking.current = true

    const next = isDark ? "light" : "dark"
    const root = document.documentElement

    // Pause heavy canvas work during the switch
    root.dataset.themeSwitching = "true"

    try {
      if (prefersReducedMotion() || !supportsViewTransitions()) {
        root.classList.add("theme-animating")
        setTheme(next)
        await new Promise((r) => window.setTimeout(r, 220))
        root.classList.remove("theme-animating")
      } else {
        const transition = (
          document as Document & {
            startViewTransition: (update: () => void) => ViewTransition
          }
        ).startViewTransition(() => {
          setTheme(next)
        })
        await transition.finished.catch(() => undefined)
      }
    } finally {
      delete root.dataset.themeSwitching
      locking.current = false
      onToggle?.()
    }
  }

  return (
    <button
      type="button"
      onClick={() => void handleToggle()}
      className={cn(
        "inline-flex w-fit items-center gap-2.5 text-muted-foreground transition-colors duration-200 hover:text-foreground",
        mobile ? "gap-3 text-base" : "text-[15px]"
      )}
      aria-label={label}
    >
      <Icon className="h-[1.15em] w-[1.15em] shrink-0" strokeWidth={1.6} />
      <span className="font-mono text-[13px]">{label}</span>
    </button>
  )
}
