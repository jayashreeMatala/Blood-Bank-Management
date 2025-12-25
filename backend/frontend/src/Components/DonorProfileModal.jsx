import React from "react";

function DonorProfileModal({ donor, onClose }) {
  if (!donor) return null;

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.4)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">

          {/* HEADER */}
          <div className="modal-header border-0">
            <h5 className="modal-title fw-bold">Donor Profile</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body px-4">

            {/* TOP CARD */}
            <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-light mb-4">
              <div
                className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center"
                style={{ width: 56, height: 56, fontSize: 22 }}
              >
                {donor.name[0]}
              </div>

              <div>
                <h5 className="mb-1 fw-bold">{donor.name}</h5>
                <span className="badge bg-danger me-2">{donor.blood}</span>
                <span className="badge bg-success">{donor.status}</span>
              </div>
            </div>

            {/* INFO GRID */}
            <div className="row g-3 mb-4">
              <InfoCard label="Phone" value={donor.phone} icon="📞" />
              <InfoCard label="Email" value={donor.email || "-"} icon="✉️" />
              <InfoCard
                label="Location"
                value={`${donor.city}, ${donor.state || ""}`}
                icon="📍"
              />
              <InfoCard label="Date of Birth" value={donor.dob || "-"} icon="📅" />
            </div>

            {/* STATS */}
            <div className="row g-3 mb-4 text-center">
              <StatCard
                title="Total Donations"
                value={donor.donations || 0}
                bg="bg-danger-subtle"
                icon="❤️"
              />
              <StatCard
                title="Last Donation"
                value={donor.lastDonation || "N/A"}
                bg="bg-primary-subtle"
                icon="📆"
              />
              <StatCard
                title="Eligibility"
                value="Eligible"
                bg="bg-success-subtle"
                icon="✅"
              />
            </div>

            {/* HISTORY */}
            <h6 className="fw-bold">Donation History</h6>
            <p className="text-muted text-center mt-3">
              No donation history
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* SMALL COMPONENTS */

function InfoCard({ label, value, icon }) {
  return (
    <div className="col-md-6">
      <div className="p-3 rounded-3 bg-light h-100">
        <small className="text-muted">{label}</small>
        <div className="fw-semibold mt-1">
          {icon} {value}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, bg, icon }) {
  return (
    <div className="col-md-4">
      <div className={`p-3 rounded-3 ${bg}`}>
        <div className="fs-3">{icon}</div>
        <h4 className="fw-bold mb-0">{value}</h4>
        <small className="text-muted">{title}</small>
      </div>
    </div>
  );
}

export default DonorProfileModal;
