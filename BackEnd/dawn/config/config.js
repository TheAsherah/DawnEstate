const mongoose = require("mongoose");

require("dotenv").config();
const dbURI = process.env.MONGODB_URI;

const connectDB = async () => {
  if (!dbURI) {
    console.error("MongoDB connection error: MONGODB_URI is not configured");
    process.exit(1);
  }

  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
