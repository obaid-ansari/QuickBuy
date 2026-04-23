import React, { useState } from "react";
import { useOrder } from "../hooks/useOrder";

const statusConfig = {
  Processing: {
    label: "Processing",
    bg: "bg-warning-subtle",
    color: "text-warning",
  },
  Shipped: {
    label: "Shipped",
    bg: "bg-primary-subtle",
    color: "text-primary",
  },
  Delivered: {
    label: "Delivered",
    bg: "bg-success-subtle",
    color: "text-success",
  },
  Cancelled: {
    label: "Cancelled",
    bg: "bg-danger-subtle",
    color: "text-danger",
  },
};

const AdminOrders = () => {
  const { allOrders, handleStatusChange } = useOrder();

  const [search, setSearch] = useState("");

  // ── Filter orders ──
  const filtered = allOrders.filter(
    (o) =>
      o._id.toLowerCase().includes(search.toLowerCase()) ||
      o.userId.name.toLowerCase().includes(search.toLowerCase()) ||
      o.userId.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section>
      {/* ── Stats ── */}
      <div className="row justify-content-center mb-4">
        {[
          {
            label: "Processing",
            value: allOrders.filter((o) => o.orderStatus === "Processing")
              .length,
          },
          {
            label: "Shipped",
            value: allOrders.filter((o) => o.orderStatus === "Shipped").length,
          },
          {
            label: "Delivered",
            value: allOrders.filter((o) => o.orderStatus === "Delivered")
              .length,
          },
          {
            label: "Cancelled",
            value: allOrders.filter((o) => o.orderStatus === "Cancelled")
              .length,
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

      {/* ── Search ── */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="m-0">Total Orders: {allOrders.length}</p>
        <input
          type="text"
          className="form-control form-control-sm rounded-3"
          placeholder="Search order..."
          style={{ width: "220px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ── Orders Table ── */}
      <div className="table-responsive">
        <table className="table border border-success-subtle align-middle my-2">
          <thead>
            <tr>
              <th className="ps-3 py-3">Order Info</th>
              <th className="py-3">Customer</th>
              <th className="py-3">Amount</th>
              <th className="py-3">Payment</th>
              <th className="py-3">Status</th>
              <th className="py-3">Update Status</th>
              <th className="pe-3 py-3 text-end">Date</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-muted py-4">
                  No orders found
                </td>
              </tr>
            ) : (
              filtered.map((order) => {
                const sc = statusConfig[order.orderStatus];

                return (
                  <tr key={order._id}>
                    <td className="ps-3 fw-medium">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>

                    <td>
                      <p className="mb-0 fw-medium">{order.userId.name}</p>
                      <small className="text-muted">{order.userId.email}</small>
                    </td>

                    <td className="fw-bold text-success">
                      ₹{order.totalPrice.toLocaleString("en-IN")}
                    </td>

                    <td>
                      <span className="badge bg-dark-subtle text-dark">
                        {order.paymentMethod}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge rounded-pill ${sc.bg} ${sc.color}`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

                    <td>
                      <select
                        className="form-select form-select-sm rounded-3"
                        style={{
                          width: "130px",
                        }}
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>

                    <td className="text-end text-muted">
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminOrders;
