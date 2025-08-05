// /api/register.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  // 1. Send Welcome Email (using Gmail SMTP)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aypsrhnetwork@gmail.com'
    process.env.EMAIL_USERNAME, // your email
      pass: 'ukbo kckv pmjg dmwfo'
    process.env.EMAIL_PASSWORD  // your app password (not your real email password!)
    }
  });

  await transporter.sendMail({
    from: '"CyberSentinel 360" <' + process.env.EMAIL_USERNAME + '>',
    to: email,
    subject: "Welcome to CyberSentinel 360!",
    text: "Thanks for signing up with us!",
    html: "<h1>Welcome!</h1><p>Thanks for signing up with CyberSentinel 360.</p>"
  });

  // 2. Save user (as JSON file - optional step if needed)
  // You can skip this or use Planetscale, Supabase, etc. if you want to store accounts

  return res.status(200).json({ message: "Registration successful. Welcome email sent!" });
}
