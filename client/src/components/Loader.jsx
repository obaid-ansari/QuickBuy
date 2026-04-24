import React from "react";

const Loader = () => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center bg-white"
      style={{ zIndex: 1050 }}
    >
      <div
        className="spinner-border text-success"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
