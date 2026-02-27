import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterCampModal = ({ camp, onClose, onRegister }) => {
  const [step, setStep] = useState(1);

  const [donor, setDonor] = useState({
    name: "",
    phone: "",
    blood: "",
    email: "",
  });

  const handleChange = (e) => {
    setDonor({ ...donor, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    console.log("Registered Donor:", donor);
    console.log("Camp:", camp);
    onRegister(camp.title);
    onClose();
  };

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content p-4">

          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Register for Camp</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* CAMP INFO */}
          <div className="p-3 mb-4 text-white rounded" style={{ background: "linear-gradient(90deg,#f8572c,#ff8a00)" }}>
            <h5>{camp.title}</h5>
            <div className="d-flex gap-4 mt-2">
              <span>📍 {camp.location}</span>
              <span>📅 {camp.date}</span>
              <span>⏰ {camp.time}</span>
            </div>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h6 className="mb-3">Search Existing Donor</h6>

              <input
                className="form-control mb-3"
                placeholder="Search by name or phone..."
              />

              <div className="text-center my-3 text-muted">OR Register New Donor</div>

              <div className="row">
                <div className="col-md-6">
                  <input
                    className="form-control mb-3"
                    placeholder="Full Name *"
                    name="name"
                    value={donor.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control mb-3"
                    placeholder="Phone *"
                    name="phone"
                    value={donor.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <select
                    className="form-control mb-3"
                    name="blood"
                    value={donor.blood}
                    onChange={handleChange}
                  >
                    <option value="">Select Blood Group</option>
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
                <div className="col-md-6">
                  <input
                    className="form-control mb-3"
                    placeholder="Email (Optional)"
                    name="email"
                    value={donor.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button className="btn btn-primary w-100" onClick={() => setStep(2)}>
                Register & Continue
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="p-3 mb-4 rounded" style={{ background: "#f1fff4", border: "1px solid #9be7b2" }}>
                <h6>{donor.name}</h6>
                <p className="mb-1">📞 {donor.phone}</p>
                <p className="mb-1">🩸 Blood Type: {donor.blood}</p>
                <p className="mb-0">📧 {donor.email || "N/A"}</p>
              </div>

              <div className="p-3 rounded mb-4" style={{ background: "#eef5ff" }}>
                <h6>Appointment Details</h6>
                <p>Type: Camp Donation</p>
                <p>Date: {camp.date}</p>
                <p>Time: {camp.time}</p>
                <p>Location: {camp.location}</p>
                <p>Status: <span className="text-success">Pre-Approved</span></p>
              </div>

              <div className="d-flex justify-content-between">
                <button className="btn btn-outline-secondary" onClick={() => setStep(1)}>
                  Back
                </button>
                <button className="btn btn-danger" onClick={handleConfirm}>
                  Confirm Registration
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default RegisterCampModal;
