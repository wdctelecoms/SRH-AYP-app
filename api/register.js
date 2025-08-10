import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// Connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { name, email, age, residence, countryCode, phone } = req.body;

  // Check if email already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered.' });
  }

  // Save new user
  const { error: dbError } = await supabase
    .from('users')
    .insert([{ name, email, age, residence, country_code: countryCode, phone }]);

  if (dbError) {
    return res.status(500).json({ error: 'Database error.' });
  }

  // Email credentials
  const adminEmail = process.env.ADMIN_EMAIL;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

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
