import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Products = lazy(() => import("./pages/Products"));
const DetailedProduct = lazy(() => import("./pages/DetailedProduct"));
const Cart = lazy(() => import("./pages/Cart"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const Order = lazy(() => import("./pages/Order"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Error = lazy(() => import("./pages/Error"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

import Loader from "./components/Loader";

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
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
