// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validateAndConvertUnits = require('../middleware/validateAndConvertUnits');
const checkEmailExists = require('../middleware/checkEmailExists');

// Register route
router.post('/register', checkEmailExists, validateAndConvertUnits, authController.registerUser);

// Login route
router.post('/login', authController.loginUser);

module.exports = router;
