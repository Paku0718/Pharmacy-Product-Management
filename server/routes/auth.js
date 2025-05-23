require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Your MySQL connection

// Register Route
router.post('/register', async (req, res) => {
    const { username, password, email, userType } = req.body;

    if (!username || !password || !email || !userType) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const checkQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
        db.query(checkQuery, [username, email], (err, results) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            if (results.length > 0) {
                return res.status(400).json({ error: 'Username or email already exists' });
            }

            const insertQuery = `
                INSERT INTO users (username, password, email, userType) 
                VALUES (?, ?, ?, ?)`;

            db.query(insertQuery, [username, hashedPassword, email, userType], (err) => {
                if (err) return res.status(500).json({ error: 'Registration failed' });
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password, adminPassphrase } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const query = 'SELECT * FROM users WHERE username = ?';

    db.query(query, [username], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) {
            return res.status(401).json({ error: 'User does not exist' });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password does not match' });
        }

        if (user.userType === 'admin' && adminPassphrase !== process.env.ADMIN_PASSPHRASE) {
            return res.status(401).json({ error: 'Admin authentication failed - Incorrect passphrase' });
        }

        const token = jwt.sign( { userType: user.userType, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('Authtoken', token);
        res.json({
            status: true,
            message: 'Login successful',
            token,
            userType: user.userType,
        });
    });
});

// Logout Route
router.get('/logout', (req, res) => {
    res.clearCookie('Authtoken');
    res.status(200).send('Logout successful');
});

module.exports = router;
