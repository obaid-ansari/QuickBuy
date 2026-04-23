import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import DetailedProduct from "./pages/DetailedProduct";
import Cart from "./pages/Cart";
import ProfilePage from "./pages/ProfilePage";
import Order from "./pages/Order";
import OrderDetail from "./pages/OrderDetail";
import Checkout from "./pages/Checkout";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/products/:id",
          element: <DetailedProduct />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/orders",
          element: <Order />,
        },
        {
          path: "/orders/:id",
          element: <OrderDetail />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/admin-dashboard",
          element: <Dashboard />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
