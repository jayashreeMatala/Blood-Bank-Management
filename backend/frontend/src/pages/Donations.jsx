import React, { useState } from "react";
import "./Donations.css";

function Donations() {

  const donors = [
    { id: 1, name: "Rahul Sharma", blood: "B+", screened: false, donations: 0, lastDonation: "First Time" },
    { id: 2, name: "Rahul Sharma", blood: "B-", screened: true, donations: 2, lastDonation: "Feb 18, 2026" },
    { id: 3, name: "Yash", blood: "AB+", screened: true, donations: 1, lastDonation: "Feb 14, 2026" }
  ];

  const [selectedDonor, setSelectedDonor] = useState(null);

  const handleSelect = (e) => {
    const donor = donors.find(d => d.id === Number(e.target.value));
    setSelectedDonor(donor);
  };

  return (
    <div className="donation-page">

      {/* Header */}
      <div className="donation-header">
        <div className="icon-box">🩸</div>
        <div>
          <h2>Blood Donation</h2>
          <p>Complete the donation process</p>
        </div>
      </div>

      {/* Select Donor */}
      <div className="card-box">
        <label className="section-label">Select Donor</label>

        <select className="form-select" onChange={handleSelect}>
          <option value="">Choose donor...</option>
          {donors.map(d => (
            <option key={d.id} value={d.id}>
              {d.name} - {d.blood}
            </option>
          ))}
        </select>

        {selectedDonor && (
          <div className="donor-info-box">

            <div className="row">
              <div className="col">
                <small>Donor Name</small>
                <h6>{selectedDonor.name}</h6>
              </div>

              <div className="col text-end">
                <small>Blood Group</small>
                <h6 className="blood">{selectedDonor.blood}</h6>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col">
                <small>Last Donation</small>
                <div>{selectedDonor.lastDonation}</div>
              </div>

              <div className="col text-end">
                <small>Total Donations</small>
                <div>{selectedDonor.donations}</div>
              </div>
            </div>

            <div className="mt-3">
              <small>Screening Status</small>
              <div>
                {selectedDonor.screened ? (
                  <span className="badge-success">
                    Eligible - Screened on Feb 16, 2026
                  </span>
                ) : (
                  <span className="badge-danger">
                    Not Screened - Complete health screening first
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Not Eligible Box */}
      {selectedDonor && !selectedDonor.screened && (
        <div className="not-eligible-box">
          <div className="warning-icon">!</div>
          <h4>Donor Not Eligible</h4>
          <p>
            This donor must complete health screening and be marked as eligible before donation.
          </p>
          <button className="btn-danger">
            Go to Health Screening
          </button>
        </div>
      )}

    </div>
  );
}

export default Donations;
