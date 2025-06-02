// /api/mailerlite.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { firstName, lastName, email, message } = req.body as {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  };

  try {
    // Crea el suscriptor en MailerLite
    const groupId = process.env.MAILERLITE_GROUP_ID; // define esto en .env
    const apiKey = process.env.MAILERLITE_API_KEY;
    const resp = await fetch(`https://api.mailerlite.com/api/v2/groups/${groupId}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': apiKey as string,
      },
      body: JSON.stringify({
        email,
        name: firstName + ' ' + lastName,
        fields: {
          first_name: firstName,
          last_name: lastName,
          message: message,
        }
      }),
    });
    const data = await resp.json();

    if (!resp.ok) return res.status(400).json({ error: data.error?.message || 'Failed to subscribe' });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'internal_server_error' });
  }
}
