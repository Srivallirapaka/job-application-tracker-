const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const MockDB = require('../mockDb');
const mongoose = require('mongoose');

const router = express.Router();

const getDB = () => {
  return mongoose.connection.readyState === 1 ? User : MockDB.users;
};

// Register
router.post(
  '/register',
  [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, password } = req.body;
      const db = getDB();

      // Check if user already exists
      let user = await db.findOne({ $or: [{ email }, { username }] });
      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Create new user
      if (mongoose.connection.readyState === 1) {
        user = new User({ username, email, password });
        await user.save();
      } else {
        user = await db.create({ username, email, password });
        console.log('Registered using MockDB (MongoDB disconnected)');
      }

      // Create JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your_jwt_secret_key_here',
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: { id: user._id, username: user.username, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').exists().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const db = getDB();

      // Find user and include password
      let user;
      if (mongoose.connection.readyState === 1) {
        user = await User.findOne({ email }).select('+password');
      } else {
        user = await db.findOne({ email });
        console.log('Login attempt using MockDB (MongoDB disconnected)');
      }

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Check password
      const isPasswordValid = await user.matchPassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Create JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your_jwt_secret_key_here',
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: { id: user._id, username: user.username, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
