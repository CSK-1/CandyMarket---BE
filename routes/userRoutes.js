const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const { getCurrentUser } = require('../controllers/userController');

const router = express.Router();

router.get('/me', authenticateToken, getCurrentUser);

module.exports = router;