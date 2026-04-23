import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import Auth from "../components/Auth";
import { useAuth } from "../hooks/useAuth";
import EmptyState from "../components/EmptyState";

const OrderDetails = () => {
  const { id } = useParams();
  const { orderDetail, fetchOrderById } = useOrder();
  const { user } = useAuth();

  useEffect(() => {
    if (id) fetchOrderById(id);
  }, [id]);

  // If not logged in
  if (!user) {
    return <Auth />;
  }

  if (!orderDetail || !orderDetail.items) {
    return (
      <EmptyState
        icon="bi-exclamation-circle"
        title="Order not found"
        message="We couldn't find the order you're looking for."
        buttonText="View All Orders"
        buttonLink="/orders"
      />
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          {/* h1 for SEO, h4 class keeps visual size identical */}
          <h1 className="fw-bold mb-1 h4">Order Details</h1>
          <p className="text-muted small mb-0">
            Order ID:
            <span className="fw-bold text-dark ms-1">
              #{orderDetail._id.slice(-8)}
            </span>
          </p>
        </div>
        <Link
          to="/orders"
          className="btn btn-outline-secondary btn-sm rounded-pill"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </Link>
      </div>

      <div className="row g-4">
        {/* LEFT SIDE */}
        <div className="col-lg-8">
          {/* ORDER ITEMS */}
          <section className="card border-0 shadow-sm rounded-4 mb-3">
            <div className="card-body p-3">
              <h2 className="fw-bold mb-4 h5">Ordered Items</h2>
              {orderDetail.items.map((item) => (
                <div
                  key={item._id}
                  className="d-flex gap-3 mb-4 p-2 align-items-center border rounded-4"
                >
                  <div
                    className="flex-shrink-0"
                    style={{ width: "90px", height: "90px" }}
                  >
                    <img
                      src={item.product?.images?.[0]}
                      alt={item.product?.name}
                      className="w-100 h-100 rounded-3"
                      style={{ objectFit: "contain" }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex-grow-1">
                    {/* h3 with h6 class = same look, better hierarchy */}
                    <h3 className="fw-bold mb-1 h6">{item.product?.name}</h3>
                    <p className="text-muted small mb-2">
                      {item.product?.category}
                      <span className="ms-2 text-dark">
                        Qty: {item.quantity}
                      </span>
                    </p>
                    <span className="fw-bold text-success">
                      ₹{item.product?.price?.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SHIPPING INFO */}
          <section className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-3">
              <h2 className="fw-bold mb-3 h5">Shipping Information</h2>
              <div className="d-flex gap-3 align-items-start">
                <i className="bi bi-geo-alt text-success fs-4"></i>
                <div>
                  <p className="fw-bold mb-1">Delivery Address</p>
                  <p className="text-muted mb-0">
                    {orderDetail.shippingAddress.address}-{" "}
                    {orderDetail.shippingAddress.city} <br />
                    {orderDetail.shippingAddress.state} -{" "}
                    {orderDetail.shippingAddress.pincode} <br />
                    {orderDetail.shippingAddress.phone}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-lg-4">
          <section
            className="card border shadow-sm rounded-4 sticky-top"
            style={{ top: "120px", zIndex: 2 }}
          >
            <div className="card-body p-3">
              <h2 className="fw-bold mb-3 h5">Order Summary</h2>
              <p className="text-muted small text-uppercase fw-bold mb-3">
                All Details
              </p>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="d-flex align-items-center gap-2 text-secondary">
                  <i className="bi bi-truck text-warning"></i>Delivery
                </span>
                <span className="fw-bold small">{orderDetail.orderStatus}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="d-flex align-items-center gap-2 text-secondary">
                  <i className="bi bi-credit-card text-primary"></i>Method
                </span>
                <span className="fw-bold text-uppercase small">
                  {orderDetail.paymentMethod}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="d-flex align-items-center gap-2 text-secondary">
                  <i className="bi bi-shield-check text-success"></i>Status
                </span>
                <span className="fw-bold text-success small">
                  {orderDetail.paymentStatus}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span className="fw-medium">
                  ₹{orderDetail.totalPrice?.toLocaleString("en-IN")}
                </span>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold text-dark">Total Amount</span>
                <span className="fw-bold text-success">
                  ₹{orderDetail.totalPrice?.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
