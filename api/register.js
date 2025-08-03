// api/register.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { name, email } = req.body;

  const adminEmail = 'washingtonmulumbi46@gmail.com'; // replace with your Gmail
  const gmailAppPassword = 'iydw ceew zhbb gzvz'; // Use Gmail App Password

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: adminEmail,
      pass: gmailAppPassword
    }
  });

  try {
    // Email to admin
    await transporter.sendMail({
      from: adminEmail,
      to: adminEmail,
      subject: 'New AYP Registration',
      text: `Name: ${name}\nEmail: ${email}`
    });

    // Email to user
    await transporter.sendMail({
      from: adminEmail,
      to: email,
      subject: 'Welcome to AYP',
      text: `Hi ${name},\n\nThank you for signing up to AYP. Your details have been submitted.`
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Email failed' });
  }
}
