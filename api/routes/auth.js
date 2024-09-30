const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const db = req.app.get('db');

    try {
        const existingUser = await userModel.findUserByEmail(db, email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        await userModel.createUser(db, username, email, password);
        
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get('db');

    try {
        const user = await userModel.findUserByEmail(db, email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await userModel.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
