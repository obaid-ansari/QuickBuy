import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useProduct } from "../hooks/useProduct";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { handlerGetProductsById } = useProduct();

  return (
    <article className="bg-white border shadow-sm rounded-4 overflow-hidden h-100">
      <div className="p-3 d-flex align-items-center justify-content-center overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ height: "150px", objectFit: "cover" }}
          loading="lazy"
        />
      </div>

      <div className="p-3">
        {/* Category Badge */}
        <span className="badge fw-light bg-white text-success border border-success text-success small mb-2 d-inline-block">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="fw-semibold mb-1" style={{ fontSize: "1rem" }}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="d-flex align-items-center gap-1 mb-2">
          <i
            className="bi bi-star-fill text-warning"
            style={{ fontSize: "0.7rem" }}
          ></i>
          <span className="text-muted" style={{ fontSize: "0.75rem" }}>
            {product.rating}
          </span>
        </div>

        {/* Price + Stock */}
        <div className="d-flex align-items-center justify-content-between">
          <span className="fw-bold text-success">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.stock === 0 ? (
            <span className="text-danger" style={{ fontSize: "0.7rem" }}>
              Out of stock
            </span>
          ) : product.stock <= 5 ? (
            <span className="text-warning" style={{ fontSize: "0.7rem" }}>
              Only {product.stock} left
            </span>
          ) : (
            <span className="text-success" style={{ fontSize: "0.7rem" }}>
              In stock
            </span>
          )}
        </div>
        <Link
          onClick={() => handlerGetProductsById(product._id)}
          to={`${product._id}`}
          className="rounded-pill w-100 mt-3 btn btn-dark ps-3"
        >
          Buy
          <i className="ms-1 bi bi-chevron-right"></i>
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
