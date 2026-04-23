import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const { cartProducts } = useCart();

  const navbarRef = useRef(null);
  const collapseRef = useRef(null);

  const closeNavbar = () => {
    const collapseEl = collapseRef.current;
    if (collapseEl && collapseEl.classList.contains("show")) {
      if (window.bootstrap?.Collapse) {
        const bsCollapse = window.bootstrap.Collapse.getInstance(collapseEl);
        bsCollapse?.hide();
      } else {
        collapseEl.classList.remove("show");
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        closeNavbar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header>
        <nav
          className="navbar navbar-expand-lg bg-success bg-gradient"
          data-bs-theme="dark"
          ref={navbarRef}
          style={{ position: "fixed", width: "100%", zIndex: "1000" }}
          aria-label="Main navigation"
        >
          <div className="container">
            <NavLink
              className="navbar-brand fs-4 fw-bold"
              to="/"
              onClick={closeNavbar}
              aria-label="QuickBuy - Go to homepage"
            >
              QuickBuy
            </NavLink>
            {/* Mobile view */}
            {user && (
              <ul
                className="navbar-nav ms-auto d-flex gap-3 d-lg-none flex-row"
                aria-label="Quick actions"
              >
                <li className="nav-item position-relative me-2">
                  <NavLink
                    className="nav-link"
                    to="/cart"
                    onClick={closeNavbar}
                    aria-label={`Shopping cart with ${cartProducts.length || 0} items`}
                  >
                    <i className="fs-2 bi bi-cart" aria-hidden="true"></i>
                    <span className="badge rounded-5 position-absolute px-1 py-0 bg-light ms-1 text-success top-25">
                      {cartProducts.length || 0}
                    </span>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link fw-medium"
                    to="/profile"
                    onClick={closeNavbar}
                    aria-label="View your profile"
                  >
                    <i
                      className="fs-2 bi bi-person-circle"
                      aria-hidden="true"
                    ></i>
                  </NavLink>
                </li>
              </ul>
            )}
            <button
              className="navbar-toggler border border-0 text-success ms-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation menu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
              ref={collapseRef}
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3">
                <li className="nav-item">
                  <NavLink
                    className="nav-link fs-5 fw-medium"
                    to="/"
                    onClick={closeNavbar}
                  >
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link fs-5 fw-medium"
                    to="/products"
                    onClick={closeNavbar}
                  >
                    Shop
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link fs-5 fw-medium"
                    to="/about"
                    onClick={closeNavbar}
                  >
                    About
                  </NavLink>
                </li>

                {!user ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link fs-5 fw-medium"
                        to="/login"
                        onClick={closeNavbar}
                      >
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link fs-5 fw-medium"
                        to="/register"
                        onClick={closeNavbar}
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <ul
                    className="navbar-nav ms-auto d-none mb-2 mb-lg-0 gap-3 d-lg-flex"
                    aria-label="User actions"
                  >
                    <li className="nav-item position-relative me-2">
                      <NavLink
                        className="nav-link"
                        to="/cart"
                        onClick={closeNavbar}
                        aria-label={`Shopping cart with ${cartProducts.length || 0} items`}
                      >
                        <i className="fs-4 bi bi-cart" aria-hidden="true"></i>
                        <span className="badge rounded-5 position-absolute px-1 py-0 bg-light ms-1 text-success top-25">
                          {cartProducts.length || 0}
                        </span>
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        className="nav-link fs-5 fw-medium"
                        to="/profile"
                        onClick={closeNavbar}
                        aria-label="View your profile"
                      >
                        <i
                          className="fs-4 bi bi-person-circle"
                          aria-hidden="true"
                        ></i>
                      </NavLink>
                    </li>
                  </ul>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div style={{ height: "65px" }} aria-hidden="true"></div>
    </>
  );
};

export default Navbar;
