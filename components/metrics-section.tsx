"use client"

import { useEffect, useState, useRef } from "react"
import { Briefcase, Calendar, Users, Star } from "lucide-react"

interface Metric {
  value: number
  suffix: string
  label: string
  icon: React.ReactNode
}

const metrics: Metric[] = [
  {
    value: 50,
    suffix: "+",
    label: "Proyectos Completados",
    icon: <Briefcase className="w-8 h-8" />,
  },
  {
    value: 8,
    suffix: "",
    label: "Años de Experiencia",
    icon: <Calendar className="w-8 h-8" />,
  },
  {
    value: 30,
    suffix: "+",
    label: "Clientes Satisfechos",
    icon: <Users className="w-8 h-8" />,
  },
  {
    value: 100,
    suffix: "%",
    label: "Tasa de Éxito",
    icon: <Star className="w-8 h-8" />,
  },
]

function AnimatedCounter({ 
  value, 
  suffix, 
  isVisible, 
  reducedMotion 
}: { 
  value: number
  suffix: string
  isVisible: boolean
  reducedMotion: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    
    if (reducedMotion) {
      setCount(value)
      return
    }

    const duration = 2000
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible, value, reducedMotion])

  return (
    <span className="bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  )
}

export function MetricsSection() {
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
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#1A1A2E] py-[60px]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`flex flex-col items-center text-center relative ${
                index < metrics.length - 1 ? "lg:border-r lg:border-[rgba(0,229,255,0.1)]" : ""
              } transition-all duration-700 ${
                reducedMotion ? "" : isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: reducedMotion ? "0ms" : `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="text-[#00E5FF] mb-4">
                {metric.icon}
              </div>

              {/* Number */}
              <div 
                className="text-[40px] sm:text-[56px] font-bold leading-none mb-2"
                style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}
              >
                <AnimatedCounter
                  value={metric.value}
                  suffix={metric.suffix}
                  isVisible={isVisible}
                  reducedMotion={reducedMotion}
                />
              </div>

              {/* Label */}
              <p className="text-white text-sm sm:text-base font-normal">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
