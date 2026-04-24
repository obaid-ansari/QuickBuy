import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createRazorpayOrder,
  getAllOrders,
  getOrderById,
  getOrders,
  placeOrder,
  updateOrder,
  verifyPayment,
} from "../services/orderService";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();
  const { fetchCartProducts } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);

  const paymentMethods = [
    {
      id: "card",
      icon: "bi-credit-card",
      label: "Credit / Debit Card",
      sub: "Visa, Mastercard, RuPay",
    },
    { id: "upi", icon: "bi-phone", label: "UPI", sub: "GPay, PhonePe, Paytm" },
    {
      id: "cod",
      icon: "bi-box-seam",
      label: "Cash on Delivery",
      sub: "Pay when delivered",
    },
  ];

  const [shippingAddress, setShippingAddress] = useState({
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
  });

  const handlerAddress = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  // fetch orders
  const fetchOrderProducts = async () => {
    try {
      const response = await getOrders();
      if (response.status === 200) {
        setOrders(response?.data?.orders || []);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
    }
  };

  // fetch all orders
  const fetchAllOrder = async () => {
    try {
      const response = await getAllOrders();
      if (response.status === 200) {
        setAllOrders(response?.data?.orders || []);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
    }
  };

  // fetch single order
  const fetchOrderById = async (id) => {
    try {
      const response = await getOrderById(id);
      if (response.status === 200) {
        setOrderDetail(response.data.data);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllOrder();
      fetchOrderProducts();
    }
  }, [user]);

  // CASH ON DEVLEVERY
  const cashOnDeliveryOrder = async () => {
    const response = await placeOrder({
      shippingAddress,
      paymentMethod,
    });
    if (response.status === 201) {
      toast.success(response.data.message); // success
      setShippingAddress({
        phone: "",
        address: "",
        city: "",
        pincode: "",
        state: "",
      });
      await fetchCartProducts();
      await fetchOrderProducts();
      await fetchAllOrder();
    }
  };

  // ONLINE PAYMENT
  const razorpayOrder = async () => {
    const response = await createRazorpayOrder();
    const order = response.data.order;

    let options = {
      key: import.meta.env.VITE_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits.
      currency: order.currency,
      name: "QuickBuy",
      description: "Order payment",
      // image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: shippingAddress.phone,
      },
      theme: {
        color: "#4acc33",
      },

      handler: async function (response) {
        const res = await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          shippingAddress,
          paymentMethod,
        });

        if (res.status === 200) {
          toast.success("Payment successful!");

          await fetchCartProducts();
          await fetchOrderProducts();
          await fetchAllOrder();
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // place order
  const handlerOrderPlace = async () => {
    if (
      !shippingAddress.address ||
      !shippingAddress.phone ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.pincode
    ) {
      toast.error("Fill all fields properly!"); // validation
      return;
    }
    try {
      if (paymentMethod === "cod") {
        await cashOnDeliveryOrder();
      } else {
        await razorpayOrder();
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage); // error
    }
  };

  const orderStatusUpdate = async (id, status) => {
    try {
      const response = await updateOrder(id, { status });
      if (response.status === 200) {
        console.log(response.data);
        toast.success(response.data.message);
        await fetchAllOrder();
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage); // error
    }
  };

  // ── Update status locally ──
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderStatusUpdate(orderId, newStatus);

      setAllOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, orderStatus: newStatus } : o,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        paymentMethod,
        paymentMethods,
        setPaymentMethod,
        handlerAddress,
        shippingAddress,
        fetchOrderProducts,
        handlerOrderPlace,
        orders,
        fetchOrderById,
        orderDetail,
        allOrders,
        handleStatusChange,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
