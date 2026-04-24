import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCart,
  addCart,
  updateCartQuantity,
  deleteCart,
} from "../services/cartService";
import { useAuth } from "../hooks/useAuth";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartProducts, setCartProducts] = useState([]);

  // fetch cart
  const fetchCartProducts = async () => {
    try {
      const response = await getCart();
      if (response.status === 200) {
        setCartProducts(response.data?.data?.items || []);
      }
    } catch (err) {
      setCartProducts([]); // silent fail
    }
  };
  useEffect(() => {
    if (user) {
      fetchCartProducts();
    }
  }, [user]);

  // add to cart
  const addToCartProducts = async (productId, quantity) => {
    try {
      const response = await addCart({ productId, quantity });
      if (response.status === 200) {
        toast.success(response.data.message); // success

        await fetchCartProducts();
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage); // error
    }
  };

  // update qty
  const updateQuantity = async (pid, quantity) => {
    try {
      const response = await updateCartQuantity(pid, quantity);
      if (response.status === 200) {
        toast.success(response.data.message); // success
        await fetchCartProducts();
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage); // error
    }
  };

  // remove item
  const removeItem = async (pid) => {
    try {
      const response = await deleteCart(pid);
      if (response.status === 200) {
        toast.success(response.data.message); // success
        setCartProducts(response.data?.data?.items || []);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage); // error
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addToCartProducts,
        fetchCartProducts,
        removeItem,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
