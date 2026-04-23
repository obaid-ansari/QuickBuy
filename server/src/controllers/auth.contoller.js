const userModel = require("../models/user.model");
const config = require("../config/env");
const jwt = require("jsonwebtoken");
const { Error } = require("mongoose");

const userRegister = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      address,
      role = "customer",
    } = req.body;

    const existingUser = await userModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      const error = new Error(
        "A user with this email or phone number already exists.",
      );
      error.status = 409;
      return next(error);
    }

    const user = new userModel({
      name,
      email,
      phone,
      password,
      role,
      address,
    });
    await user.save();

    const token = await user.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(201).json({
      status: "success",
      message: "Account created successfully! Welcome to QuickBuy.",
    });
  } catch (error) {
    console.error("Registration Error:", error.message);
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    const isUserExisted = await userModel.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!isUserExisted) {
      const error = new Error("Account not found. Please register first.");
      error.status = 404;
      return next(error);
    }

    const isPasswordMatch = await isUserExisted.comparePassword(password);

    if (!isPasswordMatch) {
      const error = new Error("Invalid credentials.");
      error.status = 401;
      return next(error);
    }

    const token = await isUserExisted.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json({
      status: "success",
      message: "Logged in successfully! Welcome back.",
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    next(error);
  }
};

const userProfile = async (req, res, next) => {
  try {
    const id = req.user.userId;

    const profile = await userModel
      .findById(id)
      .select("_id name email phone address");

    if (!profile) {
      const errror = new Error("User not found.");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      status: "success",
      message: "User profile fetch successfully.",
      data: profile,
    });
  } catch (error) {
    console.error("User Profile Error:", error.message);
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const id = req.user.userId;

    const { name, email, phone, passowrd, address } = req.body;

    const updatedProfile = { ...req.body };

    const profile = await userModel.findByIdAndUpdate(id, updatedProfile, {
      returnDocument: "after",
      runValidators: true,
    });

    if (profile.matchedCount === 0) {
      const errror = new Error("User not found.");
      error.status = 404;
      return next(error);
    }

    if (profile.modifiedCount === 0) {
      const errror = new Error(
        "User profile update failed, please try agian later.",
      );
      return next(error);
    }

    res.status(200).json({
      status: "success",
      message: "Profile updated successfully.",
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      error = new Error(`${field} already exists`);
      error.status = 400;
      next(error);
    }
    console.log(`Error while updating profile: `, error.message);
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      const error = new Error("User not found.");
      error.status = 404;
      next(error);
    }

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
  userProfile,
  updateProfile,
  getMe,
  logout,
};
