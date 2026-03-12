'use server';

import { Resend } from 'resend';

export async function sendEmail(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        return { success: false, error: 'Por favor completa todos los campos requeridos.' };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('RESEND_API_KEY is not set in environment variables.');
        return { success: false, error: 'Error de configuración del servidor. Contacta al administrador.' };
    }

    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_EMAIL || 'sebastian.castro@oitove.com';

    try {
        const { data, error } = await resend.emails.send({
            from: 'Oitove Web <onboarding@resend.dev>',
            to: toEmail,
            subject: `Nueva solicitud: ${name}`,
            text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || 'No proporcionado'}\n\nMensaje:\n${message}`,
        });

        if (error) {
            console.error('Resend Error:', JSON.stringify(error));
            return { success: false, error: 'Hubo un error al enviar el correo. Por favor intenta nuevamente.' };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Server Error:', err);
        return { success: false, error: 'Hubo un error interno. Por favor intenta más tarde.' };
    }
}
