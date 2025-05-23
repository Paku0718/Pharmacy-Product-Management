const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');
const db = require("./config/db");

const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:3000/",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

// Routes
const auth = require('./routes/auth');
const cart = require('./routes/cart');
const profile = require('./routes/profile');
const products = require('./routes/products');
const message = require('./routes/message');
const checkout = require('./routes/checkout');

app.use("/", auth);
app.use("/", cart);
app.use("/", profile);
app.use("/", products);
app.use("/", message);
app.use("/", checkout);

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Confirm DB connection (already done in db.js)
console.log("Server connected to MySQL (see earlier logs for confirmation)");

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
