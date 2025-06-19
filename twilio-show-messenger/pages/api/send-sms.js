import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { template, recipients } = req.body;

  const results = await Promise.allSettled(
    recipients.map(async (to) => {
      const isUS = to.startsWith('+1');
      const from = isUS ? process.env.TWILIO_NUMBER_US : template.from;
      const messagingService = template.type === 'whatsapp' ? 'whatsapp:' : '';

      return await client.messages.create({
        body: template.message,
        from: messagingService + from,
        to: messagingService + to,
      });
    })
  );

  res.status(200).json({ success: true, results });
}
