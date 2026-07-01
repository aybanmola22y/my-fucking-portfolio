import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { SkillsSection } from "@/components/sections/skills"
import { ServicesSection } from "@/components/sections/services"
import { ProjectsSection } from "@/components/sections/projects"
import { ContactSection } from "@/components/sections/contact"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}
