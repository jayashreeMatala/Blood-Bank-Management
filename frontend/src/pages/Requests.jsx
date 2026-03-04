import React, { useState } from "react";
import "./BloodRequests.css";
import { useRequests } from "../context/RequestContext.jsx";

export default function BloodRequests() {
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
    const { 
  requests, 
  addRequest, 
  approveRequest, 
  rejectRequest, 
  markFulfilled,
  deleteRequest
} = useRequests();
    const total = requests.length;
const pending = requests.filter(r => r.status === "Pending").length;
const approved = requests.filter(r => r.status === "Approved").length;
const fulfilled = requests.filter(r => r.status === "Fulfilled").length;
const rejected = requests.filter(r => r.status === "Rejected").length;
    const [form, setForm] = useState({
  hospital: "",
  doctor: "",
  phone: "",
  email: "",
  patient: "",
  blood: "",
  units: 1,
  priority: "Normal",
  date: "",
  reason: ""
});
const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};
const handleSubmit = async () => {
  if (!form.hospital || !form.blood || !form.units || !form.date) {
    alert("Please fill required fields");
    return;
  }

  await addRequest(form);

setForm({
  hospital: "",
  doctor: "",
  phone: "",
  email: "",
  patient: "",
  blood: "",
  units: 1,
  priority: "Normal",
  date: "",
  reason: ""
});

setShowModal(false);
};


  return (
    <div className="requests-wrapper requests-page">


      {/* HEADER */}
      <div className="requests-header">
        <div className="header-left">
          <div className="heart-box">❤</div>
          <div>
            <h1>Blood Requests</h1>
            <p>Hospital request management · approval system · stock check</p>
          </div>
        </div>

        <button 
  className="new-btn"
  onClick={() => setShowModal(true)}
>
  + New Request
</button>

      </div>

      {/* SUMMARY CARDS */}
      <div className="summary-grid">

        <div className="summary-card border-gray">
          <div className="icon-box bg-gray">📄</div>
          <h2>{total}</h2>
          <span>Total</span>
        </div>

        <div className="summary-card border-yellow">
          <div className="icon-box bg-yellow">⏳</div>
         <h2>{pending}</h2>
          <span>Pending</span>
        </div>

        <div className="summary-card border-blue">
          <div className="icon-box bg-blue">✔</div>
         <h2>{approved}</h2>
          <span>Approved</span>
        </div>

        <div className="summary-card border-green">
          <div className="icon-box bg-green">📈</div>
          <h2>{fulfilled}</h2>
          <span>Fulfilled</span>
        </div>

        <div className="summary-card border-red">
          <div className="icon-box bg-red">✖</div>
          <h2>{rejected}</h2>
          <span>Rejected</span>
        </div>

        <div className="summary-card border-danger">
          <div className="icon-box bg-danger">⚠</div>
          <h2>0</h2>
          <span>Emergency</span>
        </div>

      </div>

      {/* FILTER BOX */}
      <div className="filter-container">
        <div className="filter-title">Filters</div>

        <div className="filter-row">
          <input placeholder="Search hospital, patient, ID..." />
          <select><option>All Blood Groups</option></select>
          <select><option>All Status</option></select>
          <select><option>All Priority</option></select>
        </div>
      </div>

      <div className="request-count">4 REQUESTS FOUND</div>

      {/* TABLE */}
      <div className="table-container">

        <table>
          <thead>
            <tr>
              <th>REQUEST ID</th>
              <th>HOSPITAL / DOCTOR</th>
              <th>PATIENT</th>
              <th>BLOOD</th>
              <th>UNITS</th>
              <th>REQUIRED DATE</th>
              <th>PRIORITY</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

  <tbody>
  {requests.map((r, index) => {

    // DOT COLOR
    const dotColor =
      r.priority === "Emergency"
        ? "red"
        : r.priority === "Urgent"
        ? "orange"
        : "green";

    // BLOOD COLOR
    const bloodClass =
      r.blood === "A+" ? "b-blue" :
      r.blood === "B+" ? "b-green" :
      r.blood === "O-" ? "b-red" :
      "b-purple";

    return (
      <tr key={r._id}>

        {/* REQUEST ID */}
        <td>
          <div className="req-id">
            <span className={`dot ${dotColor}`}></span>
            REQ-{new Date(r.createdAt || Date.now()).getFullYear()}-
            {(index + 1).toString().padStart(3, "0")}
          </div>
        </td>

        {/* HOSPITAL */}
        <td>
          <strong>{r.hospital}</strong>
          <div className="sub">{r.doctor}</div>
        </td>

        {/* PATIENT */}
        <td>{r.patient}</td>

        {/* BLOOD */}
        <td>
          <span className={`blood ${bloodClass}`}>
            {r.blood}
          </span>
        </td>

        {/* UNITS */}
        <td className="units">{r.units}</td>

        {/* DATE */}
        <td>
          {r.date
            ? new Date(r.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })
            : ""}
        </td>

        {/* PRIORITY */}
        <td>
          <span className={`badge ${r.priority.toLowerCase()}`}>
            {r.priority}
          </span>
        </td>

        {/* STATUS */}
        <td>
          <span className="badge fulfilled">
            {r.status}
          </span>
        </td>
{/* ACTION */}
<td style={{ display: "flex", gap: "8px" }}>
 {r.status === "Pending" && (
  <>
    <button
      className="approve-btn"
      onClick={() => approveRequest(r._id)}
    >
      ✔
    </button>

    <button
      className="reject-btn"
      onClick={() => rejectRequest(r._id)}
    >
      ✖
    </button>
  </>
)}

{r.status === "Approved" && (
  <button
    className="fulfill-btn"
    onClick={() => markFulfilled(r._id)}
  >
    📦
  </button>
)}
👁
<span
  className="delete-icon"
  onClick={() => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      deleteRequest(r._id);
    }
  }}
>
  🗑
</span>
</td>

      </tr>
    );
  })}
</tbody>

        </table>
      </div>
{showModal && (
  <div className="nr-overlay">
    <div className="nr-modal">

      <div className="nr-header">
        <div className="nr-title">
          <div className="nr-icon">🩸</div>
          <div>
            <h2>New Blood Request</h2>
            <p>Submit a hospital blood requisition</p>
          </div>
        </div>

        <span
          className="nr-close"
          onClick={() => setShowModal(false)}
        >
          ×
        </span>
      </div>

      {/* HOSPITAL INFO */}
      <div className="nr-section blue">
        <h4>🏥 Hospital Information</h4>

        <div className="nr-grid">
          <div>
            <label>Hospital Name *</label>
            <input
  name="hospital"
  value={form.hospital}
  onChange={handleChange}
/>
          </div>

          <div>
            <label>Doctor Name</label>
            <input
  name="doctor"
  value={form.doctor}
  onChange={handleChange}
/>
          </div>

          <div>
            <label>Contact Phone</label>
           <input
  name="phone"
  value={form.phone}
  onChange={handleChange}
/>
          </div>

          <div>
            <label>Contact Email</label>
            <input
  name="email"
  value={form.email}
  onChange={handleChange}
/>
          </div>
        </div>
      </div>

      {/* BLOOD DETAILS */}
      <div className="nr-section pink">
        <h4>🩸 Blood & Patient Details</h4>

        <div className="nr-grid">
          <div>
            <label>Patient Name</label>
           <input
  name="patient"
  value={form.patient}
  onChange={handleChange}
/>
          </div>

          <div>
            <label>Blood Group *</label>
            <select
  name="blood"
  value={form.blood}
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

          <div>
            <label>Units Required *</label>
            <input
  type="number"
  name="units"
  value={form.units}
  onChange={handleChange}
/>
          </div>

          <div>
            <select
  name="priority"
  value={form.priority}
  onChange={handleChange}
>
  <option value="Normal">Normal</option>
  <option value="Urgent">Urgent</option>
  <option value="Emergency">Emergency</option>
</select>
          </div>

          <div>
            <label>Required By Date</label>
            <input
  type="date"
  name="date"
  value={form.date}
  onChange={handleChange}
/>
          </div>
        </div>
      </div>

      {/* TEXTAREA */}
      <div className="nr-textarea">
        <label>Patient Condition / Reason</label>
        <textarea
  name="reason"
  value={form.reason}
  onChange={handleChange}
/>
      </div>

      {/* FOOTER */}
      <div className="nr-footer">
        <button
          className="nr-cancel"
          onClick={() => setShowModal(false)}
        >
          ✕ Cancel
        </button>

       <button className="nr-submit" onClick={handleSubmit}>
  ➤ Submit Request
</button>
      </div>

    </div>
  </div>
)}
{showDetails && (
  <div className="rd-overlay">
    <div className="rd-modal">

      {/* HEADER */}
      <div className="rd-header">
        <div className="rd-header-left">
          <div className="rd-icon">📄</div>
          <div>
            <h2>Request Details</h2>
            <p className="rd-id">REQ-2024-003</p>
          </div>
        </div>

        <div className="rd-header-right">
          <span className="rd-badge normal">Normal</span>
          <span className="rd-badge fulfilled">Fulfilled</span>

          <div
            className="rd-close"
            onClick={() => setShowDetails(false)}
          >
            ×
          </div>
        </div>
      </div>


      {/* HOSPITAL SECTION */}
      <div className="rd-section blue">

        <div className="rd-section-title">
          🏥 Hospital Information
        </div>

        <div className="rd-grid">
          <div className="rd-box">
            <label>Hospital</label>
            <strong>Max Hospital</strong>
          </div>

          <div className="rd-box">
            <label>Doctor</label>
            <strong>Dr. Kumar</strong>
          </div>

          <div className="rd-box">
            <label>Phone</label>
            <strong>+91 4456789014</strong>
          </div>

          <div className="rd-box">
            <label>Email</label>
            <strong>—</strong>
          </div>
        </div>
      </div>


      {/* BLOOD SECTION */}
      <div className="rd-section pink">

        <div className="rd-section-title">
          🩸 Blood Request Details
        </div>

        <div className="rd-stats">

          <div className="rd-stat">
            <label>Blood Group</label>
            <span className="blood-pill green">B+</span>
          </div>

          <div className="rd-stat">
            <label>Units Req.</label>
            <strong className="big">3</strong>
          </div>

          <div className="rd-stat danger">
            <label>In Stock</label>
            <strong className="big red-text">0</strong>
          </div>

        </div>

        <div className="rd-grid">
          <div className="rd-box">
            <label>Patient</label>
            <strong>Patient C</strong>
          </div>

          <div className="rd-box">
            <label>Required By</label>
            <strong>January 18, 2025</strong>
          </div>
        </div>

      </div>


      {/* REASON */}
      <div className="rd-reason">
        <label>REASON / PATIENT CONDITION</label>
        <p>Scheduled surgery</p>
      </div>

    </div>
  </div>
)}

    </div>
  );
}
