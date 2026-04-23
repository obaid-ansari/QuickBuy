import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Hero from "../components/Hero";

const categories = [
  { icon: "bi-phone", name: "Electronics", color: "text-dark" },
  { icon: "bi-bag", name: "Fashion", color: "text-info" },
  { icon: "bi-house", name: "Home & Kitchen", color: "text-danger" },
  { icon: "bi-trophy", name: "Sports", color: "text-primary" },
  { icon: "bi-stars", name: "Beauty", color: "text-warning" },
  { icon: "bi-book", name: "Books", color: "text-success" },
];

const values = [
  {
    icon: "bi-truck",
    title: "Fast Delivery",
    desc: "Same-day delivery across major cities in India.",
  },
  {
    icon: "bi-shield-check",
    title: "Secure Payments",
    desc: "100% safe and encrypted checkout process.",
  },
  {
    icon: "bi-arrow-counterclockwise",
    title: "Easy Returns",
    desc: "7-day hassle-free return policy on all orders.",
  },
  {
    icon: "bi-headset",
    title: "24/7 Support",
    desc: "Always here to help whenever you need us.",
  },
];

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="container my-4">
      {/* ── Hero — Split Layout ── */}
      <Hero />

      {/* ── Categories ── */}
      <section className="my-5" aria-label="Shop by category">
        <div className="d-flex justify-content-between align-items-baseline mb-1">
          <h2 className="fw-semibold fs-4 mb-0">Shop by category</h2>
          <Link
            to="/products"
            className="text-success text-decoration-none"
            style={{ fontSize: "0.75rem" }}
            aria-label="View all categories"
          >
            View all →
          </Link>
        </div>
        <p className="text-muted mb-3">Find exactly what you're looking for</p>
        <div className="row g-2">
          {categories.map((cat, i) => (
            <div className="col-4 col-md-2" key={i}>
              <Link
                to="/products"
                className="text-decoration-none d-block"
                aria-label={`Shop ${cat.name}`}
              >
                <div className="shadow-sm rounded-3 p-3 text-center bg-white h-100">
                  <div
                    className="rounded-3 d-inline-flex align-items-center justify-content-center mb-2"
                    style={{
                      width: "36px",
                      height: "36px",
                    }}
                  >
                    <i
                      className={`fs-4 bi ${cat.icon} ${cat.color}`}
                      aria-hidden="true"
                    ></i>
                  </div>
                  <p className="mb-0 fw-medium text-dark">{cat.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="rounded-4 d-flex align-items-center justify-content-center justify-content-lg-between gap-3 flex-wrap p-4 my-5 bg-success bg-gradient"
        aria-label="Call to action"
      >
        <div className="d-flex flex-column align-items-lg-start align-items-center">
          <h3 className="fw-semibold mt-3 text-light">
            Ready to start shopping?
          </h3>
          <p className="mb-3 text-light text-lg-start text-center">
            Join 50,000+ customers. New deals added every day.
          </p>
        </div>
        <Link
          to="/products"
          className="btn btn-light text-dark fw-semibold px-4"
          aria-label="Explore all products and deals"
        >
          Explore All Products
        </Link>
      </section>

      {/* ── Why QuickBuy ── */}
      <section className="my-5 px-1" aria-label="Why choose QuickBuy">
        <h4 className="fw-semibold mb-1">Why QuickBuy</h4>
        <p className="text-muted mb-4">The smartest way to shop in India</p>
        <div className="row g-3">
          {values.map((val, i) => (
            <article className="col-sm-6 col-lg-3" key={i}>
              <div className="border rounded-4 p-4 h-100 bg-white">
                <div
                  className="rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "#dcfce7",
                  }}
                >
                  <i
                    className={`bi ${val.icon} fs-5 text-success`}
                    aria-hidden="true"
                  ></i>
                </div>
                <h6 className="fw-semibold mb-2">{val.title}</h6>
                <p className="text-muted small mb-0">{val.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
