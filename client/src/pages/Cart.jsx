import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import Auth from "../components/Auth";
import EmptyState from "../components/EmptyState";

const Cart = () => {
  const { user } = useAuth();

  const { cartProducts, removeItem, updateQuantity } = useCart();

  const subtotal = cartProducts.reduce(
    (acc, item) => acc + (item.productId.price || 0) * item.quantity,
    0,
  );

  const shipping = subtotal > 500 ? 0 : 50;

  const total = subtotal + shipping;

  // Handle quantity change
  const handleQuantityChange = (id, delta) => {
    const item = cartProducts.find((p) => p.productId._id === id);

    if (!item) return;

    const newQty = Math.min(
      item.productId.stock,
      Math.max(1, item.quantity + delta),
    );

    updateQuantity(id, newQty);
  };

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
    <div className="container py-5">
      <h1 className="fw-bold mb-4 h2">Shopping Cart ({cartProducts.length})</h1>

      <div className="row g-4">
        {/* LEFT SIDE */}
        <section className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <ul className="list-group list-group-flush mb-0">
              {cartProducts.map((item) => (
                <li key={item.productId._id} className="list-group-item p-4">
                  <div className="row align-items-center g-3">
                    {/* IMAGE */}
                    <div className="col-4 col-md-2">
                      <div className="bg-light rounded-3 p-2">
                        <img
                          src={item.productId?.images?.[0]}
                          alt={item.productId?.name}
                          className="img-fluid"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* INFO */}
                    <div className="col-8 col-md-5">
                      <h2 className="fw-bold mb-1 text-truncate h6">
                        {item.productId?.name}
                      </h2>

                      <p className="text-muted small mb-2">
                        ₹{item.productId.price.toLocaleString("en-IN")}
                      </p>

                      <button
                        className="btn btn-link text-danger p-0 small text-decoration-none"
                        onClick={() => removeItem(item.productId._id)}
                      >
                        <i className="bi bi-trash3 me-1"></i>
                        Remove
                      </button>
                    </div>

                    {/* QUANTITY */}
                    <div className="col-6 col-md-2">
                      <div className="input-group border rounded-3 overflow-hidden">
                        <button
                          className="btn btn-sm btn-light border-0"
                          onClick={() =>
                            handleQuantityChange(item.productId._id, -1)
                          }
                        >
                          -
                        </button>

                        <span className="input-group-text bg-white border-0 flex-grow-1 justify-content-center fw-bold small">
                          {item.quantity}
                        </span>

                        <button
                          className="btn btn-sm btn-light border-0"
                          onClick={() =>
                            handleQuantityChange(item.productId._id, 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* ITEM TOTAL */}
                    <div className="col-6 col-md-3 text-end">
                      <p className="fw-bold text-success mb-0 h6">
                        ₹
                        {(item.productId.price * item.quantity).toLocaleString(
                          "en-IN",
                        )}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <div className="col-lg-4">
          <div
            className="card border-0 shadow-sm rounded-4 p-4 sticky-top"
            style={{ top: "120px", zIndex: 1 }}
          >
            <h2 className="fw-bold mb-4 h5">Order Summary</h2>

            <dl className="mb-0">
              <div className="d-flex justify-content-between mb-2">
                <dt className="text-muted fw-normal">Subtotal</dt>
                <dd className="fw-bold mb-0">
                  ₹{subtotal.toLocaleString("en-IN")}
                </dd>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <dt className="text-muted fw-normal">Shipping</dt>
                <dd className="text-success fw-medium mb-0">
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </dd>
              </div>

              <hr className="my-3 opacity-10" />

              <div className="d-flex justify-content-between mb-4">
                <dt className="h5 fw-bold mb-0">Total</dt>
                <dd className="h5 fw-bold text-success mb-0">
                  ₹{total.toLocaleString("en-IN")}
                </dd>
              </div>
            </dl>

            <NavLink
              to="/checkout"
              className="btn btn-success w-100 py-3 fw-bold rounded-3 shadow-sm mb-3"
            >
              Proceed to Checkout
            </NavLink>

            <Link
              to="/products"
              className="btn bg-white text-dark w-100 py-2 fw-medium rounded-3 border-0 small"
            >
              Continue Shopping
            </Link>

            <div className="mt-4 p-3 bg-light rounded-3 text-center">
              <small className="text-muted">
                100% Secure Payments & Easy Returns
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
