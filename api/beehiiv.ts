// /api/beehiiv.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { firstName, lastName, email, message } = req.body as {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  };

  try {
    /* 1) Alta en Beehiiv */
    await fetch(
      `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUB_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          send_welcome_email: true,
          custom_fields: {
            first_name: firstName,
            last_name: lastName,
            message
          },
          utm_source: 'website_contact_form'
        })
      }
    );

    /* 2) E-mail inmediato para ti (ej. Resend) */
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'NexaDigit <no-reply@nexadigit.io>',
        to: 'kreyes@nexadigit.io',
        subject: `Nuevo contacto: ${firstName} ${lastName}`,
        html: `<p>${message}</p><p><strong>Email:</strong> ${email}</p>`
      })
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_server_error' });
  }
}
