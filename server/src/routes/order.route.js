const express = require("express");
const { userAuth, adminOnly } = require("../middleware/auth.middleware");
const {
  placeOrder,
  getOrder,
  getOrderWithId,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/order.conroller");

const orderRouter = express.Router();

orderRouter.get("/orders", userAuth, getOrder);
orderRouter.get("/orders/:id", userAuth, getOrderWithId);
orderRouter.post("/orders/cod", userAuth, placeOrder);

orderRouter.get("/all-orders", userAuth, userAuth, getAllOrders);
orderRouter.put("/orders-update/:id", userAuth, adminOnly, updateOrderStatus);

module.exports = orderRouter;
