import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

// ── Star Rating Component ──────────────────────────────────────
const StarRating = ({ rating }) => (
  <div className="d-flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <i
        key={star}
        className={`bi ${star <= Math.round(rating) ? "bi-star-fill" : "bi-star"} text-warning`}
        style={{ fontSize: "0.9rem" }}
      />
    ))}
  </div>
);

const DetailedProduct = () => {
  const { id } = useParams();
  const { addToCartProducts } = useCart();
  const { detailedProduct, handlerGetProductsById } = useProduct();
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      handlerGetProductsById(id); // Ab refresh par bhi URL se ID mil jayegi
    }
  }, [id]);

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <nav className="mb-4 small">
        <ol className="list-unstyled d-flex mb-0">
          <li className="d-flex align-items-center">
            <Link to="/" className="text-muted text-decoration-none">
              Home
            </Link>
          </li>
          <li className="d-flex align-items-center">
            <span className="mx-2 text-muted">/</span>
            <Link to="/products" className="text-muted text-decoration-none">
              Products
            </Link>
          </li>
          <li className="d-flex align-items-center">
            <span className="mx-2 text-muted">/</span>
            <span className="text-success fw-bold">{detailedProduct.name}</span>
          </li>
        </ol>
      </nav>

      <div className="row g-4">
        {/* Left: Product Image */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center mb-0">
          <div className="card border-0 rounded-4 overflow-hidden p-3 bg-white shadow-sm">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "250px" }}
            >
              <img
                src={detailedProduct.images}
                alt={detailedProduct.name}
                className="img-fluid rounded-3"
                style={{ objectFit: "contain", maxHeight: "400px" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <section className="col-lg-6 d-flex justify-content-center align-items-center">
          <div className="ps-lg-4">
            <h1 className="fw-bold mb-2 display-6">{detailedProduct.name}</h1>

            <div className="d-flex align-items-center gap-2 mb-4">
              <StarRating rating={detailedProduct.rating} />
              <span className="fw-bold text-dark">
                {detailedProduct.rating}
              </span>
              <span className="text-muted small">| 1.2k+ Global Ratings</span>
            </div>

            <div className="mb-4">
              <p className="text-success fw-bold mb-1 h2">
                ₹{(detailedProduct.price || 0).toLocaleString("en-IN")}
              </p>
              <p className="text-muted small">M.R.P. Inclusive of all taxes</p>
            </div>

            <section className="mb-4">
              <h2 className="fw-bold small text-uppercase text-muted mb-2 h6">
                Description
              </h2>
              <p className="text-secondary lh-lg">
                {detailedProduct.description}
              </p>
            </section>

            {/* Inventory Status */}
            <div className="mb-4">
              <p
                className={`d-flex align-items-center gap-2 mb-0 ${detailedProduct.stock > 0 ? "text-success" : "text-danger"}`}
              >
                <i
                  className={`bi ${detailedProduct.stock > 0 ? "bi-check-circle-fill" : "bi-x-circle-fill"}`}
                ></i>
                <span className="fw-bold">
                  {detailedProduct.stock > 0 ? `In Stock` : "Out of Stock"}
                </span>
              </p>
            </div>

            <hr className="my-4" />

            {/* Quantity & Add to Cart */}
            {user ? (
              <section className="row g-3 align-items-center mb-4">
                <div className="col-auto">
                  <div
                    className="input-group border rounded-3 overflow-hidden"
                    style={{ width: "130px" }}
                  >
                    <button
                      className="btn btn-light border-0"
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <span className="input-group-text bg-white border-0 fw-bold flex-grow-1 justify-content-center">
                      {quantity}
                    </span>
                    <button
                      className="btn btn-light border-0"
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.min(detailedProduct.stock, prev + 1),
                        )
                      }
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
                <div className="col">
                  <button
                    className="btn btn-success fs-5 w-100 fw-bold rounded-3 shadow-sm py-2"
                    disabled={detailedProduct.stock === 0}
                    onClick={() =>
                      addToCartProducts(detailedProduct._id, quantity)
                    }
                  >
                    <i className="bi bi-cart me-2"></i>Add to Cart
                  </button>
                </div>
              </section>
            ) : (
              <p className="text-danger">
                If you have to buy any product please login/register first.
              </p>
            )}

            <section className="mt-4">
              <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-patch-check-fill text-success"></i>
                  <span className="text-muted small">
                    <strong>Free Delivery:</strong> On all orders above ₹499
                  </span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-patch-check-fill text-success"></i>
                  <span className="text-muted small">
                    <strong>1 Year Warranty:</strong> Authentic brand warranty
                  </span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-patch-check-fill text-success"></i>
                  <span className="text-muted small">
                    <strong>7 Days Return:</strong> Easy replacement policy
                  </span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-patch-check-fill text-success"></i>
                  <span className="text-muted small">
                    <strong>Secure Payment:</strong> 100% safe checkout
                  </span>
                </li>
              </ul>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailedProduct;
