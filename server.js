const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8002;

// Middleware
app.use(express.json());

// Routes
app.use('/api/pharmacist', require('./routes/pharmacist'));
//app.use('/api/admin', require('./routes/admin'));
//app.use('/api/doctor', require('./routes/doctor'));
//app.use('/api/labtech', require('./routes/labtech'));
//app.use('/api/receptionist', require('./routes/receptionist'));

// DB & Server Init
connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));