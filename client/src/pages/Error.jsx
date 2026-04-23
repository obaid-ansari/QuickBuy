import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <main
      className="container py-5 text-center d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <i
        className="bi bi-exclamation-triangle text-muted mb-3"
        style={{ fontSize: "5rem" }}
      ></i>

      <h2 className="fw-bold mb-2 h3">Page Not Found</h2>

      <p className="text-muted mb-4">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="d-flex gap-2">
        <Link to="/" className="btn btn-success px-4 py-2 fw-bold rounded-3">
          Go Home
        </Link>
        <Link
          className="btn btn-outline-dark px-4 py-2 fw-bold rounded-3"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Link>
      </div>
    </main>
  );
};

export default Error;
