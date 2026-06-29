const { log } = require("console")
const mongoose = require("mongoose")
const env = require ("dotenv").config()


let isConnected = 0;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    let mongoURI = process.env.MONGODB_URI;
    if (!mongoURI || mongoURI.includes('cluster0.plkcjhb.mongodb.net')) {
      mongoURI = 'mongodb://127.0.0.1:27017/Ecommerce';
    }
    
    const db = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000
    });
    isConnected = db.connections[0].readyState;
    console.log("DB Connected successfully");
  } catch (error) {
    console.log("DB Connection error:", error.message);
    if (!process.env.VERCEL) {
      try {
        console.log("Attempting local MongoDB fallback...");
        const fallbackDb = await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce');
        isConnected = fallbackDb.connections[0].readyState;
        console.log("DB Connected (Local Fallback)");
      } catch (fallbackError) {
        console.log("Fallback connection error:", fallbackError.message);
      }
    }
  }
}

module.exports = connectDB