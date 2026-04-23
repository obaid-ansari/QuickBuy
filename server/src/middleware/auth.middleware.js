const jwt = require("jsonwebtoken");
const config = require("../config/env");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      const error = new Error(
        "Access Denied: No session found, please login to continue.",
      );
      error.status = 401;
      return next(error);
    }

    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    const status = 401;
    next({ status, error });
  }
};

const adminOnly = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      const error = new Error(
        "Access Forbidden: This action requires Administrator privileges",
      );
      error.status = 401;
      return next(error);
    }

    next();
  } catch (error) {
    const status = 403;
    next({ status, error });
  }
};

module.exports = { userAuth, adminOnly };
