require("dotenv").config();

const _config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  IMAGE_KIT_PRIVATE_KEY: process.env.IMAGE_KIT_PRIVATE_KEY,
  KEY_ID: process.env.KEY_ID,
  KEY_SECRET: process.env.KEY_SECRET,
  RAZORPAY_SECRET:process.env.RAZORPAY_SECRET
};

module.exports = Object.freeze(_config);
