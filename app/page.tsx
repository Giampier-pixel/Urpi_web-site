import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MetricsSection } from "@/components/metrics-section"
import { ServicesSection } from "@/components/services-section"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <MetricsSection />
      <ServicesSection />
    </main>
  )
}
