import React, { useState, useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import ProductCard from "../components/ProductCard";
import ProductSection from "../components/ProductSection";

const categories = [
  { id: "all", label: "All" },
  { id: "Electronics", label: "Electronics" },
  { id: "Fashion", label: "Fashion" },
  { id: "Home & Kitchen", label: "Home & Kitchen" },
  { id: "Beauty & Personal Care", label: "Beauty & Personal Care" },
  { id: "Sports & Fitness", label: "Sports & Fitness" },
];

const Products = () => {
  const { products } = useProduct();
  const [activeCategory, setActiveCategory] = useState("all");

  // to filter products
  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const activeLabel =
    categories.find((c) => c.id === activeCategory)?.label || "All";

  return (
    <div className="container my-5" aria-label="Products page">
      {/* Page Header */}
      <div className="mb-4 text-center">
        <h1 className="fw-bold fs-3 mb-1">All Products</h1>
        <p className="text-muted small">
          {products.length} products across {categories.length - 1} categories
        </p>
      </div>

      {/* ── Category Filter Pills ── */}
      <section
        className="d-flex flex-wrap justify-content-center gap-2 mb-4"
        aria-label="Product categories"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`btn px-3 btn-sm rounded-pill fw-medium ${
              activeCategory === cat.id
                ? "btn-success"
                : "bg-white text-success btn-outline-success"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </section>

      {/* ── Specific Category View ── */}
      {activeCategory !== "all" && (
        <ProductSection title={activeLabel} items={filteredProducts} />
      )}

      {/* ── All Products */}
      {activeCategory === "all" &&
        categories.slice(1).map((cat, i) => {
          const items = products.filter((p) => p.category === cat.id);
          return (
            <ProductSection
              key={cat.id}
              title={cat.label}
              items={items}
              showDivider={i !== 0}
            />
          );
        })}
    </div>
  );
};

export default Products;
