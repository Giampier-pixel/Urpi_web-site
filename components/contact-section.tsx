"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"

export function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            nombre: formData.get("nombre"),
            email: formData.get("email"),
            empresa: formData.get("empresa"),
            mensaje: formData.get("mensaje"),
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                setIsSuccess(true)
                e.currentTarget.reset()
                setTimeout(() => setIsSuccess(false), 5000)
            }
        } catch (error) {
            console.error("Error submitting form", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contacto" className="w-full bg-[#0A0A0F] py-[100px]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span
                        className="inline-block text-[13px] tracking-widest text-[#00FF88] px-3 py-1 rounded-full border border-[rgba(0,255,136,0.3)] mb-6"
                        style={{ fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace" }}
                    >
                        {"[ CONTACTO ]"}
                    </span>
                    <h2
                        className="text-white text-3xl sm:text-4xl font-bold mb-4"
                        style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}
                    >
                        Conversemos sobre tu proyecto
                    </h2>
                    <p className="text-[#888888]">
                        Déjanos tus datos y nos pondremos en contacto contigo lo antes posible.
                    </p>
                </div>

                <div className="bg-[#1A1A2E] border border-[rgba(0,229,255,0.15)] rounded-2xl p-8 shadow-[0_0_20px_rgba(0,229,255,0.05)]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="nombre" className="text-white">Nombre completo</Label>
                                <Input
                                    id="nombre"
                                    name="nombre"
                                    required
                                    className="bg-[#0A0A0F] border-[rgba(0,229,255,0.2)] text-white focus-visible:ring-[#00E5FF] focus-visible:border-[#00E5FF]"
                                    placeholder="Juan Pérez"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-white">Correo electrónico</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="bg-[#0A0A0F] border-[rgba(0,229,255,0.2)] text-white focus-visible:ring-[#00E5FF] focus-visible:border-[#00E5FF]"
                                    placeholder="juan@empresa.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="empresa" className="text-white">Empresa</Label>
                            <Input
                                id="empresa"
                                name="empresa"
                                required
                                className="bg-[#0A0A0F] border-[rgba(0,229,255,0.2)] text-white focus-visible:ring-[#00E5FF] focus-visible:border-[#00E5FF]"
                                placeholder="Nombre de tu empresa"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="mensaje" className="text-white">Mensaje</Label>
                            <Textarea
                                id="mensaje"
                                name="mensaje"
                                required
                                className="bg-[#0A0A0F] border-[rgba(0,229,255,0.2)] text-white min-h-[120px] focus-visible:ring-[#00E5FF] focus-visible:border-[#00E5FF]"
                                placeholder="¿En qué te podemos ayudar?"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#00E5FF] text-[#0A0A0F] hover:bg-[#00E5FF]/90 font-bold py-6 text-lg transition-all"
                        >
                            {isSubmitting ? "Enviando..." : (
                                <>
                                    Enviar mensaje <Send className="ml-2 w-5 h-5" />
                                </>
                            )}
                        </Button>

                        {isSuccess && (
                            <p className="text-[#00FF88] text-center mt-4">
                                ¡Gracias! Tu mensaje ha sido enviado exitosamente.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    )
}
