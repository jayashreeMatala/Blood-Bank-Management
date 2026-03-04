import React, { useState, useEffect } from "react";
import { useDonors } from "../context/DonorContext";
import "./Donations.css";
import { useLocation, useNavigate } from "react-router-dom";

function Donations() {
    const location = useLocation();
    const navigate = useNavigate();
  const donor = location.state?.donor;
  const { donors, updateDonor } = useDonors();
  const [donationRecords, setDonationRecords] = useState([]);
  

  const [selectedDonorId, setSelectedDonorId] = useState(donor?._id || "");
  const [isEligible, setIsEligible] = useState(false);
  const generateBagNumber = () => {
  const today = new Date();
  const datePart = today.toISOString().slice(0,10).replace(/-/g, "");
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `BAG-${datePart}-${randomPart}`;
};

  const [form, setForm] = useState({
   
    donationId: "DON-" + Date.now(),
    donationDate: new Date().toISOString().split("T")[0],
    donationType: "Whole Blood",
    volume: "350 ml",
    units: 1,
    bagNumber: generateBagNumber(),
    startTime: "",
    endTime: "",
    staff: "",
    site: "Hospital",
    bp: "",
    pulse: "",
    hemoglobin: "",
    reaction: "None",
    condition: "Yes - Stable",
    refreshment: "Yes",
    status: "Completed"
  });

 
const [selectedRecord, setSelectedRecord] = useState(null);
const [editId, setEditId] = useState(null);

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
useEffect(() => {
  if (donor?._id) {
    setSelectedDonorId(donor._id);

    if (
      donor.screeningStatus === "Eligible" &&
      (!donor.nextEligibleDate ||
        new Date() >= new Date(donor.nextEligibleDate))
    ) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  }
}, [donor]);
  
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

  const donor = donors.find((d) => String(d._id) === id);

if (
  donor?.screeningStatus === "Eligible" &&
  (!donor.nextEligibleDate ||
    new Date() >= new Date(donor.nextEligibleDate))
) {
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
    if (!form.hemoglobin || form.hemoglobin < 12)
  return "Hemoglobin must be at least 12";

    return null;
  };
const handleSubmit = async () => {
  if (!selectedDonorId) {
    alert("Please select donor first");
    return;
  }

  const error = validate();
  if (error) {
    alert(error);
    return;
  }

  try {
    const url = editId
      ? `http://localhost:5000/api/donations/${editId}`
      : "http://localhost:5000/api/donations";

    const method = editId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        donor: selectedDonorId
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    alert(editId ? "Donation Updated ✅" : "Donation Completed ✅");

    fetchDonations();

    setEditId(null);   // 🔥 VERY IMPORTANT

    setSelectedDonorId("");
    setIsEligible(false);

    setForm({
      donationId: "DON-" + Date.now(),
      donationDate: new Date().toISOString().split("T")[0],
      donationType: "Whole Blood",
      volume: "350 ml",
      units: 1, 
      bagNumber: generateBagNumber(),
      startTime: "",
      endTime: "",
      staff: "",
      site: "Hospital",
      bp: "",
      pulse: "",
      hemoglobin: "",
      reaction: "None",
      condition: "Yes - Stable",
      refreshment: "Yes",
      status: "Completed"
    });

  } catch (error) {
    alert(error.message);
  }
};
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this donation?"))
    return;

  try {
    await fetch(`http://localhost:5000/api/donations/${id}`, {
      method: "DELETE"
    });

    fetchDonations();
  } catch (error) {
    alert("Delete failed");
  }
};

const handleEdit = (record) => {
  setForm({
    donationId: record.donationId,
    donationDate: record.donationDate,
    donationType: record.donationType,
    volume: record.volume,
    units: record.units,
    bagNumber: record.bagNumber,
    startTime: record.startTime,
    endTime: record.endTime,
    staff: record.staff,
    site: record.site,
    bp: record.bp,
    pulse: record.pulse,
    reaction: record.reaction,
    condition: record.condition,
    refreshment: record.refreshment,
    status: record.status
  });

  setSelectedDonorId(record.donor?._id);
  setEditId(record._id);
  setIsEligible(true);

  window.scrollTo({ top: 0, behavior: "smooth" });
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
    ⚠ Not Eligible - Next Eligible Date: {selectedDonor?.nextEligibleDate
  ? new Date(selectedDonor.nextEligibleDate).toLocaleDateString("en-IN")
  : "Please complete screening"}
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

 <button
  className="go-screening-btn"
  onClick={() => navigate("/screening")}
>
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
                  value={form.donationType}
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
                  value={form.volume}
                  onChange={handleChange}
                >
                  <option>350 ml</option>
                  <option>450 ml</option>
                </select>
              </div>
<div className="col-md-6 mt-3">
  <label>Donation Units</label>
  <input
    type="number"
    name="units"
    className="form-control"
    value={form.units}
    onChange={handleChange}
  />
</div>
              <div className="col-md-6">
                <label>Bag Number *</label>
                <input
  name="bagNumber"
  className="form-control"
  value={form.bagNumber}
  readOnly
/>
              </div>

              <div className="col-md-6 mt-3">
                <label>Collection Start Time *</label>
                <input
                  type="time"
                  name="startTime"
                  className="form-control"
                  value={form.startTime}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mt-3">
                <label>Collection End Time *</label>
                <input
                  type="time"
                  name="endTime"
                  className="form-control"
                  value={form.endTime}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mt-3">
                <label>Staff Name *</label>
                <input
                  name="staff"
                  className="form-control"
                  value={form.staff}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mt-3">
                <label>Collection Site</label>
                <select
                  name="site"
                  className="form-select"
                  value={form.site}


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
                  value={form.bp}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label>Pulse Rate *</label>
                <input
                  name="pulse"
                  type="number"
                  className="form-control"
                  value={form.pulse}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label>Hemoglobin</label>
                <input
                type="number"
                name="hemoglobin"
                  className="form-control"
                  value={form.hemoglobin}
                  onChange={handleChange}
                  
                />
              </div>
            </div>

            <div className="mt-3">
              <label>Any Reaction?</label>
              <select
                name="reaction"
                className="form-select"
                value={form.reaction}
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
                  value={form.condition}
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
                  value={form.refreshment}
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
              value={form.status}
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
<div className="donation-stats-row">

<div className="donation-stat-card stat-red">

<div className="stat-left">
<h3>{donationRecords.length}</h3>
<p>Today's Donations</p>
</div>

<div className="stat-icon red">
📅
</div>

</div>


<div className="donation-stat-card stat-green">

<div className="stat-left">
<h3>
{donationRecords.filter(r => r.status === "Completed").length}
</h3>
<p>Completed</p>
</div>

<div className="stat-icon green">
✔
</div>

</div>


<div className="donation-stat-card stat-blue">

<div className="stat-left">
<h3>
{donationRecords.reduce((sum, r) => sum + (r.units || 0), 0)}
</h3>
<p>Total Units</p>
</div>

<div className="stat-icon blue">
📈
</div>

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
                Batch: BAG {record._id.slice(-5)}
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
          <span>🧪 Volume: {record.volume}</span>
          <span>🩺 Hemoglobin: {record.hemoglobin}</span>
          <span>❤️ BP: {record.bp}</span>
          <span>💓 Pulse: {record.pulse} bpm</span>
        </div>

        {/* SCREENING BAR */}
        <div className="screening-bar-new">
          ✔ SCREENING PASSED
        </div>
<div className="record-actions">

<button
  className="btn btn-sm btn-danger"
  onClick={() => handleDelete(record._id)}
>
Delete
</button>

<button
  className="btn btn-sm btn-primary"
  onClick={() => handleEdit(record)}
>
Edit
</button>

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
           <p>{selectedRecord.donor?.name}</p>
          </div>

          <div>
            <label>Blood Group</label>
            <span className="blood-group-badge">
              {selectedRecord.donor?.bloodGroup}
            </span>
          </div>

          <div>
            <label>Donor ID</label>
            <p>{selectedRecord._id}</p>
          </div>

          <div>
            <label>Donation Date</label>
           <p>
  {new Date(selectedRecord.donationDate).toLocaleDateString("en-IN")}
</p>
          </div>
        </div>
      </div>

      {/* COLLECTION DETAILS */}
      <div className="info-card collection-card">
        <h6>Collection Details</h6>

        <div className="collection-grid">
          <div className="mini-box">
            <label>Batch ID</label>
           <p>BAG-{selectedRecord._id.slice(-5)}</p>
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
