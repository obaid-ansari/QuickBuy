import React, { useState } from "react";
import { useProduct } from "../hooks/useProduct";

const stockBadge = (stock) => {
  if (stock === 0)
    return {
      label: "Out of stock",
      bg: "bg-danger-subtle",
      color: "text-danger",
    };
  if (stock <= 5)
    return {
      label: `${stock} low`,
      bg: "bg-warning-subtle",
      color: "text-warning",
    };
  return {
    label: `In Stock ${stock}`,
    bg: "bg-success-subtle",
    color: "text-success",
  };
};

const AdminProducts = () => {
  const {
    products,
    form,
    handleChange,
    handleImageChange,
    preview,
    handleSubmit,
    isFromActive,
    setIsFromActive,
    handleDeleteProduct,
    loading,
    handleUpdate,
    isEdit,
    cencelEdit,
  } = useProduct();

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Sports",
    "Beauty",
    "Books",
  ];

  return (
    <section>
      {/* ── Stats ── */}
      <div className="row justify-content-center mb-4">
        {[
          { label: "Total products", value: products.length },
          {
            label: "Out of stock",
            value: products.filter((p) => p.stock === 0).length,
          },
          {
            label: "Low stock",
            value: products.filter((p) => p.stock > 0 && p.stock <= 5).length,
          },
          {
            label: "Categories",
            value: [...new Set(products.map((p) => p.category))].length,
          },
        ].map((s, i) => (
          <div className="col-6 p-2 col-md-3" key={i}>
            <div className="rounded-3 h-100 p-3 d-flex flex-column justify-content-center align-items-center bg-success-subtle">
              <p className="fw-bold fs-3 mb-0">{s.value}</p>

              <p className="text-muted mb-0">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-end mb-4">
        <button
          className="btn btn-success d-flex align-items-center px-3 fw-bold"
          onClick={() => setIsFromActive(!isFromActive)}
        >
          <i className="bi bi-plus-lg me-2"></i> Add New
        </button>
      </div>

      {isFromActive && (
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Image Upload */}
            <div className="col-12 col-md-4">
              <label className="form-label fw-medium">Product Image</label>

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />

              {/* Preview */}
              {preview && (
                <div className="mt-3 text-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="img-fluid rounded-3 border"
                    style={{
                      maxHeight: "180px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="col-12 col-md-8">
              <div className="row g-3">
                {/* Name */}
                <div className="col-12">
                  <label className="form-label fw-medium">Product Name</label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter product name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}
                <div className="col-12">
                  <label className="form-label fw-medium">Description</label>

                  <textarea
                    name="description"
                    className="form-control"
                    required
                    rows="3"
                    placeholder="Enter description"
                    value={form.description}
                    onChange={handleChange}
                  />
                </div>

                {/* Price */}
                <div className="col-6">
                  <label className="form-label fw-medium">Price (₹)</label>

                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="0"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Category */}
                <div className="col-6">
                  <label className="form-label fw-medium">Category</label>

                  <select
                    name="category"
                    required
                    className="form-select"
                    value={form.category}
                    onChange={handleChange}
                  >
                    {categories.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Stock */}
                <div className="col-6">
                  <label className="form-label fw-medium">Stock</label>

                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    placeholder="0"
                    value={form.stock}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Rating */}
                <div className="col-6">
                  <label className="form-label fw-medium">Rating</label>

                  <input
                    type="number"
                    step="0.1"
                    max="5"
                    min="0"
                    required
                    name="rating"
                    className="form-control"
                    placeholder="0 - 5"
                    value={form.rating}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-end mt-4">
            {isEdit && (
              <>
                <button
                  className="btn btn-outline-danger me-2 px-4 rounded-3"
                  onClick={() => cencelEdit()}
                  type="button"
                >
                  Cencel
                </button>
              </>
            )}
            <button
              type="submit"
              className="btn btn-success px-4 rounded-3"
              disabled={loading}
              value={isEdit ? "Edit" : "Add new"}
            >
              {isEdit ? "Edit" : "Add New"}
            </button>
          </div>
        </form>
      )}

      {/* ── Table Container ── */}
      <div className="table-responsive">
        <table className="table border border-success-subtle align-middle my-2">
          <thead>
            <tr>
              <th className="ps-3 py-3">Product Info</th>
              <th className="py-3 d-none d-lg-table-cell">Category</th>
              <th className="py-3">Price</th>
              <th className="py-3">Availability</th>
              <th className="pe-3 py-3 text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const sb = stockBadge(product.stock);
              return (
                <tr key={product._id}>
                  <td className="py-3">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: "50px", height: "50px" }}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="img-fluid"
                          style={{ maxHeight: "100%", objectFit: "contain" }}
                        />
                      </div>
                      <div style={{ maxWidth: "200px" }}>
                        <p
                          className="fw-bold mb-0 text-truncate"
                          style={{ fontSize: "0.85rem" }}
                        >
                          {product.name}
                        </p>
                        <small className="text-muted d-lg-none">
                          {product.category}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td className="d-none d-lg-table-cell">
                    <span className="badge bg-success-subtle text-success fw-medium px-2 py-1">
                      {product.category}
                    </span>
                  </td>
                  <td className="fw-bold" style={{ fontSize: "0.85rem" }}>
                    ₹{product.price.toLocaleString("en-IN")}
                  </td>
                  <td>
                    <span
                      className={`badge rounded-pill px-2 py-1 fw-bold ${sb.bg} ${sb.color}`}
                      style={{ fontSize: "0.65rem" }}
                    >
                      {sb.label}
                    </span>
                  </td>

                  <td className="text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        className="btn btn-sm rounded-3 text-warning"
                        title="Edit"
                        onClick={() => handleUpdate(product)}
                      >
                        <i className="bi bi-pencil-square fs-4"></i>
                      </button>
                      <button
                        className="btn btn-sm rounded-3 text-danger"
                        title="Delete"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <i className="bi bi-trash3 fs-4"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminProducts;
