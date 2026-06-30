"use client"

import * as React from "react"
import Lenis from "lenis"

type ScrollTarget = string | number | HTMLElement

type SmoothScrollContextValue = {
  scrollTo: (target: ScrollTarget, options?: { offset?: number }) => void
}

const SmoothScrollContext = React.createContext<SmoothScrollContextValue | null>(null)

export function useSmoothScroll() {
  return React.useContext(SmoothScrollContext)
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = React.useRef<Lenis | null>(null)

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    let rafId = 0
    const raf = (time: number) => {
      if (!document.hidden) {
        lenis.raf(time)
      }
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = React.useCallback<SmoothScrollContextValue["scrollTo"]>(
    (target, options) => {
      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(target, { offset: options?.offset ?? 0 })
        return
      }
      if (typeof target === "string") {
        const el = document.querySelector(target)
        el?.scrollIntoView({ behavior: "smooth" })
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    },
    []
  )

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
