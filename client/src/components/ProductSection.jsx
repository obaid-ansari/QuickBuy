import React from "react";
import ProductCard from "./ProductCard";

const ProductSection = ({ title, items, showDivider = false }) => {
  return (
    <>
      {showDivider && <hr className="my-4" />}
      <section className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h2
            id={`section-${title.replace(/\s+/g, "-").toLowerCase()}`}
            className="fw-bold mb-0 h5"
          >
            {title}
          </h2>
          <span className="text-muted small">{items.length} products</span>
        </div>
        {items.length > 0 ? (
          <ul className="row g-3 mt-1 list-unstyled">
            {items.map((product) => (
              <li className="col-12 col-md-6 col-lg-3" key={product._id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-5 text-muted border rounded-4">
            <i
              className="bi bi-box-seam fs-1 d-block mb-2 opacity-50"
              aria-hidden="true"
            ></i>
            <span className="small">No products in this category yet.</span>
          </p>
        )}
      </section>
    </>
  );
};

export default ProductSection;
