const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/env");

const userSchema = mongoose.Schema(
  {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: false,
        default: "",
      },
      role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
      },
  },
  { timestamps: true },
);

// Convert password into Hash
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRound);

    this.password = hashedPassword;
  } catch (error) {
    console.error("Error while hashing password:", error.message);
  }
});

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);

    return isMatch;
  } catch (error) {
    console.error("Error while comparing password:", error.message);
  }
};

// Generate JWT token
userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      {
        userId: this._id,
        email: this.email,
        role: this.role,
      },
      config.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      },
    );

    return token;
  } catch (error) {
    console.error("Error while generating JWT Token:", error.message);
  }
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
