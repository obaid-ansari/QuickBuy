import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Register = () => {
  const { registerData, registerHandler, registerHandleSubmit } = useAuth();

  return (
    <div className="container py-4 d-flex align-items-center justify-content-center">
      <div
        className="card border-0 shadow rounded-4 overflow-hidden"
        style={{ width: "100%", maxWidth: "500px" }}
      >
        {/* Header */}
        <div className="bg-success text-white text-center py-4">
          {/* h1 for SEO, h3 class keeps visual size identical */}
          <h1 className="fw-bold mb-1 h3">Join QuickBuy</h1>
          <p className="small mb-0 opacity-75">
            Create your account to start shopping
          </p>
        </div>

        {/* Form Body */}
        <section className="card-body p-3 p-md-4">
          <form onSubmit={registerHandleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold small">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control form-control-lg fs-6 rounded-3"
                placeholder="Your Name"
                value={registerData.name}
                onChange={registerHandler}
                required
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-7">
                <label className="form-label fw-semibold small">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-lg fs-6 rounded-3"
                  placeholder="name@example.com"
                  value={registerData.email}
                  onChange={registerHandler}
                  required
                />
              </div>
              <div className="col-md-5">
                <label className="form-label fw-semibold small">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control form-control-lg fs-6 rounded-3"
                  placeholder="Phone number"
                  value={registerData.phone}
                  onChange={registerHandler}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold small">Password</label>
              <input
                type="password"
                name="password"
                className="form-control form-control-lg fs-6 rounded-3"
                placeholder="Password"
                value={registerData.password}
                onChange={registerHandler}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold small">Address</label>
              <input
                type="text"
                name="address"
                className="form-control form-control-lg fs-6 rounded-3"
                placeholder="City, State, Country"
                value={registerData.address}
                onChange={registerHandler}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success btn-lg w-100 rounded-3 fw-bold py-2"
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-4">
            <span className="text-muted small">Already have an account? </span>
            <Link
              to="/login"
              className="text-success fw-bold text-decoration-none small"
            >
              Sign In
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
