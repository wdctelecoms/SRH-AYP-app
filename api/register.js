import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Path to the local users.json file
  const filePath = path.join(process.cwd(), 'users.json');

  let users = [];

  // Load existing users if file exists
  if (fs.existsSync(filePath)) {
    try {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      users = JSON.parse(fileData);
    } catch (error) {
      console.error("Error reading users.json:", error);
    }
  }

  // Check for duplicate email
  const emailExists = users.some(user => user.email === email);
  if (emailExists) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  // Add new user
  const newUser = { username, email, password };
  users.push(newUser);

  // Save updated list
  try {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing to users.json:", error);
    return res.status(500).json({ message: 'Failed to save user' });
  }

  // Success
  return res.status(200).json({ message: 'Registration successful' });
}
