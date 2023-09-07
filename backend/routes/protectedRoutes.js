// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const testResponse = require('../controllers/test');
const authMiddleware = require('../middleware/authMiddleware');
const getUser = require('../controllers/getUser');



// Register route
router.get('/', authMiddleware, testResponse.testResponse);
router.get('/profile', authMiddleware, getUser);


module.exports = router;
