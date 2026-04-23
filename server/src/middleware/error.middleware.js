const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message =
    err.message || "Internal server error, please try again later.";

  res.status(status).json({
    status: "error",
    message: message,
  });
};

module.exports = errorMiddleware;
