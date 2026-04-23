const mongoose = require("mongoose");
const config = require("../config/env");

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(config.MONGO_URI);
    // Professional message with host details
    console.log(`MongoDB Connected!✅`);
  } catch (error) {
    console.log(`Database connection failed! \nError: ${error.message}`);
  }
};

module.exports = connectDB;
