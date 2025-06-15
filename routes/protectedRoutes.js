
import express from 'express';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});

export default router; 