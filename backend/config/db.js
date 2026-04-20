const mongoose = require("mongoose");

// Connect to MongoDB using Mongoose
async function connectDB() {
  try {
    // This reads MONGO_URI from .env
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // stop server if DB is not connected
  }
}

module.exports = connectDB;

