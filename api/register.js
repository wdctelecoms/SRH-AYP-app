import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, name } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aypsrhnetwork@gmail.com"
process.env.EMAIL_USERNAME,
      pass: "ukbo kckv pmjg dmwf"
process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"AYP Network" <${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject: "Welcome to AYP",
    html: `<p>Hi ${name},</p><p>Thank you for signing up to AYP Network!</p>`,
  });

  res.status(200).json({ message: "Registration successful!" });
}
