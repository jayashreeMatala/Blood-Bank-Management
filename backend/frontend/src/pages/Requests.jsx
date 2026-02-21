import React, { useState } from "react";
import "./BloodRequests.css";

export default function BloodRequests() {
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);


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
          <h2>4</h2>
          <span>Total</span>
        </div>

        <div className="summary-card border-yellow">
          <div className="icon-box bg-yellow">⏳</div>
          <h2>0</h2>
          <span>Pending</span>
        </div>

        <div className="summary-card border-blue">
          <div className="icon-box bg-blue">✔</div>
          <h2>0</h2>
          <span>Approved</span>
        </div>

        <div className="summary-card border-green">
          <div className="icon-box bg-green">📈</div>
          <h2>4</h2>
          <span>Fulfilled</span>
        </div>

        <div className="summary-card border-red">
          <div className="icon-box bg-red">✖</div>
          <h2>0</h2>
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
            <tr>
              <td>
                <div className="req-id">
                  <span className="dot green"></span>
                  REQ-2024-003
                </div>
              </td>
              <td>
                <strong>Max Hospital</strong>
                <div className="sub">Dr. Kumar</div>
              </td>
              <td>Patient C</td>
              <td><span className="blood b-green">B+</span></td>
              <td className="units">3</td>
              <td>Jan 18, 2025</td>
              <td><span className="badge normal">Normal</span></td>
              <td><span className="badge fulfilled">Fulfilled</span></td>
              <td
  style={{ cursor: "pointer" }}
  onClick={() => setShowDetails(true)}
>
  👁
</td>

            </tr>
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
            <input defaultValue="City Hospital" />
          </div>

          <div>
            <label>Doctor Name</label>
            <input defaultValue="Dr. Sharma" />
          </div>

          <div>
            <label>Contact Phone</label>
            <input defaultValue="+91 9876543210" />
          </div>

          <div>
            <label>Contact Email</label>
            <input defaultValue="doctor@hospital.com" />
          </div>
        </div>
      </div>

      {/* BLOOD DETAILS */}
      <div className="nr-section pink">
        <h4>🩸 Blood & Patient Details</h4>

        <div className="nr-grid">
          <div>
            <label>Patient Name</label>
            <input placeholder="Patient name" />
          </div>

          <div>
            <label>Blood Group *</label>
            <select>
              <option>Select</option>
            </select>
          </div>

          <div>
            <label>Units Required *</label>
            <input type="number" defaultValue="1" />
          </div>

          <div>
            <label>Priority / Urgency</label>
            <select>
              <option>Normal</option>
            </select>
          </div>

          <div>
            <label>Required By Date</label>
            <input type="date" />
          </div>
        </div>
      </div>

      {/* TEXTAREA */}
      <div className="nr-textarea">
        <label>Patient Condition / Reason</label>
        <textarea placeholder="Describe the reason for request..."></textarea>
      </div>

      {/* FOOTER */}
      <div className="nr-footer">
        <button
          className="nr-cancel"
          onClick={() => setShowModal(false)}
        >
          ✕ Cancel
        </button>

        <button className="nr-submit">
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
