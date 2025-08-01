const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI environment variable is not defined!');
      console.log('Please add MONGODB_URI to your .env file');
      console.log('You can use MongoDB Atlas (free): https://www.mongodb.com/atlas');
      console.log('Example: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clinic_management');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    console.log('Solutions:');
    console.log('   1. Install MongoDB locally: https://docs.mongodb.com/manual/installation/');
    console.log('   2. Use MongoDB Atlas (free): https://www.mongodb.com/atlas');
    console.log('   3. Check your connection string in .env file');
    process.exit(1); 
  }
};

module.exports = connectDB;
