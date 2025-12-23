import { useState } from "react";

function Donors() {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("All Groups");

  const donors = [
    {
      name: "John Smith",
      blood: "O+",
      age: 32,
      gender: "Male",
      phone: "+1 555-0123",
      email: "john.smith@email.com",
      donations: 5,
      lastDonation: "2025-01-15",
      status: "Active"
    },
    {
      name: "Sarah Johnson",
      blood: "A+",
      age: 28,
      gender: "Female",
      phone: "+1 555-0124",
      email: "sarah.j@email.com",
      donations: 3,
      lastDonation: "2024-12-20",
      status: "Active"
    },
    {
      name: "Michael Brown",
      blood: "B-",
      age: 45,
      gender: "Male",
      phone: "+1 555-0125",
      email: "m.brown@email.com",
      donations: 12,
      lastDonation: "2025-02-01",
      status: "Active"
    },
    {
      name: "Emily Davis",
      blood: "AB+",
      age: 35,
      gender: "Female",
      phone: "+1 555-0126",
      email: "emily.d@email.com",
      donations: 7,
      lastDonation: "2025-02-05",
      status: "Active"
    },
    {
      name: "Robert Wilson",
      blood: "O-",
      age: 50,
      gender: "Male",
      phone: "+1 555-0127",
      email: "r.wilson@email.com",
      donations: 20,
      lastDonation: "2024-11-15",
      status: "Active"
    }
  ];

  /* ===== PRO LOGIC ===== */

  const today = new Date();

  const isEligible = (lastDonation) => {
    const diff =
      (today - new Date(lastDonation)) / (1000 * 60 * 60 * 24);
    return diff >= 90;
  };

  const filteredDonors = donors.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search) ||
      d.email.toLowerCase().includes(search.toLowerCase());

    const matchesGroup =
      group === "All Groups" || d.blood === group;

    return matchesSearch && matchesGroup;
  });

  return (
    <div>
      <h2 className="fw-bold mb-3">Donors</h2>

      {/* SEARCH + FILTER */}
      <div className="d-flex gap-3 mb-4">
        <input
          className="form-control"
          placeholder="Search by name, phone, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select"
          style={{ maxWidth: "180px" }}
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          <option>All Groups</option>
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

      {/* DONOR CARDS */}
      <div className="row g-4">
        {filteredDonors.map((d, i) => {
          const eligible = isEligible(d.lastDonation);

          return (
            <div className="col-md-4" key={i}>
              <div className="card shadow-sm h-100">
                <div className="card-body">

                  {/* HEADER */}
                  <div className="d-flex justify-content-between mb-2">
                    <div className="d-flex gap-2 align-items-center">
                      <span className="badge bg-danger fs-6">{d.blood}</span>
                      <strong>{d.name}</strong>
                    </div>
                    <span
                      className={`badge ${
                        eligible ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {eligible ? "Active" : "Blocked"}
                    </span>
                  </div>

                  <div className="text-muted small mb-2">
                    {d.age} yrs • {d.gender}
                  </div>

                  {/* CONTACT */}
                  <div className="small mb-2">📞 {d.phone}</div>
                  <div className="small mb-3">✉️ {d.email}</div>

                  {/* ELIGIBILITY */}
                  <div
                    className={`alert ${
                      eligible ? "alert-success" : "alert-warning"
                    } py-2 small mb-3`}
                  >
                    {eligible ? "✔ Eligible to donate" : "⚠ Not eligible yet"}
                    <br />
                    <span className="text-muted">
                      Last donation: {d.lastDonation}
                    </span>
                  </div>

                  {/* FOOTER */}
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      ❤️ {d.donations} donations
                    </small>

                    <div className="d-flex gap-3">
                      <span style={{ cursor: "pointer" }}>✏️</span>
                      <span
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                      >
                        🗑
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Donors;
