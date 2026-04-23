const express = require("express");
const {
  getCartProducts,
  addCartProducts,
  updateCartProducts,
  deleteCartProducts,
} = require("../controllers/cart.controller");
const { userAuth } = require("../middleware/auth.middleware");

const cartRouter = express.Router();

cartRouter.get("/cart", userAuth, getCartProducts);
cartRouter.post("/cart", userAuth, addCartProducts);
cartRouter.put("/cart/:pid", userAuth, updateCartProducts);
cartRouter.delete("/cart/:pid", userAuth, deleteCartProducts);

module.exports = cartRouter;
