const cartModel = require("../models/cart.model");
const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");

const getOrder = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const orders = await orderModel
      .find({ userId })
      .populate({
        path: "items.product",
        model: "Product",
        select: "name images price",
      })
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "No orders found.",
        orders: [],
      });
    }

    res.status(200).json({
      status: "success",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log("Error fetching orders:", error.message);
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel
      .find()
      .populate({
        path: "items.product",
        model: "Product",
        select: "name images price",
      })
      .populate({
        path: "userId",
        model: "User",
        select: "_id name email",
      })
      .sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "No orders found.",
        orders: [],
      });
    }

    res.status(200).json({
      status: "success",
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.log("Error fetching orders:", error.message);
    next(error);
  }
};

const getOrderWithId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const order = await orderModel.findById(id).populate("items.product");

    if (!order) {
      const error = new Error("Order not found.");
      error.status = 404;
      return next(error);
    }

    if (order.userId.toString() !== userId) {
      const error = new Error("Unauthorized: You can see yours order only.");
      error.status = 403;
      return next(error);
    }

    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    console.error("Error in getOrderWithId:", error.message);
    next(error);
  }
};

const placeOrder = async (req, res, next) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    const { userId } = req.user;

    if (paymentMethod !== "cod") {
      const error = new Error("Please check the payment method.");
      error.status = 400;
      return next(error);
    }

    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId");

    if (!cart || cart.items.length === 0) {
      const error = new Error("Cart is empty.");
      error.status = 400;
      return next(error);
    }

    for (const item of cart.items) {
      if (item.productId.stock < item.quantity) {
        const error = new Error(
          `Insufficient stock for ${item.productId.name}. Available: ${item.productId.stock}`,
        );
        error.status = 400;
        return next(error);
      }
    }

    let totalPrice = 0;
    const orderItems = cart.items.map((item) => {
      totalPrice += item.productId.price * item.quantity;
      return {
        product: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      };
    });

    const newOrder = new orderModel({
      userId,
      items: orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "Pending" : "Completed",
      orderStatus: "Processing",
    });

    await newOrder.save();

    for (const item of cart.items) {
      await productModel.findByIdAndUpdate(item.productId._id, {
        $inc: { stock: -item.quantity },
      });
    }

    await cartModel.findOneAndDelete({ userId });

    res.status(201).json({
      status: "success",
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const orderData = await orderModel.findById(id);

    if (!orderData) {
      const error = new Error("Order not found.");
      error.status = 404;
      return next(error);
    }

    if (
      orderData.orderStatus === "Delivered" ||
      orderData.orderStatus === "Cancelled"
    ) {
      const error = new Error("Cannot update a completed or cancelled order.");
      error.status = 400;
      return next(error);
    }

    if (status === "Cancelled" && orderData.orderStatus !== "Cancelled") {
      await Promise.all(
        orderData.items.map((item) =>
          productModel.findByIdAndUpdate(item.product, {
            $inc: { stock: item.quantity },
          }),
        ),
      );
    }

    orderData.orderStatus = status;

    if (status === "Delivered") {
      orderData.paymentStatus = "Completed";
    }

    await orderData.save();

    res.status(200).json({
      status: "success",
      message: `Order status updated to ${status}`,
      data: orderData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  placeOrder,
  getOrder,
  getOrderWithId,
  updateOrderStatus,
  getAllOrders,
};
