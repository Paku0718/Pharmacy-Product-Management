const express = require('express');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middleware/authMiddleware');

// CREATE product (admin only)
router.post('/products', verifyToken, (req, res) => {
    if (req.userType !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
    }

    const { productId, productName, productDescription, productPrice, productQuantity } = req.body;

    const insertQuery = `
        INSERT INTO products (productId, productName, productDescription, productPrice, productQuantity)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(insertQuery, [productId, productName, productDescription, productPrice, productQuantity], (err, result) => {
        if (err) {
            console.error('Product creation error:', err);
            return res.status(500).json({ error: 'Product creation failed' });
        }

        res.status(201).json({ message: 'Product created successfully', productId });
    });
});

// GET product by ID
router.get('/products/:id', (req, res) => {
    const productId = req.params.id;

    db.query('SELECT * FROM products WHERE productId = ?', [productId], (err, results) => {
        if (err) {
            console.error('Fetching product error:', err);
            return res.status(500).json({ error: 'Failed to fetch product' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(results[0]);
    });
});

// GET all products
router.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error('Fetching products error:', err);
            return res.status(500).json({ error: 'Failed to fetch products' });
        }

        res.status(200).json(results);
    });
});

// UPDATE product by ID (admin only)
router.put('/products/:id', verifyToken, (req, res) => {
    if (req.userType !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
    }

    const productId = req.params.id;
    const { productName, productDescription, productPrice, productQuantity } = req.body;

    const updateQuery = `
        UPDATE products
        SET productName = ?, productDescription = ?, productPrice = ?, productQuantity = ?
        WHERE productId = ?
    `;

    db.query(updateQuery, [productName, productDescription, productPrice, productQuantity, productId], (err, result) => {
        if (err) {
            console.error('Product update error:', err);
            return res.status(500).json({ error: 'Product update failed' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully' });
    });
});

// DELETE product by ID (admin only)
router.delete('/products/:id', verifyToken, (req, res) => {
    if (req.userType !== 'admin') {
        return res.status(403).json({ error: 'Access denied' });
    }

    const productId = req.params.id;

    db.query('DELETE FROM products WHERE productId = ?', [productId], (err, result) => {
        if (err) {
            console.error('Product deletion error:', err);
            return res.status(500).json({ error: 'Product deletion failed' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    });
});

module.exports = router;
