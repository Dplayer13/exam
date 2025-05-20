const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');

// Register route
router.post('/register', async (req, res) => {
  const { UserName, Password } = req.body;
  if (!UserName || !Password) return res.status(400).json({ error: "All fields required" });
  const hash = await bcrypt.hash(Password, 10);
  db.query('INSERT INTO USER (UserName, Password) VALUES (?, ?)', [UserName, hash], (err) => {
    if (err) return res.status(500).json({ error: "User already exists or DB error" });
    res.json({ message: "User registered" });
  });
});

// Login route
router.post('/login', (req, res) => {
  const { UserName, Password } = req.body;

db.query('INSERT INTO USER (UserName, Password) VALUES (?, ?)', [UserName, hash], (err) => {
  if (err) {
    console.error(err); // Add this line
    return res.status(500).json({ error: "User already exists or DB error" });
  }
  res.json({ message: "User registered" });
});

});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

// Session check route
router.get('/session', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: "Not logged in" });
  }
});

module.exports = router;