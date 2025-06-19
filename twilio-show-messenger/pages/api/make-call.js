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
      const audioUrl = `${process.env.PUBLIC_AUDIO_BASE_URL}${template.mp3}`;

      return await client.calls.create({
        url: `https://handler.twilio.com/twiml/EHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX?AudioUrl=${encodeURIComponent(audioUrl)}`,
        to,
        from,
      });
    })
  );

  res.status(200).json({ success: true, results });
}
