import { useState } from "react";
import { useDonors } from "../context/DonorContext";
import DonorProfileModal from "../components/DonorProfileModal";
import RegisterDonorModal from "../components/RegisterDonorModal";


function Donors() {
  const [editDonor, setEditDonor] = useState(null);
  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("All");
  const [status, setStatus] = useState("All");
  const { donors } = useDonors();
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const filteredDonors = donors.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search) ||
      d.email?.toLowerCase().includes(search.toLowerCase());

    const matchesBlood =
      bloodGroup === "All" || d.blood === bloodGroup;

    const matchesStatus =
      status === "All" || d.status === status;

    return matchesSearch && matchesBlood && matchesStatus;
  });


  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold">Donor Management</h3>
          <p className="text-muted">View and manage registered blood donors</p>
          {/* ===== FILTER BAR ===== */}
          <div className="card shadow-sm mb-4">
            <div className="card-body d-flex gap-3 align-items-center">

              {/* SEARCH */}
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, phone, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* BLOOD GROUP */}
              <select
                className="form-select"
                style={{ maxWidth: "180px" }}
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="All">All Blood Groups</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>

              {/* STATUS */}
              <select
                className="form-select"
                style={{ maxWidth: "160px" }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

            </div>
          </div>

        </div>

        <button className="btn btn-danger" onClick={() => setShowRegister(true)}>
          + Register Donor
        </button>
      </div>

      <div className="card shadow-sm">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Donor</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Donations</th>
              <th>Eligibility</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDonors.map((d) => (
              <tr key={d.id}>
                <td>
                  <strong>{d.name}</strong>
                  <div className="text-muted small">{d.phone}</div>
                </td>

                <td>
                  <span className="badge bg-danger">{d.blood}</span>
                </td>

                <td>
                  <span className="badge bg-success">{d.status}</span>
                </td>

                <td>❤️ {d.donations}</td>

                <td>
                  <span className="text-success">✔ Eligible</span>
                </td>

                <td>{d.city}</td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => setSelectedDonor(d)}
                  >
                    👁
                  </button>
                  <button
  className="btn btn-sm btn-outline-secondary"
  onClick={() => setEditDonor(d)}
>
  ✏
</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedDonor && (
        <DonorProfileModal
          donor={selectedDonor}
          onClose={() => setSelectedDonor(null)}
        />
      )}

      {showRegister && (
        <RegisterDonorModal onClose={() => setShowRegister(false)} />
      )}
      {editDonor && (
  <RegisterDonorModal
    donor={editDonor}
    isEdit={true}
    onClose={() => setEditDonor(null)}
  />
)}

    </div>

    
  );
}

export default Donors;
