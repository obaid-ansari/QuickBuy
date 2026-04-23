const express = require("express");
const {
  userRegister,
  userLogin,
  userProfile,
  updateProfile,
  getMe,
  logout,
} = require("../controllers/auth.contoller");
const { userAuth } = require("../middleware/auth.middleware");
const validator = require("../middleware/validator.middleware");
const { registerSchema, loginSchema } = require("../validator/auth.validator");

const authRouter = express.Router();

authRouter.post("/register", validator(registerSchema), userRegister);
authRouter.post("/login", validator(loginSchema), userLogin);

authRouter.get("/me", userAuth, getMe);
authRouter.post("/logout", logout);

authRouter.get("/profile", userAuth, userProfile);
authRouter.put("/profile", userAuth, updateProfile);

module.exports = authRouter;
