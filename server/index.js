import express from 'express';
import 'dotenv/config';          // <-- ahora sí existe el paquete

const app = express();
app.use(express.json());

app.post('/api/mailerlite', async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  try {
    const resp = await fetch(
      `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUP_ID}/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY
        },
        body: JSON.stringify({
          email,
          name: `${firstName} ${lastName}`,
          fields: { first_name: firstName, last_name: lastName, message }
        })
      }
    );

    if (!resp.ok) {
      const err = await resp.json();
      return res.status(400).json({ error: err.error?.message || 'Failed' });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_server_error' });
  }
});

const PORT = process.env.API_PORT || 5050;   // evita chocar con Vite
app.listen(PORT, () => console.log(`API ready on http://localhost:${PORT}`));
