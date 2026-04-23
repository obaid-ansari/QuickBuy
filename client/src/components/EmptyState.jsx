import React from "react";
import { Link } from "react-router-dom";

const EmptyState = ({
  icon = "bi-cart-x",
  title = "Nothing here yet",
  message = "Looks like there's nothing to show right now.",
  buttonText = "Start Shopping",
  buttonLink = "/products",
  iconSize = "5rem",
}) => {
  return (
    <main className="container py-5 text-center">
      <i className={`bi ${icon} text-muted`} style={{ fontSize: iconSize }}></i>
      <h1 className="mt-4 fw-bold h2">{title}</h1>
      <p className="text-muted">{message}</p>
      <Link
        to={buttonLink}
        className="btn btn-success px-4 py-2 mt-3 fw-bold rounded-3"
      >
        {buttonText}
      </Link>
    </main>
  );
};

export default EmptyState;
