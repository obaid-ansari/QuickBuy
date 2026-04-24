import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-success text-white pb-3">
      <div className="container">
        <div className="row">
          {/* Brand & About */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="mb-4 fs-4 fw-bold">QuickBuy</h5>
            <p className="small">
              Your one-stop destination for premium products across electronics,
              fashion, home essentials, sports, beauty, and more. Shop smart,
              shop fast with QuickBuy.
            </p>
          </div>

          {/* Shop / Categories */}
          <nav
            className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3"
            aria-label="Product categories"
          >
            <h6 className="text-uppercase mb-4 fw-bold">Shop</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link
                  to="/products"
                  className="text-white text-decoration-none small"
                  aria-label="Browse Electronics"
                >
                  Electronics
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products"
                  className="text-white text-decoration-none small"
                  aria-label="Browse Fashion"
                >
                  Fashion
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products"
                  className="text-white text-decoration-none small"
                  aria-label="Browse Home & Kitchen"
                >
                  Home & Kitchen
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products"
                  className="text-white text-decoration-none small"
                  aria-label="Browse Sports & Fitness"
                >
                  Sports & Fitness
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/products"
                  className="text-white text-decoration-none small"
                  aria-label="Browse Beauty & Personal Care"
                >
                  Beauty & Personal Care
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <address
            className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3"
            style={{ fontStyle: "normal" }}
          >
            <h6 className="text-uppercase mb-4 fw-bold">Contact</h6>
            <p className="small">
              <i className="bi bi-house-door-fill me-2" aria-hidden="true"></i>
              Mumbai, Maharashtra, India
            </p>
            <p className="small">
              <i className="bi bi-envelope-fill me-2" aria-hidden="true"></i>
              <a
                href="mailto:info@quickbuy.com"
                className="text-white text-decoration-none"
              >
                info@quickbuy.com
              </a>
            </p>
            <p className="small">
              <i className="bi bi-telephone-fill me-2" aria-hidden="true"></i>
              <a
                href="tel:+919876543210"
                className="text-white text-decoration-none"
              >
                +91 98765 43210
              </a>
            </p>
          </address>
        </div>

        <hr />

        {/* Bottom Footer */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="small text-center text-lg-start mb-3 mb-md-0">
              &copy; {new Date().getFullYear()} All Rights Reserved by:{" "}
              <Link
                to="/"
                className="text-white text-decoration-none fw-bold"
                aria-label="QuickBuy homepage"
              >
                QuickBuy
              </Link>
            </p>
          </div>

          <div className="col-md-5 col-lg-4">
            <div
              className="d-flex gap-3 justify-content-center justify-content-md-end"
              aria-label="Follow us on social media"
            >
              {/* <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook" aria-hidden="true"></i>
              </a> */}
              {/* <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5"
              >
                <i className="bi bi-instagram" aria-hidden="true"></i>
              </a> */}
              <a
                href="https://github.com/obaid-ansari"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5"
              >
                <i className="bi bi-github" aria-hidden="true"></i>
              </a>
              <a
                href="linkedin.com/in/obaid-ansari/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5"
              >
                <i className="bi bi-linkedin" aria-hidden="true"></i>
              </a>
              {/* <a
                href="https://github.com/obaid-ansari"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5"
                aria-label="YouTube"
              >
                <i className="bi bi-youtube" aria-hidden="true"></i>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
