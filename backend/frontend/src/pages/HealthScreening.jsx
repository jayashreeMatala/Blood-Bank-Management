import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HealthScreening() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    blood: "",
    lastDonation: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const startScreening = () => {
    if (!form.name || !form.blood) {
      alert("Please fill required fields");
      return;
    }

    alert("Health Screening Started ✅");
    // yahan next step (questions page) le ja sakte ho
  };

  return (
    <div className="container-fluid p-4">

      {/* BACK */}
      <button
        className="btn btn-link text-decoration-none mb-3"
        onClick={() => navigate("/")}
      >
        ← Back to Dashboard
      </button>

      {/* TITLE */}
      <h3 className="fw-bold">Health Screening</h3>
      <p className="text-muted">Pre-donation health assessment</p>

      {/* CARD */}
      <div className="card shadow-sm p-4 mt-4" style={{ maxWidth: "520px" }}>
        <h6 className="fw-bold mb-3">
          ❤️ Donor Information
        </h6>

        {/* FULL NAME */}
        <div className="mb-3">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your full name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* BLOOD GROUP */}
        <div className="mb-3">
          <label className="form-label">Blood Group *</label>
          <select
            className="form-select"
            name="blood"
            value={form.blood}
            onChange={handleChange}
          >
            <option value="">Select blood group</option>
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

        {/* LAST DONATION */}
        <div className="mb-4">
          <label className="form-label">
            Last Donation Date (if any)
          </label>
          <input
            type="date"
            className="form-control"
            name="lastDonation"
            value={form.lastDonation}
            onChange={handleChange}
          />
        </div>

        {/* START BUTTON */}
        <button
          className="btn btn-danger w-100 mb-3"
          onClick={startScreening}
        >
          ❤️ Start Health Screening
        </button>

        {/* INFO BOX */}
        <div
          className="p-3 rounded"
          style={{ background: "#eef5ff", fontSize: "14px" }}
        >
          <strong>Before You Begin</strong>
          <ul className="mb-0 mt-2">
            <li>This screening takes approximately 2–3 minutes</li>
            <li>Answer all questions honestly for accurate results</li>
            <li>You must be at least 18 years old to donate</li>
            <li>Minimum weight requirement: 45 kg</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HealthScreening;
