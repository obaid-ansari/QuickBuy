const express = require("express");
const cors = require("cors");
const connectDB = require("./src/db/db");
require("dotenv").config();
const config = require("./src/config/env");
const authRouter = require("./src/routes/auth.route");
const errorMiddleware = require("./src/middleware/error.middleware");
const productRouter = require("./src/routes/product.route");
const cookieParser = require("cookie-parser");
const cartRouter = require("./src/routes/cart.route");
const orderRouter = require("./src/routes/order.route");
const paymentRouter = require("./src/routes/payment.route");

// App
const app = express();

// Database Connection
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://quickbuysite.netlify.app", "http://localhost:5173"],
    credentials: true,
  }),
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);
app.use("/api/payment", paymentRouter);

// Error middleware
app.use(errorMiddleware);
// Port
const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Your server is running on Port http://localhost:${PORT}`);
});
