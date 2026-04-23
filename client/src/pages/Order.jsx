import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import { useAuth } from "../hooks/useAuth";
import Auth from "../components/Auth";
import EmptyState from "../components/EmptyState";

const statusConfig = {
  Processing: "bg-warning-subtle text-warning border border-warning-subtle",
  Shipped: "bg-primary-subtle text-primary border border-primary-subtle",
  Delivered: "bg-success-subtle text-success border border-success-subtle",
  Cancelled: "bg-danger-subtle text-danger border border-danger-subtle",
};

const Order = () => {
  const { orders, fetchOrderProducts, fetchOrderById } = useOrder();
  const { user } = useAuth();

  if (!user) {
    return <Auth />;
  }

  useEffect(() => {
    fetchOrderProducts();
  }, []);

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        icon="bi-bag-x"
        title="No orders yet"
        message="Looks like you haven't made your choice yet."
        buttonText="Explore Products"
        buttonLink="/products"
      />
    );
  }

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h1 className="fw-bold mb-1 h2">My Orders</h1>
        <p className="text-muted small">
          {orders.length} {orders.length === 1 ? "Order" : "Orders"}
        </p>
      </div>

      <ul className="row g-4 list-unstyled mb-0">
        {orders.map((order) => {
          const statusClass =
            statusConfig[order.orderStatus] || statusConfig.Processing;
          return (
            <li key={order._id} className="col-12">
              <div className="card shadow-sm rounded-4 overflow-hidden">
                {/* HEADER */}
                <div className="bg-success-subtle px-3 py-3 border-bottom d-flex justify-content-between align-items-center gap-3">
                  <div className="d-flex gap-4">
                    <div>
                      <p className="text-muted small text-uppercase fw-bold mb-0">
                        Order ID
                      </p>
                      <span className="fw-bold small">
                        #{order._id.slice(-8).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-muted small text-uppercase fw-bold mb-0">
                        Date Placed
                      </p>
                      <span className="fw-medium small">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-lg-row flex-column gap-2">
                    <span
                      className={`badge rounded-pill px-3 py-2 fw-bold ${statusClass}`}
                    >
                      <i className="bi bi-truck me-1"></i>
                      {order.orderStatus}
                    </span>
                    <span
                      className={`badge rounded-pill px-3 py-2 fw-bold ${order.paymentStatus === "Completed" ? "bg-success text-white" : "bg-warning text-white"}`}
                    >
                      <i className="bi bi-currency-rupee me-1"></i>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* BODY */}
                <div className="card-body p-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
                  <div className="d-flex align-items-center flex-wrap gap-3">
                    {order.items?.slice(0, 3).map((item, i) => (
                      <div
                        key={i}
                        className="rounded-3 d-flex align-items-center justify-content-center"
                        style={{ width: "80px", height: "80px" }}
                      >
                        <img
                          src={item.product?.images?.[0]}
                          alt={item.product?.name}
                          className="img-fluid"
                          style={{ maxHeight: "100%", objectFit: "contain" }}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                    <div>
                      <p className="m-0 fw-bold text-dark">
                        {order.items?.[0]?.product?.name}
                      </p>
                      <p className="m-0 text-muted small d-flex align-items-center gap-2">
                        <i className="bi bi-credit-card"></i>
                        Paid via
                        <strong className="text-dark">
                          {order.paymentMethod?.toUpperCase()}
                        </strong>
                      </p>
                      <p className="fw-bold text-success m-0">
                        ₹{order.totalPrice?.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/orders/${order._id}`}
                    onClick={() => fetchOrderById(order._id)}
                    className="fw-semibold text-decoration-none text-dark"
                  >
                    Details
                    <i className="bi bi-chevron-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Order;
