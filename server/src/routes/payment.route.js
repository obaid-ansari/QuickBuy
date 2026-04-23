const express = require("express");
const {
  createOrder,
  verifyPayment,
} = require("../controllers/payment.controller");
const { userAuth } = require("../middleware/auth.middleware");
const paymentRouter = express.Router();

paymentRouter.post("/create-order", userAuth, createOrder);
paymentRouter.post("/verify-payment", userAuth, verifyPayment);

module.exports = paymentRouter;
