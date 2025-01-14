const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Mock database for demonstration
const users = [];

// Registration endpoint
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, panCardNumber, password } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !phoneNumber || !panCardNumber || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check for duplicate email or PAN Card Number
  const existingUser = users.find(user => user.email === email || user.panCardNumber === panCardNumber);
  if (existingUser) {
    return res.status(400).json({ message: 'Email or PAN Card Number already exists' });
  }

  // Hash the password
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save user to mock database
    users.push({ firstName, lastName, email, phoneNumber, panCardNumber, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Login successful', token: 'mock-jwt-token' });
});

module.exports = router;
