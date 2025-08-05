// server.js
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./users.db');

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )
`);

// Gmail SMTP transport setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aypsrhnetwork@gmail.com',
    pass: 'ukbo kckv pmjg dmwf' // You must use a Gmail App Password
  }
});

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const insert = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

  db.run(insert, [name, email, password], function (err) {
    if (err) return res.status(400).json({ message: 'User already exists' });

    // Send welcome email
    const mailOptions = {
      from: 'aypsrhnetwork@gmail.com',
      to: email,
      subject: 'Welcome to AYP!',
      text: `Hi ${name},\n\nThanks for signing up with us!`
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(500).json({ message: 'Signup done, but failed to send email.' });
      res.status(200).json({ message: 'Signup successful! Email sent.' });
    });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;

  db.get(query, [email, password], (err, row) => {
    if (row) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
