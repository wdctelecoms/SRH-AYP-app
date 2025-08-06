import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { name, email, age, residence, countryCode, phone } = req.body;

  const adminEmail = 'aypsrhnetwork@gmail.com';
  const gmailAppPassword = 'ukbo kckv pmjg dmwf';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: adminEmail,
      pass: gmailAppPassword
    }
  });

  try {
    // Send to admin
    await transporter.sendMail({
      from: adminEmail,
      to: adminEmail,
      subject: 'New AYP Registration',
      text: `New Registration:\nName: ${name}\nEmail: ${email}\nAge: ${age}\nResidence: ${residence}\nPhone: ${countryCode}${phone}`
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: adminEmail,
      to: email,
      subject: 'Welcome to AYP Network',
      text: `Hello ${name},\n\nYou have successfully registered to AYP Network.`
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ error: 'Failed to send emails.' });
  }
}
