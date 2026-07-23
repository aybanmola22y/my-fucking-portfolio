"use client"

import * as React from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

type ScrollTarget = string | number | HTMLElement

type SmoothScrollContextValue = {
  scrollTo: (target: ScrollTarget, options?: { offset?: number }) => void
  scrollToSection: (
    id: string,
    options?: { padding?: number; align?: "start" | "fit" | "end" }
  ) => void
}

const SmoothScrollContext = React.createContext<SmoothScrollContextValue | null>(null)

export function useSmoothScroll() {
  return React.useContext(SmoothScrollContext)
}

const smoothEase = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = React.useRef<Lenis | null>(null)

  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    // Responsive smoothness: higher lerp = less "lag behind" the wheel.
    // syncTouch off — it makes trackpads feel delayed.
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      syncTouch: false,
      autoRaf: true,
      anchors: false,
      stopInertiaOnNavigate: true,
    })
    lenisRef.current = lenis

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = React.useCallback<SmoothScrollContextValue["scrollTo"]>(
    (target, options) => {
      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(target, {
          offset: options?.offset ?? 0,
          duration: 1.2,
          easing: smoothEase,
        })
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

  const scrollToSection = React.useCallback<SmoothScrollContextValue["scrollToSection"]>(
    (id, options) => {
      const el = document.getElementById(id)
      if (!el) return

      const padding = options?.padding ?? 32
      const align = options?.align ?? "fit"
      const sectionHeight = el.getBoundingClientRect().height
      const viewportHeight = window.innerHeight

      let offset: number
      if (align === "start") {
        offset = -padding
      } else if (align === "end") {
        offset = sectionHeight - viewportHeight + padding
      } else {
        const available = viewportHeight - padding * 2
        const overflow = sectionHeight - available

        if (overflow <= 0) {
          offset = -(viewportHeight - sectionHeight - padding)
        } else if (overflow <= viewportHeight * 0.18) {
          offset = -((viewportHeight - sectionHeight) / 2)
        } else {
          offset = sectionHeight - viewportHeight + padding
        }
      }

      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(el, {
          offset,
          duration: 1.2,
          easing: smoothEase,
        })
        return
      }

      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: top + offset, behavior: "smooth" })
    },
    []
  )

  return (
    <SmoothScrollContext.Provider value={{ scrollTo, scrollToSection }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
