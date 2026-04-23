import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// Place order
export const placeOrder = (data) => {
  return api.post("/orders/cod", data);
};

// Get orders
export const getOrders = () => {
  return api.get("/orders");
};

// Get all orders
export const getAllOrders = () => {
  return api.get("/all-orders");
};

// Get order by Id
export const getOrderById = (id) => {
  return api.get(`/orders/${id}`);
};

// Only for admin
export const updateOrder = (id, data) => {
  return api.put(`/orders-update/${id}`, data);
};

export const createRazorpayOrder = () => {
  return api.post("/payment/create-order");
};

export const verifyPayment = (data) => {
  return api.post("/payment/verify-payment", data);
};
