import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BookAppointmentModal from "../components/BookAppointmentModal";
import "./Appointments.css";




const Appointments = () => {
  const [showBookModal, setShowBookModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const userRole = "donor";



  return (
    <div
      className="container-fluid p-4"
      style={{ background: "#ffffff", minHeight: "100vh" }}
    >
      {/* HEADER */}
      <div
        className="p-4 rounded mb-4"
        style={{
          background: "#ef1616",
          border: "1px solid #e5e7eb",
        }}
      >
        <h4 style={{ color: "#111827" }}>📅 Appointment Management</h4>
        <p className="text-muted mb-3">
          Schedule, manage & track donor appointments
        </p>

        <button
          className="btn btn-sm me-2"
          style={{
            background: "#f9f9f9",
            color: "#f81818",
            border: "none",
          }}
          onClick={() => setShowBookModal(true)}
        >
          + Book New Appointment
        </button>

        <button
          className="btn btn-sm"
          style={{
            border: "1px solid #ef4444",
            color: "#ef4444",
            background: "#fff",
          }}
          onClick={() => setShowHistory(true)}
        >
          View History
        </button>
      </div>

     {/* STATS CARDS */}
<div className="row mb-4">

  {/* Today's Appointments */}
  <div className="col-md-3 col-sm-6 mb-3">
    <div
  className="card shadow-sm rounded-4 p-4 h-100"
  style={{ border: "1px solid #bfdbfe" }}
>

      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h3 className="fw-bold mb-0">0</h3>
          <small className="text-muted">Today's Appointments</small>
        </div>
        <div style={{
          width: 45,
          height: 45,
          borderRadius: "50%",
          background: "#dbeafe",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20
        }}>
          📅
        </div>
      </div>
    </div>
  </div>

  {/* Pending */}
  <div className="col-md-3 col-sm-6 mb-3">
    <div className="card shadow-sm rounded-4 p-4 h-100"
      style={{ border: "1px solid #fde68a" }}>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h3 className="fw-bold mb-0">4</h3>
          <small className="text-muted">Pending Approval</small>
        </div>
        <div style={{
          width: 45,
          height: 45,
          borderRadius: "50%",
          background: "#fef3c7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20
        }}>
          ⏳
        </div>
      </div>
    </div>
  </div>

  {/* Approved */}
  <div className="col-md-3 col-sm-6 mb-3">
    <div className="card shadow-sm rounded-4 p-4 h-100"
      style={{ border: "1px solid #86efac" }}>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h3 className="fw-bold mb-0">2</h3>
          <small className="text-muted">Approved</small>
        </div>
        <div style={{
          width: 45,
          height: 45,
          borderRadius: "50%",
          background: "#dcfce7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20
        }}>
          ✅
        </div>
      </div>
    </div>
  </div>

  {/* Emergency */}
  <div className="col-md-3 col-sm-6 mb-3">
    <div className="card shadow-sm rounded-4 p-4 h-100"
      style={{ border: "1px solid #fecaca" }}>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h3 className="fw-bold mb-0">1</h3>
          <small className="text-muted">Emergency</small>
        </div>
        <div style={{
          width: 45,
          height: 45,
          borderRadius: "50%",
          background: "#fee2e2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20
        }}>
          🚨
        </div>
      </div>
    </div>
  </div>

</div>


      {/* FILTERS */}
      <div className="card p-3 mb-4" style={{ border: "1px solid #e5e7eb" }}>
        <h6 className="mb-3">🔍 Filters</h6>
        <div className="row g-2">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Search by name or phone..."
            />
          </div>
          <div className="col-md-4">
            <select className="form-select">
              <option>All Status</option>
              <option>Requested</option>
              <option>Approved</option>
              <option>Confirmed</option>
              <option>Completed</option>
              <option>No-Show</option>
              <option>Cancelled</option>
            </select>
          </div>
          <div className="col-md-4">
            <select className="form-select">
              <option>All Dates</option>
              <option>Today</option>
              <option>Tomorrow</option>
              <option>Upcoming</option>
              <option>Past</option>
            </select>
          </div>
        </div>
      </div>

      {/* APPOINTMENT CARD */}
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm" style={{ border: "1px solid #e5e7eb", borderRadius: 12 }}>
            <div className="card-body">

              {/* TOP ROW WITH RED AVATAR */}
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex gap-3 align-items-center">
                  {/* 🔴 RED USER ICON */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "#ef4444",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="white"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                    </svg>
                  </div>

                  <div>
                    <h6 className="mb-0">Amit Kumar</h6>
                    <small className="text-muted">
                      +91 9876543212
                    </small>
                  </div>
                </div>

                {/* COMPLETED BADGE */}
                <span
                  style={{
                    background: "#ecfdf5",
                    color: "#16a34a",
                    border: "1px solid #86efac",
                    padding: "4px 10px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  Completed
                </span>
              </div>

              <hr />

              <p className="mb-1">🩸 <strong>B+</strong></p>
              <p className="mb-1">📅 Wednesday, Jan 15, 2025</p>
              <p className="mb-1">⏰ 09:00 – 09:30</p>
              <p className="mb-2">📍 Corporate Donation Camp</p>

              <span
                style={{
                  border: "1px solid #d1d5db",
                  padding: "4px 12px",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              >
                Camp Donation
              </span>

              <button
                className="btn w-100 mt-3"
                style={{
                  border: "1px solid #e5e7eb",
                  background: "#fff",
                }}
                onClick={() => setShowDetails(true)}
              >
                View Details →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILS MODAL */}
      {showDetails && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content p-4">

              {/* HEADER */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "#ef4444",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                    }}
                  >
                    📅
                  </div>
                  <h5 className="mb-0">Appointment Details</h5>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <span
                    style={{
                      background: "#fef3c7",
                      color: "#92400e",
                      border: "1px solid #facc15",
                      padding: "4px 12px",
                      borderRadius: 999,
                      fontSize: 12,
                    }}
                  >
                    Requested
                  </span>

                  <button className="btn-close" onClick={() => setShowDetails(false)} />
                </div>
              </div>

              {/* DONOR INFO */}
              <div
                className="p-3 mb-3"
                style={{
                  background: "#f9fafb",
                  borderRadius: 10,
                  border: "1px solid #e5e7eb",
                }}
              >
                <h6 className="mb-3">Donor Information</h6>

                <div className="row">
                  <div className="col-md-6 mb-2">
                    <small className="text-muted">Name</small>
                    <div>Amit Kumar</div>
                  </div>

                  <div className="col-md-6 mb-2">
                    <small className="text-muted">Blood Group</small>
                    <div style={{ color: "#ef4444", fontWeight: 600 }}>B+</div>
                  </div>

                  <div className="col-md-6">
                    <small className="text-muted">Phone</small>
                    <div>+91 9876543212</div>
                  </div>

                  <div className="col-md-6">
                    <small className="text-muted">Type</small>
                    <div>Donation</div>
                  </div>
                </div>
              </div>

              {/* APPOINTMENT DETAILS */}
              <div
                className="p-3 mb-4"
                style={{
                  background: "#ffffff",
                  borderRadius: 10,
                  border: "1px solid #e5e7eb",
                }}
              >
                <h6 className="mb-3">Appointment Details</h6>

                <div className="row">
                  <div className="col-md-6 mb-2">
                    <small className="text-muted">Date</small>
                    <div>Sunday, January 18, 2026</div>
                  </div>

                  <div className="col-md-6 mb-2">
                    <small className="text-muted">Time Slot</small>
                    <div>09:00 – 09:30</div>
                  </div>

                  <div className="col-md-12">
                    <small className="text-muted">Location</small>
                    <div>Blood Bank</div>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="row g-2 mb-3">
                <div className="col-md-6">
                  <button
                    className="btn w-100"
                    style={{ background: "#16a34a", color: "#fff" }}
                  >
                    ✔ Approve Appointment
                  </button>
                </div>

                <div className="col-md-6">
                  <button
                    className="btn w-100"
                    style={{
                      border: "1px solid #ef4444",
                      color: "#ef4444",
                      background: "#fff",
                    }}
                  >
                    ✖ Reject
                  </button>
                </div>

                <div className="col-md-12">
                  <button
                    className="btn w-100"
                    style={{
                      border: "1px solid #ef4444",
                      color: "#ef4444",
                      background: "#fff",
                    }}
                  >
                    🔁 Reschedule Appointment
                  </button>
                </div>
              </div>

              {/* REASON */}
              <div className="mb-3">
                <label className="form-label">
                  Cancellation / Rejection Reason
                </label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Enter reason for cancellation or rejection..."
                />
              </div>

              {/* CANCEL */}
              <button
                className="btn w-100"
                style={{ background: "#ef4444", color: "#fff" }}
              >
                🚫 Cancel Appointment
              </button>

              {userRole === "donor" && (
                <div
                  className="mt-4 p-4 text-center"
                  style={{
                    background: "#ecfdf5",
                    border: "1px solid #86efac",
                    borderRadius: 12,
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: "#22c55e",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                      margin: "0 auto 12px",
                    }}
                  >
                    ✓
                  </div>

                  <h6 style={{ color: "#166534" }}>
                    Appointment Completed
                  </h6>

                  <small className="text-muted">
                    Donation record has been created
                  </small>
                </div>
              )}

            </div>
          </div>
        </div>
      )}


      {/* HISTORY MODAL */}
  {showHistory && (
  <div
    className="modal d-block"
    style={{ background: "rgba(0,0,0,0.6)" }}
  >
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div
        className="modal-content p-4"
        style={{ borderRadius: 16 }}
      >

        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">🕒 Appointment History</h5>
          <button
            className="btn-close"
            onClick={() => setShowHistory(false)}
          ></button>
        </div>

        {/* HISTORY ITEM 1 */}
        <div
          className="d-flex justify-content-between align-items-center p-3 mb-3"
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            background: "#f9fafb",
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              📄
            </div>

            <div>
              <div className="fw-semibold">Rahul Sharma</div>
              <small className="text-muted">
                Feb 2, 2026 · 09:30 - 10:00
              </small>
            </div>
          </div>

          <span
            style={{
              background: "#dcfce7",
              color: "#166534",
              border: "1px solid #86efac",
              padding: "4px 12px",
              borderRadius: 999,
              fontSize: 12,
            }}
          >
            Completed
          </span>
        </div>

        {/* HISTORY ITEM 2 */}
        <div
          className="d-flex justify-content-between align-items-center p-3"
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            background: "#f9fafb",
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              📄
            </div>

            <div>
              <div className="fw-semibold">Amit Kumar</div>
              <small className="text-muted">
                Jan 15, 2025 · 09:00 - 09:30
              </small>
            </div>
          </div>

          <span
            style={{
              background: "#dcfce7",
              color: "#166534",
              border: "1px solid #86efac",
              padding: "4px 12px",
              borderRadius: 999,
              fontSize: 12,
            }}
          >
            Completed
          </span>
        </div>

      </div>
    </div>
  </div>
)}



      {showBookModal && (
        <BookAppointmentModal
          onClose={() => setShowBookModal(false)}
        />
      )}

    </div>
  );
};

/* SMALL COMPONENTS */

const StatCard = ({ title, value }) => (
  <div className="col-md-3 col-sm-6 mb-3">
    <div className="card shadow-sm" style={{ border: "1px solid #e5e7eb" }}>
      <div className="card-body">
        <h5>{value}</h5>
        <small className="text-muted">{title}</small>
      </div>
    </div>
  </div>
);

const Modal = ({ children, onClose }) => (
  <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog">
      <div className="modal-content p-3">
        <div className="text-end">
          <button className="btn-close" onClick={onClose}></button>
        </div>
        {children}

      </div>
    </div>

  </div>
);

export default Appointments;
