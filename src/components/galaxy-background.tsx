"use client"

import { useEffect, useRef, useState } from "react"

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function getQuality() {
  const isMobile = window.innerWidth < 768
  const isLowPower = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  return { isMobile, isLowPower }
}

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showEffects, setShowEffects] = useState(true)

  useEffect(() => {
    const update = () => {
      const { isLowPower } = getQuality()
      setShowEffects(!document.hidden && !isLowPower)
    }
    update()
    document.addEventListener("visibilitychange", update)
    return () => document.removeEventListener("visibilitychange", update)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !showEffects) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const { isMobile } = getQuality()
    const starCount = isMobile ? 70 : 130
    const dustCount = isMobile ? 180 : 380
    const targetFps = isMobile ? 24 : 30
    const frameInterval = 1000 / targetFps

    const clusters = [
      { cx: 0.22, cy: 0.18, spread: 0.38, color: [167, 139, 250] },
      { cx: 0.78, cy: 0.72, spread: 0.34, color: [129, 140, 248] },
      { cx: 0.52, cy: 0.48, spread: 0.28, color: [125, 211, 252] },
      { cx: 0.12, cy: 0.62, spread: 0.22, color: [244, 114, 182] },
    ]

    const dust = Array.from({ length: dustCount }, (_, i) => {
      const cluster = clusters[Math.floor(seededRandom(i * 19) * clusters.length)]
      const angle = seededRandom(i * 23) * Math.PI * 2
      const dist = seededRandom(i * 29) * cluster.spread
      return {
        x: cluster.cx + Math.cos(angle) * dist,
        y: cluster.cy + Math.sin(angle) * dist,
        r: seededRandom(i * 31) * 0.5 + 0.12,
        opacity: seededRandom(i * 37) * 0.18 + 0.03,
        color: cluster.color,
        driftX: (seededRandom(i * 41) - 0.5) * 0.00003,
        driftY: (seededRandom(i * 43) - 0.5) * 0.00002,
        pulse: seededRandom(i * 47) * 0.001 + 0.0005,
        phase: seededRandom(i * 53) * Math.PI * 2,
      }
    })

    const stars = Array.from({ length: starCount }, (_, i) => ({
      x: seededRandom(i * 2),
      y: seededRandom(i * 3 + 1),
      r: seededRandom(i * 5) * 1.2 + 0.25,
      opacity: seededRandom(i * 7) * 0.5 + 0.15,
      twinkleSpeed: seededRandom(i * 11) * 0.002 + 0.001,
      twinklePhase: seededRandom(i * 13) * Math.PI * 2,
      tint: seededRandom(i * 17) > 0.88,
    }))

    let raf = 0
    let lastFrame = 0
    let logicalWidth = 0
    let logicalHeight = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      logicalWidth = window.innerWidth
      logicalHeight = window.innerHeight
      canvas.width = Math.floor(logicalWidth * dpr)
      canvas.height = Math.floor(logicalHeight * dpr)
      canvas.style.width = `${logicalWidth}px`
      canvas.style.height = `${logicalHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw)

      if (time - lastFrame < frameInterval) return
      lastFrame = time

      if (document.hidden) return

      ctx.clearRect(0, 0, logicalWidth, logicalHeight)

      for (const particle of dust) {
        particle.x += particle.driftX
        particle.y += particle.driftY
        if (particle.x < -0.05) particle.x = 1.05
        if (particle.x > 1.05) particle.x = -0.05
        if (particle.y < -0.05) particle.y = 1.05
        if (particle.y > 1.05) particle.y = -0.05

        const shimmer = 0.75 + 0.25 * Math.sin(time * particle.pulse + particle.phase)
        ctx.fillStyle = `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.opacity * shimmer})`
        ctx.fillRect(
          particle.x * logicalWidth,
          particle.y * logicalHeight,
          particle.r,
          particle.r
        )
      }

      for (const star of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.twinklePhase)
        const alpha = star.opacity * twinkle
        ctx.beginPath()
        ctx.arc(star.x * logicalWidth, star.y * logicalHeight, star.r, 0, Math.PI * 2)
        ctx.fillStyle = star.tint
          ? `rgba(147, 197, 253, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`
        ctx.fill()
      }
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [showEffects])

  if (!showEffects) {
    return (
      <div
        className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden dark:block"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[#050508]" />
        <div className="absolute -left-[20%] top-[-10%] h-[55%] w-[65%] rounded-full bg-indigo-950/50 blur-[80px]" />
        <div className="absolute -right-[15%] bottom-[-5%] h-[45%] w-[55%] rounded-full bg-violet-950/40 blur-[80px]" />
        <div className="absolute inset-0 bg-[linear-gradient(118deg,transparent_0%,rgba(167,139,250,0.06)_20%,rgba(147,197,253,0.1)_48%,rgba(196,181,253,0.05)_72%,transparent_100%)]" />
      </div>
    )
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden dark:block [contain:strict]"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[#050508]" />
      <div className="absolute -left-[20%] top-[-10%] h-[55%] w-[65%] rounded-full bg-indigo-950/50 blur-[80px]" />
      <div className="absolute -right-[15%] bottom-[-5%] h-[45%] w-[55%] rounded-full bg-violet-950/40 blur-[80px]" />
      <div className="absolute left-[30%] top-[45%] h-[35%] w-[35%] rounded-full bg-blue-950/25 blur-[70px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050508_75%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(118deg,transparent_0%,rgba(167,139,250,0.06)_20%,rgba(147,197,253,0.1)_48%,rgba(196,181,253,0.05)_72%,transparent_100%)]" />

      <div className="absolute left-[8%] top-[15%] h-[28%] w-[55%] rounded-[100%] bg-gradient-to-br from-violet-400/15 via-indigo-400/8 to-transparent blur-[60px]" />
      <div className="absolute left-[45%] top-[55%] h-[32%] w-[48%] rounded-[100%] bg-gradient-to-br from-sky-400/12 via-blue-400/6 to-transparent blur-[60px]" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-90 will-change-transform"
      />
    </div>
  )
}
