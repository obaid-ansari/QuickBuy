import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Login = () => {
  const { loginData, loginHandler, loginHandleSubmit } = useAuth();

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center">
      <div
        className="card border-0 shadow rounded-4 overflow-hidden"
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <div className="bg-success text-white text-center py-4">
          {/* h1 for SEO, class h2 keeps visual size identical */}
          <h1 className="fw-bold mb-1 h2">Welcome Back</h1>
          <p className="small mb-0 opacity-75">Sign in to continue shopping</p>
        </div>

        {/* Form Body */}
        <section className="card-body p-4 p-md-5">
          <form onSubmit={loginHandleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold small">
                Email or Phone
              </label>
              <input
                type="text"
                name="identifier"
                className="form-control form-control-lg fs-6 rounded-3"
                placeholder="Enter your email or Phone"
                value={loginData.identifier}
                onChange={loginHandler}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold small">Password</label>
              <input
                type="password"
                name="password"
                className="form-control form-control-lg fs-6 rounded-3"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={loginHandler}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success btn-lg w-100 rounded-3 fw-bold shadow-sm py-2"
            >
              Login In
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-muted small">New to QuickBuy? </span>
            <Link
              to="/register"
              className="text-success fw-bold text-decoration-none small"
            >
              Create Account
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
