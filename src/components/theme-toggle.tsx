"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ThemeToggle({ mobile = false }: { mobile?: boolean }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === "dark"
  const label = mounted ? (isDark ? "Light mode" : "Dark mode") : "Theme"
  const Icon = mounted && isDark ? Sun : Moon

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex w-fit items-center gap-2.5 text-muted-foreground transition-colors duration-200 hover:text-foreground",
        mobile ? "gap-3 text-base" : "text-[15px]"
      )}
    >
      <Icon className="h-[1.15em] w-[1.15em] shrink-0" strokeWidth={1.6} />
      <span className="font-mono text-[13px]">{label}</span>
    </button>
  )
}
