import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { name, email } = req.body;

  const adminEmail = 'aypsrhnetwork@gmail.com'; // Replace with your Gmail
  const gmailAppPassword = 'ukbo kckv pmjg dmwf'; // Use App Password from Gmail

  // Setup transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: adminEmail,
      pass: gmailAppPassword
    }
  });

  try {
    // 1. Send to admin
    await transporter.sendMail({
      from: adminEmail,
      to: adminEmail,
      subject: 'New AYP Registration',
      text: `New Registration:\nName: ${name}\nEmail: ${email}`
    });

    // 2. Send to user
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
