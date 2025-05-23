const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middleware/authMiddleware');

// Get user ID from email
async function getUserIdByEmail(email) {
    return new Promise((resolve, reject) => {
        db.query('SELECT id FROM users WHERE email = ?', [email], (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return resolve(null);
            resolve(results[0].id);
        });
    });
}

// Add product to cart
router.post('/add/:id/:quantity', verifyToken, async (req, res) => {
    const { id: productId, quantity } = req.params;

    try {
        const userId = await getUserIdByEmail(req.userEmail);
        if (!userId) return res.status(404).json({ error: 'User not found' });

        // Check if product exists
        db.query('SELECT productQuantity FROM products WHERE productId = ?', [productId], (err, productResults) => {
            if (err) return res.status(500).json({ error: 'Product query failed' });
            if (productResults.length === 0) return res.status(404).json({ error: 'Product not found' });

            const availableQty = productResults[0].productQuantity;

            // Check if product is already in cart
            db.query('SELECT quantity FROM cart WHERE userId = ? AND productId = ?', [userId, productId], (err, cartResults) => {
                if (err) return res.status(500).json({ error: 'Cart query failed' });

                const newQty = cartResults.length > 0
                    ? cartResults[0].quantity + Number(quantity)
                    : Number(quantity);

                // Update or insert into cart
                const cartQuery = cartResults.length > 0
                    ? 'UPDATE cart SET quantity = ? WHERE userId = ? AND productId = ?'
                    : 'INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?)';

                const cartParams = cartResults.length > 0
                    ? [newQty, userId, productId]
                    : [userId, productId, quantity];

                db.query(cartQuery, cartParams, (err) => {
                    if (err) return res.status(500).json({ error: 'Cart update failed' });

                    // Update product quantity
                    const updatedQty = availableQty - Number(quantity);
                    db.query('UPDATE products SET productQuantity = ? WHERE productId = ?', [updatedQty, productId], (err) => {
                        if (err) return res.status(500).json({ error: 'Product update failed' });

                        res.json({ message: 'Product added to cart successfully' });
                    });
                });
            });
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Failed to add to cart' });
    }
});


// Update product quantity in cart
router.put('/update/:id/:quantity', verifyToken, async (req, res) => {
    const { id: productId, quantity } = req.params;

    try {
        const userId = await getUserIdByEmail(req.userEmail);
        if (!userId) return res.status(404).json({ error: 'User not found' });

        db.query(
            'UPDATE cart SET quantity = ? WHERE userId = ? AND productId = ?',
            [quantity, userId, productId],
            (err, result) => {
                if (err) return res.status(500).json({ error: 'Cart update failed' });

                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Product not found in cart' });
                }

                res.json({ message: 'Cart updated successfully' });
            }
        );
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Failed to update cart' });
    }
});


// Remove product from cart
router.delete('/remove', verifyToken, async (req, res) => {
    const { productId } = req.body;

    try {
        const userId = await getUserIdByEmail(req.userEmail);
        if (!userId) return res.status(404).json({ error: 'User not found' });

        db.query('DELETE FROM cart WHERE userId = ? AND productId = ?', [userId, productId], (err, result) => {
            if (err) return res.status(500).json({ error: 'Cart deletion failed' });

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Product not found in cart' });
            }

            res.json({ message: 'Product removed from cart successfully' });
        });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ error: 'Failed to remove from cart' });
    }
});

module.exports = router;
