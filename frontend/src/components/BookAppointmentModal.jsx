import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BookAppointmentModal = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    bloodGroup: "",
    type: "Regular Donation",
    location: "Blood Bank",
    date: "2026-02-12",
    time: "",
    notes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const timeSlots = [
    "09:00","09:30","10:00","10:30",
    "11:00","11:30","14:00","14:30",
    "15:00","15:30","16:00","16:30"
  ];

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content p-4 rounded-4">

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>❤️ Book Appointment</h4>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* STEP INDICATOR */}
          <div className="bg-danger text-white p-3 rounded-3 mb-4 text-center">
            Step {step} of 3
          </div>

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <>
              <h5 className="mb-3">Your Details</h5>

              <div className="mb-3">
                <label>Full Name *</label>
                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Phone Number *</label>
                  <input
                    className="form-control"
                    name="phone"
                    maxLength="10"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>Blood Group *</label>
                  <select
                    className="form-select"
                    name="bloodGroup"
                    value={form.bloodGroup}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label>Email (Optional)</label>
                <input
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <button
                className="btn btn-danger w-100"
                onClick={() => setStep(2)}
              >
                Continue to Appointment Details →
              </button>
            </>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <>
              <h5 className="mb-3">Appointment Details</h5>

              <div className="mb-3">
                <label>Appointment Type *</label>
                <select
                  className="form-select"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option>Regular Donation</option>
                  <option>Camp Donation</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Location *</label>
                <select
                  className="form-select"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                >
                  <option>Blood Bank</option>
                  <option>Corporate Donation Camp</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Appointment Date *</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>

              <label className="mb-2">Time Slot *</label>
              <div className="row">
                {timeSlots.map((t) => (
                  <div className="col-3 mb-2" key={t}>
                    <button
                      type="button"
                      className={`btn w-100 ${
                        form.time === t ? "btn-danger" : "btn-outline-secondary"
                      }`}
                      onClick={() => setForm({ ...form, time: t })}
                    >
                      {t}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mb-3 mt-3">
                <label>Additional Notes (Optional)</label>
                <textarea
                  className="form-control"
                  name="notes"
                  rows="3"
                  value={form.notes}
                  onChange={handleChange}
                />
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-secondary w-50"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>

                <button
                  className="btn btn-danger w-50"
                  onClick={() => setStep(3)}
                >
                  Review Appointment →
                </button>
              </div>
            </>
          )}

          {/* ================= STEP 3 ================= */}
          {step === 3 && (
            <>
              <h5 className="mb-3">Review & Confirm</h5>

              <div className="card p-3 mb-3 bg-light">
                <h6>Your Details</h6>
                <p>Name: {form.name}</p>
                <p>Phone: {form.phone}</p>
                <p>Email: {form.email || "N/A"}</p>
                <p>Blood Group: {form.bloodGroup}</p>
              </div>

              <div className="card p-3 mb-3 bg-light">
                <h6>Appointment Details</h6>
                <p>Type: {form.type}</p>
                <p>Location: {form.location}</p>
                <p>Date: {form.date}</p>
                <p>Time: {form.time}</p>
              </div>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-secondary w-50"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>

                <button
                  className="btn btn-success w-50"
                  onClick={() => alert("Appointment Confirmed!")}
                >
                  Confirm Appointment
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default BookAppointmentModal;
