import axios from "axios";

const api = axios.create({
  baseURL: "https://quickbuy-1.onrender.com/api/auth",
  withCredentials: true,
});

// Get user is logged in or not
export const getMe = () => {
  return api.get("/me");
};

// Register
export const register = (user) => {
  return api.post(`/register`, user);
};

// Login
export const login = (user) => {
  return api.post(`/login`, user);
};

// Logout
export const logout = () => {
  return api.post(`/logout`);
};

// Get profile
export const profile = () => {
  return api.get("/profile");
};

// Update profile
export const profileUpdate = (data) => {
  return api.put("/profile", data);
};
