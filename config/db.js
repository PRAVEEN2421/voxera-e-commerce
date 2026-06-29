const { log } = require("console")
const mongoose = require("mongoose")
const env = require ("dotenv").config()


const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGODB_URI;
    if (!mongoURI || mongoURI.includes('cluster0.plkcjhb.mongodb.net')) {
      mongoURI = 'mongodb://127.0.0.1:27017/Ecommerce';
    }
    await mongoose.connect(mongoURI);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB Connection error:", error.message);
    // Try local fallback if first attempt failed
    try {
      console.log("Attempting local MongoDB fallback...");
      await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce');
      console.log("DB Connected (Local Fallback)");
    } catch (fallbackError) {
      console.log("Fallback connection error:", fallbackError.message);
      process.exit(1);
    }
  }
}

module.exports = connectDB