const cartModel = require("../models/cart.model");

const getCartProducts = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const cart = await cartModel
      .findOne({ userId })
      .populate("userId", "name email")
      .populate({
        path: "items.productId",
        model: "Product",
      });

    if (!cart) {
      return res.status(200).json({
        message: "Cart empty",
        data: cart,
      });
    }

    res.status(200).json({
      message: "Cart fetched successfully.",
      data: cart,
    });
  } catch (error) {
    console.log(`Error while fetching product of cart: `, error.message);
    next(error);
  }
};

const addCartProducts = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const { userId } = req.user;

    if (quantity < 1) {
      const error = new Error("Quantity must be at least 1");
      error.status = 400;
      return next(error);
    }

    let cart = await cartModel.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId.toString(),
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    } else {
      cart = new cartModel({
        userId,
        items: [{ productId, quantity }],
      });
      await cart.save();
    }

    res.status(200).json({
      status: "success",
      message: "Cart updated successfully.",
      data: cart,
    });
  } catch (error) {
    console.log(`Error while adding product in cart: `, error.message);
    next(error);
  }
};

const updateCartProducts = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const { quantity } = req.body;
    const { userId } = req.user;

    if (quantity < 1) {
      const error = new Error(
        "Quantity must be at least 1. To remove item, use Delete method.",
      );
      error.status = 400;
      return next(error);
    }

    const updatedCart = await cartModel
      .findOneAndUpdate(
        { userId, "items.productId": pid },
        {
          $set: { "items.$.quantity": quantity },
        },
        { returnDocument: "after" },
      )
      .populate("items.productId");

    if (!updatedCart) {
      const error = new Error("Cart or Product not found in cart.");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      status: "success",
      message: "Cart quantity updated.",
      data: updatedCart,
    });
  } catch (error) {
    console.log(`Error while updating cart: `, error.message);
    next(error);
  }
};

const deleteCartProducts = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const { userId } = req.user;

    const updatedCart = await cartModel
      .findOneAndUpdate(
        { userId },
        { $pull: { items: { productId: pid } } },
        { returnDocument: "after" },
      )
      .populate("items.productId");

    if (updatedCart.items.length === 0) {
      await cartModel.deleteOne({ userId });
    }

    if (!updatedCart) {
      const error = new Error("Cart not found.");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      status: "success",
      message: "Product removed from cart.",
      data: updatedCart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCartProducts,
  addCartProducts,
  updateCartProducts,
  deleteCartProducts,
};
