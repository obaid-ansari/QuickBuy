const express = require("express");
const { userAuth, adminOnly } = require("../middleware/auth.middleware");
const multer = require("multer");
const {
  getAllProducts,
  getSingleProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");

const productRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Public routes
productRouter.get("/products", getAllProducts);
productRouter.get("/products/:id", getSingleProducts);

// Nnly for admin
productRouter.post(
  "/products",
  userAuth,
  adminOnly,
  upload.single("image"),
  addProduct,
);
productRouter.put(
  "/products/:id",
  userAuth,
  adminOnly,
  upload.single("image"),
  updateProduct,
);
productRouter.delete("/products/:id", userAuth, adminOnly, deleteProduct);

module.exports = productRouter;
