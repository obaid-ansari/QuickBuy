import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// Get all products
export const getProducts = () => {
  return api.get("/products");
};

// Get product by Id
export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

export const postProduct = (data) => {
  return api.post(`/products`, data);
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};

export const updateProduct = (id, data) => {
  return api.put(`/products/${id}`, data);
};
