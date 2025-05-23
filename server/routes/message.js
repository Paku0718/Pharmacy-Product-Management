const express = require('express');
const router = express.Router();

// In-memory store to simulate message database
let messages = [];

router.post('/messages', (req, res) => {
    try {
        const { email, mobileNumber, message } = req.body;

        const newMessage = {
            id: Date.now().toString(),
            email,
            mobileNumber,
            message
        };

        messages.push(newMessage);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save message' });
    }
});

router.get('/messages', (req, res) => {
    try {
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

module.exports = router;
