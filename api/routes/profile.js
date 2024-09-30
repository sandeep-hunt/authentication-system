const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Get Profile Route (Protected)
router.get('/', auth, async (req, res) => {
    const db = req.app.get('db');
    try {
        const [rows] = await db.query('SELECT id, username, email FROM users WHERE id = ?', [req.user.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

