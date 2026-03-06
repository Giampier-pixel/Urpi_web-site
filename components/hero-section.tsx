"use client"

import { useEffect, useState } from "react"
import { ParticleCanvas } from "./particle-canvas"
import { TypewriterText } from "./typewriter-text"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    // Trigger animation after mount
    const timeout = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0A0A0F] via-[#1A1A2E] to-[#0A0A0F]">
      {/* Particle Background */}
      <div className="absolute inset-0 lg:left-1/2">
        <ParticleCanvas />
      </div>

      {/* Mobile Particle Overlay */}
      <div className="absolute inset-0 lg:hidden">
        <ParticleCanvas />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="w-full pt-20 lg:pt-0">
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Eyebrow Tag */}
            <div
              className={`mb-6 transition-all duration-700 ${
                reducedMotion ? "" : isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: reducedMotion ? "0ms" : "100ms" }}
            >
              <span 
                className="inline-block font-mono text-[13px] tracking-widest text-[#00FF88] px-3 py-1 rounded-full border border-[rgba(0,255,136,0.3)]"
                style={{ fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace" }}
              >
                {"[ CONSULTORÍA TECNOLÓGICA · TRANSFORMACIÓN DIGITAL ]"}
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className={`mt-6 sm:mt-8 font-[var(--font-heading)] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white transition-all duration-700 ${
                reducedMotion ? "" : isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: reducedMotion ? "0ms" : "200ms" }}
            >
              <span className="text-balance">
                Llevamos tu empresa al{" "}
                <span className="bg-gradient-to-r from-[#00E5FF] to-[#00FF88] bg-clip-text text-transparent">
                  siguiente nivel digital
                </span>
              </span>
            </h1>

            {/* Subtitle with Typewriter */}
            <div
              className={`mt-6 sm:mt-8 transition-all duration-700 ${
                reducedMotion ? "" : isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: reducedMotion ? "0ms" : "300ms" }}
            >
              <p className="text-base sm:text-lg text-[#888888] max-w-xl mx-auto lg:mx-0 text-pretty">
                <TypewriterText
                  text="Estrategia, tecnología e innovación para empresas que quieren liderar su sector."
                  delay={25}
                />
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 ${
                reducedMotion ? "" : isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: reducedMotion ? "0ms" : "400ms" }}
            >
              {/* Primary CTA */}
              <a
                href="#contacto"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold text-[#0A0A0F] bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] hover:shadow-lg hover:shadow-[#00E5FF]/30 transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                <span>Hablemos de tu proyecto</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Secondary CTA */}
              <a
                href="#servicios"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold text-[#00E5FF] border border-[#00E5FF] bg-transparent hover:bg-[#00E5FF]/10 transition-all duration-300 whitespace-nowrap"
              >
                <span>Ver nuestros servicios</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay for better text readability on mobile */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-[#0A0A0F]/50 lg:hidden pointer-events-none" />
      
      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${
          reducedMotion ? "" : isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: reducedMotion ? "0ms" : "600ms" }}
      >
        <span className="text-xs text-[#888888] uppercase tracking-widest">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-[#2A2A3E] flex justify-center p-2">
          <div 
            className={`w-1.5 h-1.5 rounded-full bg-[#00E5FF] ${
              reducedMotion ? "" : "animate-bounce"
            }`} 
          />
        </div>
      </div>
    </section>
  )
}
