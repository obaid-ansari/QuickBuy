import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useOrder } from "../hooks/useOrder";
import Auth from "../components/Auth";
import EmptyState from "../components/EmptyState";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

// ── Section Title ──────────────────────────────────────────────
const SectionTitle = ({ icon, title }) => (
  <h2
    className="fw-semibold mb-3 pb-2 d-flex align-items-center gap-2 h5"
    style={{ fontSize: "0.9rem" }}
  >
    <i className={`bi ${icon} text-success`} style={{ fontSize: "0.9rem" }}></i>
    {title}
  </h2>
);

// ── Main Checkout Page ─────────────────────────────────────────
const Checkout = () => {
  const { cartProducts } = useCart();
  const { user } = useAuth();
  const {
    paymentMethod,
    paymentMethods,
    setPaymentMethod,
    handlerAddress,
    shippingAddress,
    handlerOrderPlace,
  } = useOrder();

  const subtotal = cartProducts.reduce(
    (s, i) => s + i.productId.price * i.quantity,
    0,
  );
  const delivery = subtotal > 499 ? 0 : 49;
  const total = subtotal + delivery;

  // If not logged in
  if (!user) {
    return <Auth />;
  }

  // If cart empty
  if (!cartProducts.length) {
    return (
      <EmptyState
        icon="bi-cart-x"
        title="Your cart is empty"
        message="Looks like you haven't added anything yet."
        buttonText="Start Shopping"
        buttonLink="/products"
      />
    );
  }
  return (
    <div className="container my-5">
      {/* Header */}
      <div className="mb-4 ms-1">
        <h1 className="fw-bold fs-4 mb-1">Checkout</h1>
        <p className="text-muted small mb-0">Complete your order</p>
      </div>

      <div className="row g-4 align-items-start">
        {/* ── Left Column ── */}
        <div className="col-lg-7">
          {/* Delivery Address */}
          <section className="border rounded-4 p-4 bg-white mb-4">
            <SectionTitle icon="bi-geo-alt" title="Delivery address" />
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="form-label fw-medium small">
                  Phone number
                </label>
                <input
                  name="phone"
                  required
                  value={shippingAddress.phone}
                  placeholder="9872234567"
                  onChange={handlerAddress}
                  type="tel"
                  className="form-control form-control-sm rounded-3"
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label fw-medium small">City</label>
                <input
                  name="city"
                  required
                  type="text"
                  placeholder="Mumbai"
                  value={shippingAddress.city}
                  onChange={handlerAddress}
                  className="form-control form-control-sm rounded-3"
                />
              </div>
              <div className="col-12">
                <label className="form-label fw-medium small">Address</label>
                <input
                  name="address"
                  type="text"
                  placeholder="B-204, Shivam Apartments"
                  value={shippingAddress.address}
                  onChange={handlerAddress}
                  required
                  className="form-control form-control-sm rounded-3"
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label fw-medium small">Pincode</label>
                <input
                  name="pincode"
                  type="text"
                  required
                  placeholder="400053"
                  value={shippingAddress.pincode}
                  onChange={handlerAddress}
                  className="form-control form-control-sm rounded-3"
                  maxLength={6}
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label fw-medium small">State</label>
                <select
                  required
                  name="state"
                  value={shippingAddress.state}
                  onChange={handlerAddress}
                  className="form-select form-select-sm rounded-3"
                >
                  {indianStates.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="border rounded-4 p-4 bg-white">
            <SectionTitle icon="bi-shield-check" title="Payment method" />
            <div className="row g-2">
              {paymentMethods.map((m) => (
                <div className="col-4" key={m.id}>
                  <div
                    className="rounded-3 p-2 text-center border"
                    style={{
                      background:
                        paymentMethod === m.id ? "#d5fbe1" : "transparent",
                      cursor: "pointer",
                    }}
                    onClick={() => setPaymentMethod(m.id)}
                  >
                    <i
                      className={`bi ${m.icon} text-success d-block mb-1`}
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                    <p
                      className="fw-medium mb-0"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {m.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Right Column ── */}
        <div className="col-lg-5">
          {/* Order Items */}
          <section className="border rounded-4 p-4 bg-white mb-3">
            <SectionTitle icon="bi-bag" title="Order summary" />
            {cartProducts.map((item) => (
              <div
                key={item.productId._id}
                className="d-flex gap-3 py-2"
                style={{
                  borderBottom: "0.5px solid var(--color-border-tertiary)",
                }}
              >
                <div
                  className="rounded-3 overflow-hidden flex-shrink-0"
                  style={{ width: "52px", height: "52px" }}
                >
                  <img
                    src={item.productId.images[0]}
                    alt={item.productId.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex-grow-1" style={{ minWidth: 0 }}>
                  <p
                    className="fw-medium mb-0"
                    style={{
                      fontSize: "0.78rem",
                      lineHeight: 1.3,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.productId.name}
                  </p>
                  <p
                    className="text-muted mb-0"
                    style={{ fontSize: "0.65rem" }}
                  >
                    {item.productId.category}
                  </p>
                  <p
                    className="text-muted mb-0"
                    style={{ fontSize: "0.65rem" }}
                  >
                    Qty: {item.quantity}
                  </p>
                </div>
                <span
                  className="fw-medium text-success flex-shrink-0"
                  style={{ fontSize: "0.82rem" }}
                >
                  ₹
                  {(item.productId.price * item.quantity).toLocaleString(
                    "en-IN",
                  )}
                </span>
              </div>
            ))}
          </section>

          {/* Price Summary */}
          <section className="border rounded-4 p-4 bg-white">
            <SectionTitle icon="bi-receipt" title="Price details" />
            <div
              style={{
                borderTop: "0.5px solid var(--color-border-tertiary)",
                paddingTop: "0.75rem",
              }}
            >
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small">Subtotal</span>
                <span className="fw-medium small">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small">Delivery charges</span>
                <span className="fw-medium small text-success">
                  {delivery === 0 ? "Free" : `₹${delivery}`}
                </span>
              </div>
              <div
                className="d-flex justify-content-between pt-2 mt-1"
                style={{
                  borderTop: "0.5px solid var(--color-border-tertiary)",
                }}
              >
                <span className="fw-semibold">Total</span>
                <span
                  className="fw-bold text-success"
                  style={{ fontSize: "1.1rem" }}
                >
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button
              className="btn btn-success w-100 fw-semibold py-2 mt-3 rounded-3"
              onClick={() => handlerOrderPlace()}
            >
              <i className="bi bi-bag-check me-2"></i>Place order
            </button>

            <div className="d-flex align-items-center justify-content-center gap-2 mt-4">
              <i
                className="bi bi-shield-check text-success"
                style={{ fontSize: "0.72rem" }}
              ></i>
              <span className="text-muted" style={{ fontSize: "0.68rem" }}>
                100% secure & encrypted payment
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
