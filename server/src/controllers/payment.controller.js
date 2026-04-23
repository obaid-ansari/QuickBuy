const Razorpay = require("razorpay");
const config = require("../config/env");
const cartModel = require("../models/cart.model");
const crypto = require("crypto");
const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");

const createOrder = async (req, res, next) => {
  const razorpay = new Razorpay({
    key_id: config.KEY_ID,
    key_secret: config.KEY_SECRET,
  });

  try {
    const { userId } = req.user;

    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    let totalPrice = 0;

    cart.items.forEach((item) => {
      totalPrice += item.productId.price * item.quantity;
    });

    if (totalPrice > 500000) {
      return res.status(400).json({
        message: "Order amount too large. Please reduce quantity.",
      });
    }

    const options = {
      amount: totalPrice * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
      totalPrice,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      shippingAddress,
      paymentMethod,
    } = req.body;

    const { userId } = req.user;

    // Step 1 — Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", config.KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment verification failed",
      });
    }

    // Step 2 — Get cart
    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Step 3 — Create order items
    let totalPrice = 0;

    const orderItems = cart.items.map((item) => {
      if (item.productId.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${item.productId.name}`);
      }

      totalPrice += item.productId.price * item.quantity;

      return {
        product: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      };
    });

    // Step 4 — Create Order
    const newOrder = new orderModel({
      userId,
      items: orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
      paymentStatus: "Completed",
      orderStatus: "Processing",
    });

    await newOrder.save();

    // Step 5 — Reduce stock
    for (const item of cart.items) {
      await productModel.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity },
      });
    }

    // Step 6 — Clear cart
    await cartModel.findOneAndDelete({ userId });

    res.status(200).json({
      message: "Payment successful & Order created",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

module.exports = { createOrder, verifyPayment };
