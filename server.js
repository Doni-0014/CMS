const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');

const doctorRoutes=require('./routes/doctorRoutes');
// const receptionistRoutes = require('./routes/receptionist');
// const adminRoutes = require('./routes/admin');
const PORT = process.env.PORT||8000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//Test route
// app.get('/api/tasks',(req,res)=>{
//     res.status(200).json({message:'get all tasks'});
// });


//Routes
app.use('/api/doctor', doctorRoutes);
// app.use('/api/receptionist', receptionistRoutes);
// app.use('/api/admin', adminRoutes);


//connect to DB and start the server
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`);
    });
});