import { useState } from "react";
import {
  FaHeart,
  FaTint,
  FaUsers,
  FaChartLine,
  FaAward,
} from "react-icons/fa";

/* ===============================
   CERTIFICATE MODAL
================================ */
function CertificateModal({ donor, onClose }) {
  if (!donor) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content p-4 text-center">
          <h4 className="fw-bold mb-3">Certificate of Appreciation</h4>
          <p className="text-muted">Blood Bank Management System</p>

          <h2 className="text-danger mt-3">{donor.name}</h2>
          <p className="mt-2">has generously donated</p>

          <div className="d-flex justify-content-center gap-3 my-3">
            <div className="border rounded p-3">
              <strong>{donor.units}</strong>
              <div className="text-muted">Units of Blood</div>
            </div>
            <div className="border rounded p-3">
              <strong>{donor.blood}</strong>
              <div className="text-muted">Blood Type</div>
            </div>
          </div>

          <p className="mt-3">January 15, 2025</p>

          <div className="d-flex justify-content-between mt-4">
            <span>Medical Director</span>
            <span>Administrator</span>
          </div>

          <div className="mt-4">
            <button className="btn btn-secondary me-2" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-danger">Download PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===============================
   MAIN COMPONENT
================================ */
function Achievements() {
  const [selectedDonor, setSelectedDonor] = useState(null);

  /* 🔹 DUMMY DATA */
  const donors = [
    { id: 1, name: "Amit Kumar", blood: "B+", city: "Bangalore", donations: 5, units: 1 },
    { id: 2, name: "Rahul Sharma", blood: "A+", city: "Mumbai", donations: 0, units: 0 },
    { id: 3, name: "Rahul Sharma", blood: "A+", city: "Mumbai", donations: 0, units: 0 },
    { id: 4, name: "Vikram Singh", blood: "O+", city: "Chennai", donations: 0, units: 0 },
    { id: 5, name: "Sneha Reddy", blood: "AB+", city: "Hyderabad", donations: 0, units: 0 },
    { id: 6, name: "Priya Patel", blood: "O+", city: "Delhi", donations: 0, units: 0 },
  ];

  /* 🔹 STATS */
  const totalUnits = donors.reduce((s, d) => s + d.units, 0);
  const activeDonors = donors.filter((d) => d.donations > 0).length;

  /* 🔹 BADGE LOGIC */
  const getBadge = (donations) => {
    if (donations >= 50) return "Platinum Hero";
    if (donations >= 20) return "Gold Hero";
    if (donations >= 10) return "Silver Hero";
    if (donations >= 5) return "Bronze Hero";
    return null;
  };

  return (
    <div className="container-fluid p-4">
      {/* HEADER */}
      <div className="mb-4">
        <h3 className="fw-bold">Donor Impact & Achievements</h3>
        <p className="text-muted">Celebrating heroes who save lives</p>
      </div>

      {/* TOP STATS */}
      <div className="row g-3 mb-4">
        <StatCard icon={<FaHeart />} title="Lives Saved" value="15+" bg="danger" />
        <StatCard icon={<FaTint />} title="Total Units Donated" value={totalUnits} bg="primary" />
        <StatCard icon={<FaUsers />} title="Active Donors" value={activeDonors} bg="secondary" />
        <StatCard icon={<FaChartLine />} title="Donations This Year" value="0" bg="success" />
      </div>

      {/* HALL OF FAME */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">
            <FaAward className="text-warning me-2" />
            Top Donors Hall of Fame
          </h5>

          {donors.map((d, i) => (
            <div
              key={d.id}
              className="d-flex justify-content-between align-items-center border-bottom py-3"
            >
              <div className="d-flex align-items-center gap-3">
                <span className="badge bg-warning rounded-pill">{i + 1}</span>

                <div>
                  <div className="fw-bold">{d.name}</div>
                  <small className="text-muted">
                    {d.blood} • {d.city}
                  </small>
                </div>

                {getBadge(d.donations) && (
                  <span className="badge bg-danger">
                    🩸 {getBadge(d.donations)}
                  </span>
                )}
              </div>

              <div className="text-end">
                <small className="text-muted">Donations</small>
                <div className="fw-bold text-danger">{d.donations}</div>
                <div className="text-primary">{d.units} Units</div>
              </div>

              {/* CERTIFICATE ONLY FOR 5+ DONATIONS */}
              {d.donations >= 5 && (
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setSelectedDonor(d)}
                >
                  🎓 Certificate
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* BADGES */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="fw-bold mb-3">⭐ Achievement Badges</h5>
          <div className="row g-3">
            <BadgeCard title="Bronze Hero" subtitle="5+ Donations" />
            <BadgeCard title="Silver Hero" subtitle="10+ Donations" />
            <BadgeCard title="Gold Hero" subtitle="20+ Donations" />
            <BadgeCard title="Platinum Hero" subtitle="50+ Donations" />
          </div>
        </div>
      </div>

      {/* CERTIFICATE MODAL */}
      {selectedDonor && (
        <CertificateModal
          donor={selectedDonor}
          onClose={() => setSelectedDonor(null)}
        />
      )}
    </div>
  );
}

/* ===============================
   SMALL COMPONENTS
================================ */
function StatCard({ icon, title, value, bg }) {
  return (
    <div className="col-md-3">
      <div className={`card text-white bg-${bg} shadow-sm`}>
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <small>{title}</small>
            <h3 className="fw-bold">{value}</h3>
          </div>
          <div style={{ fontSize: "28px" }}>{icon}</div>
        </div>
      </div>
    </div>
  );
}

function BadgeCard({ title, subtitle }) {
  return (
    <div className="col-md-3">
      <div className="card text-center shadow-sm">
        <div className="card-body">
          <h6 className="fw-bold">{title}</h6>
          <small className="text-muted">{subtitle}</small>
        </div>
      </div>
    </div>
  );
}

export default Achievements;
