const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/yourRoutes", require("./routes/yourRouteFile"));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
