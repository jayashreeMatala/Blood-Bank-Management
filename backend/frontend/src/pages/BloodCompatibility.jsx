import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BloodCompatibility.css";



const BLOOD_DATA = {
  "A+": {
    receive: ["A+", "A-", "O+", "O-"],
    donate: ["A+", "AB+"],
    note: ""
  },
  "A-": {
    receive: ["A-", "O-"],
    donate: ["A+", "A-", "AB+", "AB-"],
    note: ""
  },
  "B+": {
    receive: ["B+", "B-", "O+", "O-"],
    donate: ["B+", "AB+"],
    note: ""
  },
  "B-": {
    receive: ["B-", "O-"],
    donate: ["B+", "B-", "AB+", "AB-"],
    note: ""
  },
  "AB+": {
    receive: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    donate: ["AB+"],
    note: "🌟 Universal Receiver"
  },
  "AB-": {
    receive: ["A-", "B-", "AB-", "O-"],
    donate: ["AB+", "AB-"],
    note: "💎 Rarest Type"
  },
  "O+": {
    receive: ["O+", "O-"],
    donate: ["A+", "B+", "AB+", "O+"],
    note: "👥 Most Common"
  },
  "O-": {
    receive: ["O-"],
    donate: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    note: "⭐ Universal Donor"
  }
};


const ALL_GROUPS = Object.keys(BLOOD_DATA);

export default function BloodCompatibility() {
  const [group, setGroup] = useState("");
  const [mode, setMode] = useState("receive");

  const compatible = group ? BLOOD_DATA[group][mode] : [];
  const notCompatible = group
    ? ALL_GROUPS.filter((g) => !compatible.includes(g))
    : [];

  return (
    <div className="container-fluid">
      {/* HEADER */}
      <h3 className="fw-bold mb-1">Blood Compatibility Checker</h3>
      <p className="text-muted mb-4">
        Check which blood types are compatible for donation and transfusion
      </p>

      {/* SELECT CARD */}
      <div className="card p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Blood Group</label>
            <select
              className="form-select"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              <option value="">Select blood group</option>
              {ALL_GROUPS.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Check Mode</label>
            <select
              className="form-select"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="receive">Can Receive From</option>
              <option value="donate">Can Donate To</option>
            </select>
          </div>
        </div>
      </div>

      {/* RESULT */}
      {group && (
        <>
          {/* COMPATIBLE */}
          <div className="alert alert-success mb-4">
            <h6 className="fw-bold mb-3">
              {mode === "receive"
                ? "Can Receive Blood From"
                : "Can Donate Blood To"}
            </h6>

            <div className="row g-3">
              {compatible.map((g) => (
                <div key={g} className="col-md-3">
                  <div className="card text-center border-success">
                    <div className="card-body">
                      <div
                        className="rounded-circle bg-success text-white mx-auto mb-2"
                        style={{
                          width: 50,
                          height: 50,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold"
                        }}
                      >
                        {g}
                      </div>
                      <span className="badge bg-success">Compatible</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NOT COMPATIBLE */}
          <div className="alert alert-danger mb-4">
            <h6 className="fw-bold mb-3">Not Compatible</h6>

            <div className="row g-3">
              {notCompatible.map((g) => (
                <div key={g} className="col-md-3">
                  <div className="card text-center border-danger">
                    <div className="card-body">
                      <div
                        className="rounded-circle bg-secondary text-white mx-auto mb-2"
                        style={{
                          width: 50,
                          height: 50,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold"
                        }}
                      >
                        {g}
                      </div>
                      <span className="badge bg-danger">
                        Not Compatible
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* COMPLETE CHART (STATIC – SAME AS YOUR SCREENSHOT) */}
      <div className="card p-3">
        <h6 className="fw-bold mb-3">Complete Compatibility Chart</h6>
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Blood Group</th>
              <th>Can Receive From</th>
              <th>Can Donate To</th>
              <th>Special Note</th>
            </tr>
          </thead>
          <tbody>
            {ALL_GROUPS.map((g) => (
              <tr key={g}>
                <td>
                  <span className="badge bg-danger">{g}</span>
                </td>
                <td>
                  {BLOOD_DATA[g].receive.map((x) => (
                    <span key={x} className="badge bg-light text-dark me-1">
                      {x}
                    </span>
                  ))}
                </td>
                <td>
                  {BLOOD_DATA[g].donate.map((x) => (
                    <span key={x} className="badge bg-light text-dark me-1">
                      {x}
                    </span>
                  ))}
                </td>
                <td>
  {BLOOD_DATA[g].note && (
    <span
      style={{
        background: "#FEF3C7",
        color: "#92400E",
        padding: "4px 10px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "500"
      }}
    >
      {BLOOD_DATA[g].note}
    </span>
  )}
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* INFO */}
      <div className="alert alert-warning mt-4">
        <strong>Important Information</strong>
        <ul className="mb-0 mt-2">
          <li> O- (O Negative) is the universal donor and can donate to all blood types</li>
          <li>AB+ (AB Positive) is the universal receiver and can receive from all blood types</li>
          <li>Always verify blood type with proper testing before any transfusion</li>
          <li> In emergencies, O- blood is often used as it's compatible with everyone</li>
          <li>Rare blood types (AB-, B-, A-) are always in high demand</li>
        </ul>
      </div>
    </div>
  );
}

