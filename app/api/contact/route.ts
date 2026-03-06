import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
)
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    const { nombre, email, empresa, mensaje } = await req.json()

    // Guardar en Supabase
    await supabase.from('contactos').insert([{ nombre, email, empresa, mensaje }])

    // Enviar email
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: process.env.CONTACT_EMAIL!,
        subject: `Nuevo contacto de ${nombre}`,
        html: `<p><b>Nombre:</b> ${nombre}</p>
           <p><b>Email:</b> ${email}</p>
           <p><b>Empresa:</b> ${empresa}</p>
           <p><b>Mensaje:</b> ${mensaje}</p>`
    })

    return NextResponse.json({ ok: true })
}