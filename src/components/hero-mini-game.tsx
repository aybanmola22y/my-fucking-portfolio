"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react"
import { Gamepad2, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const ROUND_MS = 30_000
const BEST_KEY = "aivanne-zombie-best"
const PLAYER_SPEED = 3.2
const ZOMBIE_SPEED = 2.05
const PLAYER_R = 10
const ZOMBIE_R = 12
const HIT_DIST = PLAYER_R + ZOMBIE_R - 2

type Phase = "idle" | "playing" | "won" | "lost"

type Vec = { x: number; y: number }

function readBest() {
  if (typeof window === "undefined") return 0
  const n = Number(window.localStorage.getItem(BEST_KEY) ?? 0)
  return Number.isFinite(n) ? n : 0
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

/**
 * Articulated stickman with a proper run cycle:
 * two-segment legs (hip/knee/foot) and arms (shoulder/elbow/hand),
 * forward lean, stride bob, and idle breathing. The zombie uses a
 * hunched shamble with reaching arms and dragging steps.
 */
function drawStickman(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  facing: number,
  phase: number,
  speed: number, // 0..1 — blends idle stance into full sprint
  time: number,
  isZombie = false
) {
  const amp = clamp(speed, 0, 1)

  // Vertical bob: two footfalls per stride; gentle breathing when idle
  const strideBob = Math.abs(Math.sin(phase)) * (isZombie ? 1.4 : 2.4) * amp
  const breathe = (1 - amp) * Math.sin(time * 0.003) * 0.7
  const bob = strideBob + breathe

  // Ground shadow (drawn unmirrored, before body transform)
  ctx.save()
  ctx.translate(x, y + 20)
  ctx.scale(1, 0.32)
  ctx.beginPath()
  ctx.arc(0, 0, 9 + strideBob * 0.6, 0, Math.PI * 2)
  ctx.fillStyle = "rgba(15, 23, 42, 0.10)"
  ctx.fill()
  ctx.restore()

  ctx.save()
  ctx.translate(x, y - bob)
  ctx.scale(facing, 1) // forward is always +x from here on
  // Runners lean into their sprint; zombies are permanently hunched
  ctx.rotate(isZombie ? 0.3 + Math.sin(phase * 0.5) * 0.03 : 0.2 * amp)

  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = 2.2
  ctx.lineCap = "round"
  ctx.lineJoin = "round"

  const hipY = 4
  const shoulderY = -9

  // --- Legs: thigh swings from the hip, knee flexes during recovery ---
  const drawLeg = (p: number) => {
    const L1 = 9.5
    const L2 = 9.5
    const idleSplit = (1 - amp) * 0.09 * (Math.sin(p) >= 0 ? 1 : -1)
    const thighAmp = isZombie ? 0.5 : 0.95
    const thigh = thighAmp * amp * Math.sin(p) + idleSplit
    // Knee bends most while the leg swings forward, extends at contact
    const flexAmp = isZombie ? 0.55 : 1.15
    const kneeFlex = 0.18 + flexAmp * amp * Math.max(0, Math.sin(p - Math.PI * 0.55))

    const kx = Math.sin(thigh) * L1
    const ky = hipY + Math.cos(thigh) * L1
    const shin = thigh - kneeFlex
    const fx = kx + Math.sin(shin) * L2
    const fy = ky + Math.cos(shin) * L2

    ctx.beginPath()
    ctx.moveTo(0, hipY)
    ctx.lineTo(kx, ky)
    ctx.lineTo(fx, fy)
    // Small foot pointing forward
    ctx.lineTo(fx + 3, fy - 0.5)
    ctx.stroke()
  }

  // --- Arms: pump with bent elbows opposite the legs; zombie reaches ---
  const drawArm = (p: number) => {
    const L1 = 7.5
    const L2 = 7.5
    let upper: number
    let elbowFlex: number

    if (isZombie) {
      // Both arms outstretched toward the player, swaying slightly
      upper = 1.3 + Math.sin(p) * 0.1
      elbowFlex = 0.15
    } else {
      upper = 0.85 * amp * Math.sin(p)
      // Elbows stay bent ~90° while running, hang loose when idle
      elbowFlex = 0.15 + 1.75 * amp
    }

    const ex = Math.sin(upper) * L1
    const ey = shoulderY + Math.cos(upper) * L1
    const fore = upper + elbowFlex
    const hx = ex + Math.sin(fore) * L2
    const hy = ey + Math.cos(fore) * L2

    ctx.beginPath()
    ctx.moveTo(0, shoulderY)
    ctx.lineTo(ex, ey)
    ctx.lineTo(hx, hy)
    ctx.stroke()
  }

  // Far-side limbs first, slightly faded for depth
  ctx.globalAlpha = 0.55
  drawLeg(phase + Math.PI)
  drawArm(isZombie ? phase + Math.PI : phase) // arms counter-swing vs legs
  ctx.globalAlpha = 1

  // Torso — zombies get a hunched curve, runners a straight spine
  ctx.beginPath()
  if (isZombie) {
    ctx.moveTo(0, hipY)
    ctx.quadraticCurveTo(-2.5, -3, 1.5, shoulderY - 1)
  } else {
    ctx.moveTo(0, hipY)
    ctx.lineTo(0, shoulderY)
  }
  ctx.stroke()

  // Near-side limbs
  drawLeg(phase)
  drawArm(isZombie ? phase : phase + Math.PI)

  // Head — pushed forward with the hunch for the zombie
  const headX = isZombie ? 4 : amp * 1.5
  const headY = isZombie ? shoulderY - 7 : -16.5
  ctx.beginPath()
  ctx.arc(headX, headY, isZombie ? 6.5 : 6, 0, Math.PI * 2)
  if (isZombie) {
    ctx.fill()
    ctx.fillStyle = "#86efac"
    ctx.beginPath()
    ctx.arc(headX + 2.5, headY - 1, 1.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = color
  } else {
    ctx.stroke()
  }

  ctx.restore()
}

export function HeroMiniGame({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [phase, setPhase] = useState<Phase>("idle")
  const [left, setLeft] = useState(ROUND_MS)
  const [best, setBest] = useState(0)
  const [survivedMs, setSurvivedMs] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phaseRef = useRef<Phase>("idle")
  const keysRef = useRef<Record<string, boolean>>({})
  const pointerRef = useRef<Vec | null>(null)
  const playerRef = useRef<Vec>({ x: 120, y: 160 })
  const zombieRef = useRef<Vec>({ x: 360, y: 160 })
  const facingP = useRef(1)
  const facingZ = useRef(-1)
  const runP = useRef(0)
  const runZ = useRef(0)
  const speedP = useRef(0)
  const speedZ = useRef(0)
  const startRef = useRef(0)
  const rafRef = useRef(0)
  const lastHudRef = useRef(0)

  useEffect(() => {
    setBest(readBest())
  }, [])

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  const close = useCallback(() => {
    setOpen(false)
    setPhase("idle")
    phaseRef.current = "idle"
    keysRef.current = {}
    pointerRef.current = null
    cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault()
      }
      keysRef.current[e.key.toLowerCase()] = e.type === "keydown"
      if (e.key.startsWith("Arrow")) {
        keysRef.current[e.key] = e.type === "keydown"
      }
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("keyup", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("keyup", onKey)
    }
  }, [open, close])

  const startRound = () => {
    const canvas = canvasRef.current
    const w = canvas?.clientWidth || 480
    const h = canvas?.clientHeight || 320
    playerRef.current = { x: w * 0.28, y: h * 0.55 }
    zombieRef.current = { x: w * 0.78, y: h * 0.45 }
    keysRef.current = {}
    pointerRef.current = null
    speedP.current = 0
    speedZ.current = 0
    runP.current = 0
    runZ.current = 0
    startRef.current = performance.now()
    setLeft(ROUND_MS)
    setSurvivedMs(0)
    setPhase("playing")
    phaseRef.current = "playing"
  }

  const finish = useCallback(
    (result: "won" | "lost", lived: number) => {
      setPhase(result)
      phaseRef.current = result
      setSurvivedMs(lived)
      if (result === "won") {
        setBest((prev) => {
          const next = Math.max(prev, lived)
          window.localStorage.setItem(BEST_KEY, String(next))
          return next
        })
      } else {
        setBest((prev) => {
          const next = Math.max(prev, lived)
          window.localStorage.setItem(BEST_KEY, String(next))
          return next
        })
      }
    },
    []
  )

  // Game loop
  useEffect(() => {
    if (!open) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const margin = 22

      ctx.clearRect(0, 0, w, h)

      // Soft ground line
      ctx.strokeStyle = "hsla(215, 16%, 47%, 0.25)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(16, h - 28)
      ctx.lineTo(w - 16, h - 28)
      ctx.stroke()

      if (phaseRef.current === "playing") {
        const elapsed = now - startRef.current
        const remaining = Math.max(0, ROUND_MS - elapsed)
        if (now - lastHudRef.current > 100) {
          lastHudRef.current = now
          setLeft(remaining)
        }

        // Player input
        let dx = 0
        let dy = 0
        const k = keysRef.current
        if (k["w"] || k["arrowup"]) dy -= 1
        if (k["s"] || k["arrowdown"]) dy += 1
        if (k["a"] || k["arrowleft"]) dx -= 1
        if (k["d"] || k["arrowright"]) dx += 1

        // Pointer / touch steering toward point
        if (pointerRef.current) {
          const px = pointerRef.current.x - playerRef.current.x
          const py = pointerRef.current.y - playerRef.current.y
          const plen = Math.hypot(px, py)
          if (plen > 6) {
            dx = px / plen
            dy = py / plen
          }
        }

        const len = Math.hypot(dx, dy)
        if (len > 0) {
          dx /= len
          dy /= len
          playerRef.current.x += dx * PLAYER_SPEED
          playerRef.current.y += dy * PLAYER_SPEED
          if (Math.abs(dx) > 0.2) facingP.current = dx >= 0 ? 1 : -1
        }
        // Smooth the animation speed so strides ease in/out of running
        speedP.current += ((len > 0 ? 1 : 0) - speedP.current) * 0.18
        runP.current += 0.3 * speedP.current

        playerRef.current.x = clamp(playerRef.current.x, margin, w - margin)
        playerRef.current.y = clamp(playerRef.current.y, margin + 10, h - margin)

        // Zombie chases
        const zx = playerRef.current.x - zombieRef.current.x
        const zy = playerRef.current.y - zombieRef.current.y
        const zlen = Math.hypot(zx, zy) || 1
        // Slight speed ramp so late game is harder
        const haste = 1 + Math.min(0.45, elapsed / ROUND_MS)
        zombieRef.current.x += (zx / zlen) * ZOMBIE_SPEED * haste
        zombieRef.current.y += (zy / zlen) * ZOMBIE_SPEED * haste
        facingZ.current = zx >= 0 ? 1 : -1
        speedZ.current += (1 - speedZ.current) * 0.1
        runZ.current += 0.17 * haste

        zombieRef.current.x = clamp(zombieRef.current.x, margin, w - margin)
        zombieRef.current.y = clamp(zombieRef.current.y, margin + 10, h - margin)

        // Collision
        const dist = Math.hypot(
          playerRef.current.x - zombieRef.current.x,
          playerRef.current.y - zombieRef.current.y
        )
        if (dist < HIT_DIST) {
          finish("lost", elapsed)
        } else if (remaining <= 0) {
          finish("won", ROUND_MS)
        }
      }

      if (phaseRef.current !== "playing") {
        // Ease both characters back to a standing pose on overlays
        speedP.current *= 0.9
        speedZ.current *= 0.9
      }

      const primary =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--primary")
          .trim() || "221.2 83.2% 53.3%"
      const playerColor = `hsl(${primary})`
      const zombieColor = "#4d7c4d"

      drawStickman(
        ctx,
        playerRef.current.x,
        playerRef.current.y,
        playerColor,
        facingP.current,
        runP.current,
        speedP.current,
        now,
        false
      )
      drawStickman(
        ctx,
        zombieRef.current.x,
        zombieRef.current.y,
        zombieColor,
        facingZ.current,
        runZ.current,
        speedZ.current,
        now,
        true
      )
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [open, finish])

  const seconds = Math.ceil(left / 1000)
  const bestSec = (best / 1000).toFixed(1)
  const livedSec = (survivedMs / 1000).toFixed(1)

  const onPointer = (e: PointerEvent<HTMLCanvasElement>) => {
    if (phaseRef.current !== "playing") return
    const rect = e.currentTarget.getBoundingClientRect()
    pointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => {
          setOpen(true)
          setPhase("idle")
          phaseRef.current = "idle"
        }}
        className="group inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/35 hover:text-foreground"
      >
        <Gamepad2
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110"
          strokeWidth={1.7}
        />
        Play a mini-game
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Zombie Chase mini-game"
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-primary/10"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                    Mini-game
                  </p>
                  <p className="mt-0.5 font-sans text-sm tracking-tight">
                    Zombie Chase
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Close mini-game"
                >
                  <X className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/30 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <span>
                  Time{" "}
                  <span className="text-foreground tabular-nums">
                    {phase === "playing" ? `${seconds}s` : "30s"}
                  </span>
                </span>
                <span>
                  Best{" "}
                  <span className="text-foreground tabular-nums">{bestSec}s</span>
                </span>
                <span className="hidden sm:inline">WASD / arrows</span>
              </div>

              <div className="relative h-[22rem] touch-none select-none bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.06),transparent_65%)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.35)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-40"
                />

                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 h-full w-full"
                  onPointerDown={onPointer}
                  onPointerMove={(e) => {
                    if (e.buttons > 0 || pointerRef.current) onPointer(e)
                  }}
                  onPointerUp={() => {
                    pointerRef.current = null
                  }}
                  onPointerLeave={() => {
                    pointerRef.current = null
                  }}
                />

                {phase === "idle" && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background/75 px-6 text-center backdrop-blur-[2px]">
                    <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                      You&apos;re the blue stickman. A zombie is hunting you.
                      Survive <span className="text-foreground">30 seconds</span>{" "}
                      without getting caught.
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Move with WASD, arrows, or drag on the board
                    </p>
                    <button
                      type="button"
                      onClick={startRound}
                      className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Survive
                    </button>
                  </div>
                )}

                {(phase === "won" || phase === "lost") && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/80 px-6 text-center backdrop-blur-sm">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {phase === "won" ? "You survived" : "Caught"}
                    </p>
                    <p className="font-sans text-3xl tabular-nums tracking-tight">
                      {livedSec}s
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {phase === "won"
                        ? "Nice footwork. Best run saved."
                        : `Best survival: ${bestSec}s`}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={startRound}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
                      >
                        <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} />
                        Try again
                      </button>
                      <button
                        type="button"
                        onClick={close}
                        className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <p className="border-t border-border px-4 py-2.5 text-center font-mono text-[10px] text-muted-foreground">
                Tip: the zombie gets faster the longer you last
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
