import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'aypsrhnetwork@gmail.com'
      process.env.EMAIL_USERNAME,
        pass: 'ukbo kckv pmjg dmwf' 
      process.env.EMAIL_PASSWORD
      }
    });

    // Send to user
    await transporter.sendMail({
      from: `"AYP Network" <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: "Welcome to AYP!",
      html: `<h2>Hello ${name}</h2><p>Thank you for signing up with AYP.</p>`
    });

    // Send to admin (yourself)
    await transporter.sendMail({
      from: `"AYP App" <${process.env.EMAIL_USERNAME}>`,
      to: process.env.EMAIL_USERNAME,
      subject: "New User Registered",
      text: `New registration:\nName: ${name}\nEmail: ${email}`
    });

    return res.status(200).json({ message: "Welcome email sent!" });

  } catch (error) {
    console.error("Email error:", error);
    return res.status(500).json({ error: "Failed to send email." });
  }
}
