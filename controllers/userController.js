const pool = require('../db');

async function getCurrentUser(req, res) {
  const { id } = req.user;

  try {
    const result = await pool.query('SELECT id, username FROM users WHERE id = $1', [id]);
    if (!result.rows.length) return res.status(404).json({ message: 'User not found' });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user' });
  }
}

module.exports = { getCurrentUser };