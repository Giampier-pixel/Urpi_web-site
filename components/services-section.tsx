"use client"

import { useEffect, useState, useRef } from "react"
import { 
  Zap, 
  Code2, 
  Brain, 
  Cloud, 
  Shield, 
  LineChart 
} from "lucide-react"

interface Service {
  icon: React.ReactNode
  title: string
  description: string
  tag: string
}

const services: Service[] = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Transformación Digital",
    description: "Rediseñamos tus procesos con tecnología que escala",
    tag: "#Strategy",
  },
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Desarrollo de Software",
    description: "Aplicaciones a medida, APIs robustas y arquitectura limpia",
    tag: "#Dev",
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Inteligencia Artificial & Datos",
    description: "Modelos predictivos, dashboards y automatización",
    tag: "#AI",
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Consultoría Cloud",
    description: "Migración, seguridad y optimización en AWS / Azure / GCP",
    tag: "#Cloud",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Ciberseguridad",
    description: "Auditorías, pentesting y planes de respuesta a incidentes",
    tag: "#Security",
  },
  {
    icon: <LineChart className="w-8 h-8" />,
    title: "Estrategia Digital",
    description: "Roadmaps tecnológicos y acompañamiento CTO as a Service",
    tag: "#CTO",
  },
]

function ServiceCard({ 
  service, 
  index, 
  isVisible, 
  reducedMotion 
}: { 
  service: Service
  index: number
  isVisible: boolean
  reducedMotion: boolean
}) {
  return (
    <div
      className={`group relative bg-[#1A1A2E] border border-[rgba(0,229,255,0.15)] rounded-2xl p-8 transition-all duration-500 hover:border-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] ${
        reducedMotion ? "" : isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
      style={{ 
        transitionDelay: reducedMotion ? "0ms" : `${index * 100}ms`,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseMove={(e) => {
        if (reducedMotion) return
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = (y - centerY) / 20
        const rotateY = (centerX - x) / 20
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
      onMouseLeave={(e) => {
        if (reducedMotion) return
        e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
      }}
    >
      {/* Icon */}
      <div className="text-[#00E5FF] mb-4">
        {service.icon}
      </div>

      {/* Title */}
      <h3 
        className="text-white text-xl font-semibold mb-3"
        style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-[#888888] text-sm leading-relaxed mb-4">
        {service.description}
      </p>

      {/* Tag */}
      <span 
        className="inline-block text-xs text-[#00FF88] bg-[rgba(0,255,136,0.1)] px-3 py-1 rounded"
        style={{ fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace" }}
      >
        {service.tag}
      </span>
    </div>
  )
}

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="w-full bg-[#0A0A0F] py-[100px]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Eyebrow */}
          <span 
            className={`inline-block text-[13px] tracking-widest text-[#00FF88] px-3 py-1 rounded-full border border-[rgba(0,255,136,0.3)] mb-6 transition-all duration-700 ${
              reducedMotion ? "" : isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace" }}
          >
            {"[ NUESTROS SERVICIOS ]"}
          </span>

          {/* Heading */}
          <h2 
            className={`text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-balance transition-all duration-700 ${
              reducedMotion ? "" : isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ 
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
              transitionDelay: reducedMotion ? "0ms" : "100ms",
            }}
          >
            Soluciones tecnológicas para tu negocio
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isVisible={isVisible}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
