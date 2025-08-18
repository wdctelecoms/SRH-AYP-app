const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
const usersFile = path.join(__dirname, "users.json");

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// Register endpoint
app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile));
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: "User already exists" });
  }

  users.push({ email, password });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.json({ success: true });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile));
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// --- Verify Token ---
app.post('/verify-token', (req, res) => {
    const token = req.headers['authorization'];
    if(!token) return res.json({ valid:false });

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        res.json({ valid:true, user: decoded });
    } catch(err) {
        res.json({ valid:false });
    }
});
