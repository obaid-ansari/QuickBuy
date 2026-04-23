import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// Get cart prpducts
export const getCart = () => {
  return api.get("/cart");
};

// Add products in cart
export const addCart = (data) => {
  return api.post("/cart", data);
};

// Update cart products
export const updateCartQuantity = (pid, quantity) => {
  return api.put(`/cart/${pid}`, { quantity });
};

// Delete cart products
export const deleteCart = (pid) => {
  return api.delete(`/cart/${pid}`);
};
