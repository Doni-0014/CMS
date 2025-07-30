const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/admin', require('./routes/admin'));
// ... other routes

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
