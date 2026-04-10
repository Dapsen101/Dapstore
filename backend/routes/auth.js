const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 🔐 SIGNUP
router.post('/signup', async (req, res) => {
  try {
    console.log("SIGNUP DATA:", req.body); // debug

    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user
    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: { _id: user._id, 
        name: user.name, 
        email: user.email,
        isAdmin: user.isAdmin
       }
    });

  } catch (err) {
    console.log("SIGNUP ERROR:", err);
    
    res.status(500).json({ error: 'Server error during signup' });
  }
});


// 🔐 LOGIN
router.post('/login', async (req, res) => {
  try {
    console.log("LOGIN DATA:", req.body); // debug

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err); // 🔥 DEBUG
    res.status(500).json({ error: 'Server error during login' });
  }
});

module.exports = router;