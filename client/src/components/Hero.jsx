import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Hero = () => {
  const { user } = useAuth();
  return (
    <section
      className="row g-0 rounded-4 overflow-hidden mb-4 bg-success bg-gradient"
      aria-label="Hero banner"
    >
      {/* Left — Text */}
      <div className="col-md-6 p-4 p-md-5 d-flex flex-column justify-content-center">
        {/* Live pill */}
        <div
          className="d-inline-flex align-items-center gap-2 rounded-pill mb-3 px-3 py-1"
          style={{
            background: "rgba(255,255,255,0.15)",
            width: "fit-content",
          }}
        >
          <span
            className="text-white fw-medium"
            style={{ fontSize: "0.72rem" }}
          >
            {user ? `Hello ${user.name}` : "Welcome to QuickBuy"}
          </span>
        </div>

        <h1
          className="fw-bold text-white mb-3"
          style={{ lineHeight: 1.2, fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
        >
          Your everyday store,{" "}
          <span style={{ color: "#bbf7d0" }}>reimagined</span>
        </h1>

        <p className="mb-4 text-light">
          Shop millions of products across 6 categories. Fast delivery, easy
          returns, unbeatable prices.
        </p>

        <div className="d-flex gap-2 flex-wrap mb-4">
          <Link
            to="/products"
            className="btn btn-light text-success fw-semibold px-4"
            aria-label="Shop Now - Browse all products"
          >
            Shop Now
          </Link>
          <Link
            to="/products"
            className="btn fw-semibold px-4"
            style={{
              border: "1.5px solid rgba(255,255,255,0.4)",
              color: "#fff",
              background: "transparent",
            }}
            aria-label="Browse current deals and offers"
          >
            Browse Deals
          </Link>
        </div>
      </div>

      {/* Right — Phone mockup */}
      <div
        className="col-md-6 d-none d-md-flex align-items-center justify-content-center p-4 position-relative"
        style={{ background: "rgba(255, 255, 255, 0.61)" }}
        aria-hidden="true"
      >
        {/* Top float badge */}
        <div
          className="position-absolute d-flex align-items-center gap-2 bg-white rounded-3 px-3 py-2"
          style={{ top: "1.25rem", right: "1rem" }}
        >
          <i
            className="bi bi-check-circle-fill text-success"
            style={{ fontSize: "0.9rem" }}
            aria-hidden="true"
          ></i>
          <div>
            <p className="mb-0 fw-medium" style={{ fontSize: "0.65rem" }}>
              Order placed!
            </p>
            <p className="mb-0 text-muted" style={{ fontSize: "0.58rem" }}>
              Just now
            </p>
          </div>
        </div>

        {/* Phone frame */}
        <div
          className="bg-white rounded-4 p-2"
          style={{ width: "130px", position: "relative", zIndex: 2 }}
        >
          <div
            className="rounded-3 overflow-hidden"
            style={{ background: "#f0fdf4" }}
          >
            {/* Phone top bar */}
            <div className="bg-success p-2">
              <div
                className="rounded-pill mb-1"
                style={{ height: "5px", background: "rgba(255,255,255,0.3)" }}
              ></div>
              <div
                className="rounded-pill"
                style={{
                  height: "5px",
                  width: "60%",
                  background: "rgba(255,255,255,0.3)",
                }}
              ></div>
            </div>
            {/* Mini products */}
            <div className="p-2">
              {[
                { icon: "bi-phone", name: "Earbuds Pro", price: "₹1,299" },
                { icon: "bi-house", name: "LED Lamp", price: "₹799" },
                { icon: "bi-book", name: "React Book", price: "₹349" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2 p-1 d-flex align-items-center gap-2 mb-1"
                >
                  <div
                    className="rounded-2 d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                      width: "26px",
                      height: "26px",
                      background: "#dcfce7",
                    }}
                  >
                    <i
                      className={`bi ${item.icon} text-success`}
                      style={{ fontSize: "0.7rem" }}
                      aria-hidden="true"
                    ></i>
                  </div>
                  <div>
                    <p
                      className="mb-0 fw-medium"
                      style={{ fontSize: "0.58rem", lineHeight: 1.2 }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="mb-0 text-success fw-medium"
                      style={{ fontSize: "0.55rem" }}
                    >
                      {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom float badge */}
        <div
          className="position-absolute d-flex align-items-center gap-2 bg-white rounded-3 px-3 py-2"
          style={{ bottom: "1.25rem", left: "1rem" }}
        >
          <i
            className="bi bi-star-fill text-warning"
            style={{ fontSize: "0.85rem" }}
            aria-hidden="true"
          ></i>
          <div>
            <p className="mb-0 fw-medium" style={{ fontSize: "0.65rem" }}>
              4.8 rating
            </p>
            <p className="mb-0 text-muted" style={{ fontSize: "0.58rem" }}>
              12k+ reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
