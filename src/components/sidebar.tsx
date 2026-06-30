"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Code2, FolderKanban, Mail, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSmoothScroll } from "@/components/smooth-scroll"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "About Me", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Projects", href: "#projects", icon: FolderKanban },
  { name: "Contact", href: "#contact", icon: Mail },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("home")
  const smoothScroll = useSmoothScroll()

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.replace("#", ""))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    if (smoothScroll) {
      smoothScroll.scrollTo(href)
      return
    }
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" })
  }

  const NavLink = ({
    item,
    onClick,
    mobile = false,
  }: {
    item: (typeof navItems)[number]
    onClick: () => void
    mobile?: boolean
  }) => {
    const isActive = activeSection === item.href.replace("#", "")
    const Icon = item.icon

    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "group relative inline-flex w-fit items-center gap-2.5 text-left transition-colors duration-200",
          mobile ? "gap-3 text-base" : "text-[15px]",
          isActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Icon
          className="h-[1.15em] w-[1.15em] shrink-0"
          strokeWidth={1.6}
        />
        <span className={cn(isActive && "font-medium")}>{item.name}</span>
      </button>
    )
  }

  return (
    <>
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="fixed left-5 top-5 z-50 text-foreground md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-5 w-5" strokeWidth={1.6} />
        ) : (
          <Menu className="h-5 w-5" strokeWidth={1.6} />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 hidden h-screen w-52 flex-col border-r border-border/60 bg-background/80 px-6 py-8 backdrop-blur-xl md:flex"
        )}
      >
        <div className="mb-10">
          <p className="font-sans font-normal text-[15px] tracking-tight text-foreground">
            John Aivanne
          </p>
          <p className="mt-0.5 font-mono text-[12px] text-muted-foreground">
            Full-stack Developer
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              item={item}
              onClick={() => handleNavClick(item.href)}
            />
          ))}
        </nav>

        <div className="mt-auto pt-6">
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-border/60 bg-background px-7 py-10 transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-12">
          <p className="font-sans font-normal text-lg tracking-tight">John Aivanne</p>
          <p className="mt-1 font-mono text-[13px] text-muted-foreground">
            Full-stack Developer
          </p>
        </div>

        <nav className="flex flex-col gap-5">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -12 }}
              animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.25, delay: isOpen ? index * 0.05 : 0 }}
            >
              <NavLink
                item={item}
                mobile
                onClick={() => handleNavClick(item.href)}
              />
            </motion.div>
          ))}
        </nav>

        <div className="mt-auto pt-8">
          <ThemeToggle mobile />
        </div>
      </aside>
    </>
  )
}
