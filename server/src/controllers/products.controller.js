const uploadPorductImage = require("../services/storage.service");
const productModel = require("../models/product.model");

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find();

    if (products.length === 0) {
      const error = new Error("No product found.");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      status: "success",
      message: "All Products.",
      data: products,
    });
  } catch (error) {
    console.log(`Error while getting products: `, error.message);
    next(error);
  }
};

const getSingleProducts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productById = await productModel.findById(id);

    if (!productById) {
      const error = new Error("Product not found with this ID.");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      status: "success",
      message: "Product fetched successfully.",
      data: productById,
    });
  } catch (error) {
    console.log(`Error while getting product by ID: `, error.message);
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, rating } = req.body;
    const buffer = req.file.buffer;

    const imageUrl = await uploadPorductImage(buffer);

    const product = new productModel({
      name,
      description,
      price,
      category,
      images: imageUrl,
      stock,
      rating,
    });

    await product.save();

    res.status(201).json({
      status: "success",
      message: "Product added successfully.",
      product,
    });
  } catch (error) {
    console.log(`Error while adding products: `, error.message);
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;

    const updateData = { ...req.body };

    if (req.file) {
      const buffer = req.file.buffer;
      const imageUrl = await uploadPorductImage(buffer);
      updateData.images = [imageUrl];
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updateData,
      { returnDocument: "after", runValidators: true },
    );

    if (updatedProduct.matchedCount === 0) {
      const errror = new Error("Product not found.");
      error.status = 404;
      return next(error);
    }

    if (updatedProduct.modifiedCount === 0) {
      const errror = new Error(
        "Product update failed, please try agian later.",
      );
      return next(error);
    }

    res.status(200).json({
      status: "success",
      message: "Product updated successfully.",
    });
  } catch (error) {
    console.log(`Error while updating product: `, error.message);
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productModel.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.log(`Error while deleting product: `, error.message);
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getSingleProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
