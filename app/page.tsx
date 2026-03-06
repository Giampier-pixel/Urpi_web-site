import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MetricsSection } from "@/components/metrics-section"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <MetricsSection />
      <ServicesSection />
      <ContactSection />
    </main>
  )
}
