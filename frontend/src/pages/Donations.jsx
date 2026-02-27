import React, { useState, useEffect } from "react";
import { useDonors } from "../context/DonorContext";
import "./Donations.css";

function Donations() {
  const { donors, updateDonor } = useDonors();
  const [donationRecords, setDonationRecords] = useState([]);
  

  const [selectedDonorId, setSelectedDonorId] = useState("");
  const [isEligible, setIsEligible] = useState(false);

  const [form, setForm] = useState({
    donationId: "DON-" + Date.now(),
    donationDate: new Date().toISOString().split("T")[0],
    donationType: "Whole Blood",
    volume: "350 ml",
    bagNumber: "",
    startTime: "",
    endTime: "",
    staff: "",
    site: "Hospital",
    bp: "",
    pulse: "",
    reaction: "None",
    condition: "Yes - Stable",
    refreshment: "Yes",
    status: "Completed"
  });

 
const [selectedRecord, setSelectedRecord] = useState(null);

// 🔥 FETCH DONATIONS FROM BACKEND
useEffect(() => {
  fetchDonations();
}, []);

const fetchDonations = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/donations");
    const data = await res.json();
    setDonationRecords(data);
  } catch (error) {
    console.error("Error fetching donations:", error);
  }
};
  
  const selectedDonor = donors.find(
  (d) => String(d._id) === selectedDonorId
);


  const handleSelect = (e) => {
  const id = e.target.value;
  setSelectedDonorId(id);

  if (!id) {
    setIsEligible(false);
    return;
  }

  const donor = donors.find((d) => String(d.id) === id);

  // ✅ REAL ELIGIBILITY CHECK
  if (donor?.screeningStatus === "Eligible") {
    setIsEligible(true);
  } else {
    setIsEligible(false);
  }
};


  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.bagNumber.trim())
      return "Bag Number required";

    if (!form.startTime || !form.endTime)
      return "Start & End time required";

    if (!form.staff.trim())
      return "Staff name required";

    if (!form.bp.match(/^\d{2,3}\/\d{2,3}$/))
      return "Blood Pressure format must be 120/80";

    if (!form.pulse || form.pulse < 50 || form.pulse > 120)
      return "Pulse must be between 50-120 bpm";

    return null;
  };

 const handleSubmit = async () => {
  const error = validate();
  if (error) {
    alert(error);
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        donor: selectedDonor._id
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    alert("Donation Completed Successfully ✅");
    fetchDonations(); // refresh list

  } catch (error) {
    alert(error.message);
  }
};


  return (
    <div className="donation-page">

      {/* ===== HEADER ===== */}
      <div className="page-header">
        <div className="icon-box">🩸</div>
        <div>
          <h2>Blood Donation</h2>
          <p>Complete the donation process</p>
        </div>
      </div>

      {/* ===== SELECT DONOR ===== */}
      <div className="card main-card">
        <label>Select Donor</label>
        <select
          className="form-select mt-2"
          value={selectedDonorId}
          onChange={handleSelect}
        >
          <option value="">Choose donor...</option>
          {donors.map((d) => (
            <option key={d._id} value={d._id}>
  {d.name} - {d.bloodGroup}
</option>
          ))}
        </select>

        {selectedDonor && (
          <div className="donor-info-box mt-4">
            <div className="row">
              <div className="col-md-6">
                <strong>Donor Name</strong>
                <p>{selectedDonor.name}</p>

                <strong>Last Donation</strong>
                <p>Feb 18, 2026</p>
              </div>

              <div className="col-md-6 text-end">
                <strong>Blood Group</strong>
                <p className="text-danger fw-bold">
                  {selectedDonor.blood}
                </p>

                <strong>Total Donations</strong>
                <p>2</p>
              </div>
            </div>

            <div className="mt-2">
             {isEligible ? (
  <span className="eligible-badge">
    Eligible - Screened on Feb 16, 2026
  </span>
) : (
  <span className="not-screened-badge">
    ⚠ Not Screened - Complete health screening first
  </span>
)}

            </div>
          </div>
        )}
      </div>

      {/* 🔴 NOT ELIGIBLE BIG BOX */}
{selectedDonor && !isEligible && (
  <div className="not-eligible-box mt-4">
    <div className="warning-icon">!</div>

    <h4>Donor Not Eligible</h4>

    <p>
      This donor must complete health screening and be marked as eligible before donation.
    </p>

    <button className="go-screening-btn">
      Go to Health Screening
    </button>
  </div>
)}


      {/* ===== DONATION FORM ===== */}
      {selectedDonor && isEligible && (
        <>
          {/* Donation Basic Details */}
          <div className="card main-card mt-4">
            <h5>Donation Basic Details</h5>

            <div className="row mt-3">
              <div className="col-md-6">
                <label>Donation ID</label>
                <input
                  className="form-control"
                  value={form.donationId}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label>Donation Date</label>
                <input
                  type="date"
                  name="donationDate"
                  className="form-control"
                  value={form.donationDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mt-3">
                <label>Donation Type</label>
                <select
                  name="donationType"
                  className="form-select"
                  onChange={handleChange}
                >
                  <option>Whole Blood</option>
                  <option>Platelets</option>
                  <option>Plasma</option>
                </select>
              </div>
            </div>
          </div>

          {/* Collection Details */}
          <div className="card main-card mt-4">
            <h5>Collection Details</h5>

            <div className="row mt-3">
              <div className="col-md-6">
                <label>Collection Volume (ml)</label>
                <select
                  name="volume"
                  className="form-select"
                  onChange={handleChange}
                >
                  <option>350 ml</option>
                  <option>450 ml</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Bag Number *</label>
                <input
                  name="bagNumber"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mt-3">
                <label>Collection Start Time *</label>
                <input
                  type="time"
                  name="startTime"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mt-3">
                <label>Collection End Time *</label>
                <input
                  type="time"
                  name="endTime"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mt-3">
                <label>Staff Name *</label>
                <input
                  name="staff"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mt-3">
                <label>Collection Site</label>
                <select
                  name="site"
                  className="form-select"
                  onChange={handleChange}
                >
                  <option>Hospital</option>
                  <option>Blood Camp</option>
                </select>
              </div>
            </div>
          </div>

          {/* Donor Condition Monitoring */}
          <div className="card main-card mt-4">
            <h5>Donor Condition Monitoring</h5>

            <div className="row mt-3">
              <div className="col-md-4">
                <label>Blood Pressure *</label>
                <input
                  name="bp"
                  className="form-control"
                  placeholder="120/80"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label>Pulse Rate *</label>
                <input
                  name="pulse"
                  type="number"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label>Hemoglobin</label>
                <input
                  className="form-control"
                  value="12.5 g/dL"
                  readOnly
                />
              </div>
            </div>

            <div className="mt-3">
              <label>Any Reaction?</label>
              <select
                name="reaction"
                className="form-select"
                onChange={handleChange}
              >
                <option>None</option>
                <option>Dizziness</option>
                <option>Nausea</option>
              </select>
            </div>

            <div className="row mt-3">
              <div className="col-md-6">
                <label>Condition Stable?</label>
                <select
                  name="condition"
                  className="form-select"
                  onChange={handleChange}
                >
                  <option>Yes - Stable</option>
                  <option>No</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Refreshment Provided?</label>
                <select
                  name="refreshment"
                  className="form-select"
                  onChange={handleChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Donation Status */}
          <div className="card main-card mt-4">
            <h5>Donation Status</h5>
            <select
              name="status"
              className="form-select"
              onChange={handleChange}
            >
              <option>Completed</option>
              <option>Deferred</option>
            </select>
          </div>

          <div className="btn-row mt-4">
            <button className="btn btn-light">Cancel</button>
            <button
              className="btn btn-danger"
              onClick={handleSubmit}
            >
              Complete Donation
            </button>
          </div>
        </>
      )}
      

 


{/* ============================= */}
{/* ===== DONATION RECORDS ===== */}
{/* ============================= */}

<div className="records-section mt-5">

  <h4 className="records-title">Donation Records</h4>
  <p className="records-sub">
    Complete history of blood donations
  </p>

  {/* ===== SUMMARY CARDS ===== */}
  <div className="summary-row">

    <div className="summary-card summary-blue">
      <div>
        <h3>{donationRecords.length}</h3>
        <span>Today's Donations</span>
      </div>
      <div className="summary-icon">📅</div>
    </div>

    <div className="summary-card summary-green">
      <div>
        <h3>
          {donationRecords.filter(r => r.status === "Completed").length}
        </h3>
        <span>Completed</span>
      </div>
      <div className="summary-icon">✔</div>
    </div>

    <div className="summary-card summary-purple">
      <div>
        <h3>{donationRecords.length}</h3>
        <span>Total Units</span>
      </div>
      <div className="summary-icon">📈</div>
    </div>

  </div>

  {/* ===== FILTER SECTION ===== */}
  <div className="filter-box">
    <input
      type="text"
      placeholder="Search by name or batch ID..."
      className="filter-input"
    />

    <select className="filter-select">
      <option>All Status</option>
      <option>Completed</option>
      <option>Deferred</option>
    </select>

    <select className="filter-select">
      <option>All Blood Groups</option>
      <option>A+</option>
      <option>B+</option>
      <option>O+</option>
      <option>AB+</option>
    </select>
  </div>

  {/* ===== RECORD CARDS ===== */}
  
  <div className="records-list">

    {donationRecords.map(record => (
      <div key={record._id} className="record-card-new">

        {/* HEADER */}
        <div className="record-top">

          <div className="record-left">
            <div className="blood-icon">🩸</div>

            <div>
              <strong>{record.donor?.name}</strong>
              <div className="batch-text">
                Batch: BAG {record.id}
              </div>
            </div>
          </div>

          <div className="record-right">
            <span className="blood-badge">
              {record.donor?.bloodGroup}
            </span>

            <span
  className="status-badge-modern clickable"
  onClick={() => setSelectedRecord(record)}
>
  {record.status}
</span>

          </div>

        </div>

        {/* BODY INFO */}
        <div className="record-info-row">
          <span>
  📅 {new Date(record.donationDate).toLocaleDateString("en-IN")}
</span>
          <span>🧪 Units: {record.units}</span>
          <span>🩺 Hemoglobin: {record.hemoglobin}</span>
          <span>❤️ BP: {record.bp}</span>
          <span>💓 Pulse: {record.pulse} bpm</span>
        </div>

        {/* SCREENING BAR */}
        <div className="screening-bar-new">
          ✔ SCREENING PASSED
        </div>

      </div>
    ))}

  </div>
</div>

{selectedRecord && (
  <div className="details-overlay">
    <div className="details-modal">

      {/* HEADER */}
      <div className="details-header">
        <div className="header-left">
          <div className="blood-icon-modal">🩸</div>
          <h4>Donation Details</h4>
        </div>

        <div className="header-right">
          <span className="completed-badge">Completed</span>
          <button
            className="close-btn"
            onClick={() => setSelectedRecord(null)}
          >
            ✕
          </button>
        </div>
      </div>

      {/* DONOR INFO */}
      <div className="info-card donor-card">
        <h6>Donor Information</h6>

        <div className="info-grid">
          <div>
            <label>Donor Name</label>
            <p>{selectedRecord.donorName}</p>
          </div>

          <div>
            <label>Blood Group</label>
            <span className="blood-group-badge">
              {selectedRecord.blood}
            </span>
          </div>

          <div>
            <label>Donor ID</label>
            <p>{selectedRecord.id}</p>
          </div>

          <div>
            <label>Donation Date</label>
            <p>{selectedRecord.date}</p>
          </div>
        </div>
      </div>

      {/* COLLECTION DETAILS */}
      <div className="info-card collection-card">
        <h6>Collection Details</h6>

        <div className="collection-grid">
          <div className="mini-box">
            <label>Batch ID</label>
            <p>BAG-{selectedRecord.id}</p>
          </div>

          <div className="mini-box">
            <label>Units Donated</label>
            <p>{selectedRecord.units}</p>
          </div>
        </div>
      </div>

      {/* VITAL SIGNS */}
      <div className="info-card vital-card">
        <h6>Vital Signs</h6>

        <div className="vital-grid">
          <div className="vital-box">
            <label>Hemoglobin</label>
            <h5>{selectedRecord.hemoglobin}</h5>
            <span>g/dL</span>
          </div>

          <div className="vital-box">
            <label>Blood Pressure</label>
            <h5>{selectedRecord.bp}</h5>
          </div>

          <div className="vital-box">
            <label>Pulse Rate</label>
            <h5>{selectedRecord.pulse}</h5>
            <span>bpm</span>
          </div>

          <div className="vital-box">
            <label>Weight</label>
            <h5>N/A</h5>
            <span>kg</span>
          </div>
        </div>
      </div>

      {/* SCREENING */}
      <div className="screening-box">
        ✔ Screening Passed
        <div className="sub-text">
          Donor was eligible for donation
        </div>
      </div>

      {/* ADDITIONAL NOTES */}
      <div className="notes-box">
        <strong>Additional Notes</strong>
        <p>
          Type: Whole Blood, Volume: 350ml, Reaction: None
        </p>
      </div>

    </div>
  </div>
)}

    </div>
  );
}

export default Donations;
