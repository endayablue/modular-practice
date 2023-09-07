// /middleware/checkEmailExists.js

const User = require('../models/User'); // Import your User model

// Middleware to check if email already exists in the database
async function checkEmailExists(req, res, next) {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use.' });
    }

    // If email doesn't exist, continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error checking email existence:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = checkEmailExists;
