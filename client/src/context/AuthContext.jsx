import { createContext, useEffect, useState } from "react";
import { isCookie, useNavigate } from "react-router-dom";
import {
  register,
  login,
  getMe,
  logout,
  profileUpdate,
} from "../services/authService";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Register form data
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  // Login form data
  const [loginData, setLoginData] = useState({
    identifier: "",
    password: "",
  });

  // Handle register input changes
  const registerHandler = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  // Register user
  const registerUser = async () => {
    try {
      const response = await register(registerData);
      if (response.status === 201) {
        toast.success(response.data.message);
        await fetchUser();
        navigate("/");
        setRegisterData({
          name: "",
          email: "",
          phone: "",
          password: "",
          address: "",
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  // Register form submit
  const registerHandleSubmit = async (e) => {
    e.preventDefault();
    registerUser();
  };

  // Handle login input changes
  const loginHandler = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // Login user
  const loginUser = async () => {
    try {
      const response = await login(loginData);
      if (response.status === 200) {
        toast.success(response.data.message);
        await fetchUser();
        navigate("/");
        setLoginData({
          identifier: "",
          password: "",
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  // Login form submit
  const loginHandleSubmit = async (e) => {
    e.preventDefault();
    loginUser();
  };

  // Fetch current user
  const fetchUser = async () => {
    try {
      const res = await getMe();
      if (res.data.status === "success") {
        setUser(res.data.user);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      console.log(errorMessage);
      setUser(null);
    }
  };

  // Fetch user on mount
  useEffect(() => {
    fetchUser();
  }, []);

  // Logout user
  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.status === 200) {
        toast.success(res.data.message);
        fetchUser();
        navigate("/login");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  // Handle profile input changes
  const updateUserChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await profileUpdate(user);
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsEditing(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.log(errorMessage);
    }
  };

  // Toggle editing mode
  const handleCencelEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <AuthContext.Provider
      value={{
        registerData,
        registerHandler,
        registerHandleSubmit,
        loginData,
        loginHandler,
        loginHandleSubmit,
        user,
        handleLogout,
        isEditing,
        updateUserChange,
        handleUpdateProfile,
        handleCencelEditing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
