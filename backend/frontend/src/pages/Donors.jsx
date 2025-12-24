import { useState } from "react";

function Donors() {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("All Groups");
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [donors, setDonors] = useState([
    {
      id: 1,
      name: "John Smith",
      blood: "O+",
      age: 32,
      gender: "Male",
      phone: "+1 555-0123",
      email: "john.smith@email.com",
      donations: 5,
      lastDonation: "2025-01-15"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      blood: "A+",
      age: 28,
      gender: "Female",
      phone: "+1 555-0124",
      email: "sarah.j@email.com",
      donations: 3,
      lastDonation: "2024-12-20"
    }
  ]);

  const [form, setForm] = useState({
    name: "",
    blood: "",
    age: "",
    gender: "",
    phone: "",
    email: ""
  });

  /* ===== ADD / EDIT SAVE ===== */
  const saveDonor = () => {
    if (!form.name || !form.blood) return;

    if (editIndex !== null) {
      const updated = [...donors];
      updated[editIndex] = { ...updated[editIndex], ...form };
      setDonors(updated);
    } else {
      setDonors([
        { ...form, donations: 0, lastDonation: "Never" },
        ...donors
      ]);
    }

    setForm({
      name: "",
      blood: "",
      age: "",
      gender: "",
      phone: "",
      email: ""
    });
    setEditIndex(null);
    setShowForm(false);
  };

  /* ===== EDIT ===== */
  const handleEdit = (donor, index) => {
    setForm(donor);
    setEditIndex(index);
    setShowForm(true);
  };

  /* ===== DELETE ===== */
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      setDonors(donors.filter((_, i) => i !== index));
    }
  };

  /* ===== ELIGIBILITY ===== */
  const today = new Date();
  const isEligible = (lastDonation) => {
    if (lastDonation === "Never") return true;
    const diff =
      (today - new Date(lastDonation)) / (1000 * 60 * 60 * 24);
    return diff >= 90;
  };

  /* ===== FILTER ===== */
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
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Donors</h2>
        <button
          className="btn btn-danger"
          onClick={() => {
            setShowForm(!showForm);
            setEditIndex(null);
            setForm({
              name: "",
              blood: "",
              age: "",
              gender: "",
              phone: "",
              email: ""
            });
          }}
        >
          + Add Donor
        </button>
      </div>

      {/* ADD / EDIT FORM */}
      {showForm && (
        <div className="card p-3 mb-4">
          <div className="row g-2">
            {["name", "blood", "age", "phone", "email"].map((f, i) => (
              <div className="col-md-4" key={i}>
                <input
                  className="form-control"
                  placeholder={f.toUpperCase()}
                  value={form[f]}
                  onChange={(e) =>
                    setForm({ ...form, [f]: e.target.value })
                  }
                />
              </div>
            ))}

            <div className="col-md-2">
              <select
                className="form-select"
                value={form.gender}
                onChange={(e) =>
                  setForm({ ...form, gender: e.target.value })
                }
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          <button className="btn btn-success mt-3" onClick={saveDonor}>
            {editIndex !== null ? "Update Donor" : "Save Donor"}
          </button>
        </div>
      )}

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

                  <div className="small mb-2">📞 {d.phone}</div>
                  <div className="small mb-3">✉️ {d.email}</div>

                  <div
                    className={`alert ${
                      eligible ? "alert-success" : "alert-warning"
                    } py-2 small mb-3`}
                  >
                    {eligible
                      ? "✔ Eligible to donate"
                      : "⚠ Not eligible yet"}
                    <br />
                    <span className="text-muted">
                      Last donation: {d.lastDonation}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between">
                    <small className="text-muted">
                      ❤️ {d.donations} donations
                    </small>

                    <div className="d-flex gap-3">
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEdit(d, i)}
                      >
                        ✏️
                      </span>

                      <span
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(i)}
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
