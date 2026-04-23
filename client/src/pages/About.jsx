import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  const sections = [
    {
      title: "About QuickBuy",
      content:
        "Your one-stop destination for premium products delivered fast. We bring the best of electronics, fashion, home essentials, and more right to your doorstep.",
    },
    {
      title: "Our Story",
      content:
        "QuickBuy was founded in 2026 in Mumbai with one simple idea make online shopping faster, more affordable, and genuinely enjoyable. What started as a small team of 4 passionate builders has grown into a platform trusted by thousands of customers across India. We believe great products should be accessible to everyone, delivered quickly, and backed by honest customer support.",
    },
    {
      title: "Our Mission",
      content:
        "To make quality products accessible to every household in India delivered fast, priced fairly, and backed by a support team that genuinely cares. We are building the future of Indian e-commerce, one order at a time.",
    },
  ];

  const values = [
    {
      icon: "bi-shield-check",
      title: "Trusted Quality",
      desc: "Every product is verified and reviewed before it reaches you.",
    },
    {
      icon: "bi-lightning-charge",
      title: "Fast Delivery",
      desc: "Same-day and next-day delivery across major cities in India.",
    },
    {
      icon: "bi-tag",
      title: "Best Prices",
      desc: "Competitive pricing with regular deals, discounts and offers.",
    },
    {
      icon: "bi-headset",
      title: "24/7 Support",
      desc: "Our team is always here to help with any question or issue.",
    },
  ];

  return (
    <div className="container my-4">
      {/* About sections */}
      {sections.map((section, i) => (
        <section
          className="mb-5"
          key={i}
          aria-labelledby={`section-title-${i}`}
        >
          <h2 id={`section-title-${i}`} className="fw-semibold fs-3 mb-3">
            {section.title}
          </h2>
          <div className="border-start border-success border-4 ps-4 py-1">
            <p className="fs-5 mb-0">{section.content}</p>
          </div>
        </section>
      ))}

      {/* What We Stand For */}
      <section className="mb-5" aria-labelledby="values-title">
        <h2 id="values-title" className="fw-semibold fs-3 mb-1">
          What We Stand For
        </h2>
        <p className="text-muted mb-4">
          The values that guide everything we build and every decision we make.
        </p>
        <div className="row g-3">
          {values.map((val, i) => (
            <div className="col-sm-6 col-lg-3" key={i}>
              <div className="border rounded-4 p-4 h-100 bg-white">
                <div
                  className="rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "#dcfce7",
                  }}
                >
                  <i
                    className={`bi ${val.icon} fs-5 text-success`}
                    aria-hidden="true"
                  ></i>
                </div>
                <h6 className="fw-semibold mb-2">{val.title}</h6>
                <p className="text-muted small mb-0">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="bg-success bg-gradient text-white rounded-4 text-center py-5 px-4"
        aria-label="Call to action"
      >
        <h2 className="fw-semibold fs-3 mb-2">Ready to Start Shopping?</h2>
        <p className="mb-4 lead">
          Explore thousands of products across all categories with fast delivery
          and easy returns.
        </p>
        <Link
          to="/products"
          className="btn btn-light text-success fw-semibold px-4 py-2"
          aria-label="Start shopping - browse all products"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
};

export default About;
