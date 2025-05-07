const db = require('../config/db');

// Get all products
exports.getAllProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Get a specific product
exports.getProductById = (req, res) => {
  const productId = req.params.id;
  db.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
    res.json(results[0]);
  });
};

// Add new product
exports.addProduct = (req, res) => {
  const { name, description, price, quantity } = req.body;
  db.query(
    'INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)',
    [name, description, price, quantity],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, name, description, price, quantity });
    }
  );
};

// Update a product
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;
  db.query(
    'UPDATE products SET name=?, description=?, price=?, quantity=? WHERE id=?',
    [name, description, price, quantity, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Product updated successfully' });
    }
  );
};

// Delete a product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Product deleted successfully' });
  });
};
