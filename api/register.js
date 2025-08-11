import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import bcrypt from 'bcryptjs'; // for hashing

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, residence, email, countryCode, phone, age, password } = req.body;

    // Hash the password before storing
    const hashedPassword = bcrypt.hashSync(password, 10);

    const filePath = join(process.cwd(), 'data', 'users.json');
    let users = [];

    if (existsSync(filePath)) {
      users = JSON.parse(readFileSync(filePath, 'utf-8'));
    }

    users.push({
      name,
      residence,
      email,
      countryCode,
      phone,
      age,
      password: hashedPassword,
    });

    writeFileSync(filePath, JSON.stringify(users, null, 2));
    res.status(200).json({ message: 'User registered successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
