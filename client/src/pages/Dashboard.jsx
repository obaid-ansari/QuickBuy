import React, { useState } from "react";
import AdminProducts from "../components/AdminProducts";
import AdminOrders from "../components/AdminOrders";
import Auth from "../components/Auth";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const tabs = ["Products", "Orders"];
  const [activeTab, setActiveTab] = useState("Products");

  if (!user) {
    return <Auth />;
  }

  if (user.role !== "admin") {
    return <Auth />;
  }

  return (
    <div className="container my-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h1 className="fw-bold fs-3 mb-1">Dashboard</h1>
          <p className="fw-light mb-0">Manage products and orders</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="d-flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`btn px-3 btn-sm rounded-pill fw-medium ${
              activeTab === tab
                ? "btn-success"
                : "bg-white text-success btn-outline-success"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Products" && <AdminProducts />}
      {activeTab === "Orders" && <AdminOrders />}
    </div>
  );
};

export default Dashboard;
