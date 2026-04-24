import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import Auth from "../components/Auth";
import EmptyState from "../components/EmptyState";

const ProfilePage = () => {
  // Static state for now - replace with your Auth Context or API data
  const {
    user,
    handleLogout,
    isEditing,
    handleUpdateProfile,
    updateUserChange,
    handleCencelEditing,
  } = useAuth();

  if (user === null) {
    return (
      <EmptyState
        icon="bi-person-x"
        title="Authentication Required"
        message="Please login or register to view your profile."
        buttonText="Login Now"
        buttonLink="/login"
      />
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card border-1 border-0 bg-success-subtle shadow-sm rounded-4 overflow-hidden">
            <div className="row g-0">
              {/* Left Sidebar: Profile Summary */}
              <div className="col-md-4 bg-success-subtle p-4 text-center">
                <div className="position-relative d-inline-block mb-2">
                  <div
                    className="rounded-circle bg-success bg-gradient d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{
                      width: "100px",
                      height: "100px",
                      fontSize: "2.5rem",
                    }}
                  >
                    {user.name.charAt(0)}
                  </div>
                </div>
                <h1 className="fw-bold mb-3 h4">{user.name}</h1>

                <section className="list-group list-group-flush rounded-3 text-start small bg-white">
                  <span className="list-group-item border-0 bg-transparent py-3 text-success fw-bold">
                    <i className="bi bi-person-circle me-2"></i> Personal Info
                  </span>
                  {user.role === "admin" && (
                    <Link
                      to="/admin-dashboard"
                      className="list-group-item list-group-item-action border-0 bg-transparent text-black py-3"
                    >
                      <i className="bi bi-bar-chart me-2"></i> Dashboard
                    </Link>
                  )}
                  <Link
                    to="/orders"
                    className="list-group-item list-group-item-action border-0 bg-transparent text-black py-3"
                  >
                    <i className="bi bi-box-seam me-2"></i> My Orders
                  </Link>
                  <Link
                    className="list-group-item list-group-item-action border-0 bg-transparent py-3 text-danger"
                    // to="/"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                  </Link>
                </section>
              </div>

              {/* Right Side: Form Details */}
              <section className="col-md-8 p-4 bg-white">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="fw-bold mb-0 h4">Profile Settings</h2>
                  <button
                    className={`btn btn-sm ${isEditing ? "btn-outline-danger" : "btn-outline-success"} px-3 rounded-pill`}
                    onClick={() => handleCencelEditing()}
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </button>
                </div>

                <form onSubmit={handleUpdateProfile}>
                  <div className="row g-4">
                    {/* Full Name */}
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-muted text-uppercase">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="form-control form-control-lg bg-light border-0 fs-6"
                        value={user.name}
                        disabled={!isEditing}
                        onChange={updateUserChange}
                      />
                    </div>

                    {/* Email Address */}
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-muted text-uppercase">
                        Email Address
                      </label>
                      <input
                        required
                        name="email"
                        type="email"
                        className="form-control form-control-lg bg-light border-0 fs-6"
                        value={user.email}
                        disabled={!isEditing}
                        onChange={updateUserChange}
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-muted text-uppercase">
                        Phone Number
                      </label>
                      <input
                        required
                        name="phone"
                        type="tel"
                        className="form-control form-control-lg bg-light border-0 fs-6"
                        value={user.phone}
                        disabled={!isEditing}
                        onChange={updateUserChange}
                      />
                    </div>

                    {/* Address */}
                    <div className="col-12">
                      <label className="form-label small fw-bold text-muted text-uppercase">
                        Shipping Address
                      </label>
                      <textarea
                        className="form-control form-control-lg bg-light border-0 fs-6"
                        rows="3"
                        name="address"
                        value={user.address}
                        disabled={!isEditing}
                        onChange={updateUserChange}
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    {isEditing && (
                      <footer className="col-12 mt-4 text-end">
                        <button
                          type="submit"
                          className="btn btn-success px-5 shadow-sm fw-bold rounded-3"
                        >
                          Save Changes
                        </button>
                      </footer>
                    )}
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
