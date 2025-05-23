const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middleware/authMiddleware');

// GET Profile
router.get('/profile', verifyToken, (req, res) => {
    const userEmail = req.userEmail;

    const getUserQuery = 'SELECT id, username, email, userType FROM users WHERE email = ?';
    db.query(getUserQuery, [userEmail], (err, userResults) => {
        if (err) return res.status(500).json({ error: 'Database error while fetching user' });
        if (userResults.length === 0) return res.status(404).json({ error: 'User not found' });

        const user = userResults[0];

        const getCartQuery = 'SELECT c.productId, c.quantity, p.productName, p.productPrice FROM cart c JOIN products p ON c.productId = p.productId WHERE c.userId = ?';
        db.query(getCartQuery, [user.id], (err, cartResults) => {
            if (err) return res.status(500).json({ error: 'Database error while fetching cart' });

            res.json({ user: { ...user, cart: cartResults } });
        });
    });
});

// PUT Update Profile
router.put('/', verifyToken, (req, res) => {
    const { username } = req.body;
    const userEmail = req.userEmail;

    const getUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(getUserQuery, [userEmail], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(404).json({ error: 'User not found' });

        const user = results[0];

        const updatedUsername = username || user.username;
        const updateQuery = 'UPDATE users SET username = ? WHERE email = ?';

        db.query(updateQuery, [updatedUsername, userEmail], (err) => {
            if (err) return res.status(500).json({ error: 'Failed to update profile' });

            res.json({
                message: 'Profile updated successfully',
                user: { ...user, username: updatedUsername },
            });
        });
    });
});

module.exports = router;
