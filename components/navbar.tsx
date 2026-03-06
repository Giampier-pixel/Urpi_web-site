"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#proceso", label: "Proceso" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0F]/80 backdrop-blur-lg border-b border-[#2A2A3E]/50"
            : "bg-[#0A0A0F]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="group relative">
              <span className="font-[var(--font-heading)] font-bold text-xl lg:text-2xl text-[#00E5FF] relative inline-block">
                TechConsult
                <span 
                  className="absolute inset-0 text-[#00FF88] opacity-0 group-hover:opacity-100 group-hover:animate-glitch-1" 
                  aria-hidden="true"
                >
                  TechConsult
                </span>
                <span 
                  className="absolute inset-0 text-[#7C3AED] opacity-0 group-hover:opacity-100 group-hover:animate-glitch-2" 
                  aria-hidden="true"
                >
                  TechConsult
                </span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-[#00E5FF] transition-colors duration-200 text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-[#0A0A0F] bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] hover:shadow-lg hover:shadow-[#00E5FF]/25 transition-all duration-300"
              >
                Hablemos
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-white hover:text-[#00E5FF] transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0A0A0F] border-l border-[#2A2A3E] z-50 lg:hidden transform transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="font-[var(--font-heading)] font-bold text-xl text-[#00E5FF]">
              TechConsult
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-white hover:text-[#00E5FF] transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-[#00E5FF] transition-colors duration-200 text-lg font-medium py-2"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <a
              href="#contacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center px-6 py-3 rounded-full text-base font-semibold text-[#0A0A0F] bg-gradient-to-r from-[#00E5FF] to-[#7C3AED] hover:shadow-lg hover:shadow-[#00E5FF]/25 transition-all duration-300"
            >
              Hablemos
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes glitch-1 {
          0%, 100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
          }
          20% {
            clip-path: inset(20% 0 60% 0);
            transform: translate(-2px, 2px);
          }
          40% {
            clip-path: inset(40% 0 40% 0);
            transform: translate(2px, -2px);
          }
          60% {
            clip-path: inset(60% 0 20% 0);
            transform: translate(-1px, 1px);
          }
          80% {
            clip-path: inset(80% 0 0% 0);
            transform: translate(1px, -1px);
          }
        }
        
        @keyframes glitch-2 {
          0%, 100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0);
          }
          20% {
            clip-path: inset(60% 0 20% 0);
            transform: translate(2px, -2px);
          }
          40% {
            clip-path: inset(20% 0 60% 0);
            transform: translate(-2px, 2px);
          }
          60% {
            clip-path: inset(80% 0 0% 0);
            transform: translate(1px, -1px);
          }
          80% {
            clip-path: inset(40% 0 40% 0);
            transform: translate(-1px, 1px);
          }
        }

        :global(.group:hover .animate-glitch-1) {
          animation: glitch-1 0.3s ease-in-out;
        }
        
        :global(.group:hover .animate-glitch-2) {
          animation: glitch-2 0.3s ease-in-out 0.05s;
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.group:hover .animate-glitch-1),
          :global(.group:hover .animate-glitch-2) {
            animation: none;
          }
        }
      `}</style>
    </>
  )
}
