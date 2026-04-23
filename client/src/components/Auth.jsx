import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ height: "80vh" }}
    >
      <h1 className="fw-bold h4">Authentication Required</h1>

      <p className="text-muted mb-4">
        Please login or register to access this page.
      </p>

      <nav className="d-flex gap-2">
        <Link to="/login" className="btn btn-success px-4 rounded-pill fw-bold">
          Login Now
        </Link>

        <Link to="/register" className="btn btn-outline-dark px-4 rounded-pill">
          Register
        </Link>
      </nav>
    </div>
  );
};

export default Auth;
