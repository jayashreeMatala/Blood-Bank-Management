import { useState } from "react";
import { useInventory } from "../context/InventoryContext";

function Donations() {
  const { deductInventory } = useInventory();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [donations, setDonations] = useState([
    {
      id: 1,
      name: "John Smith",
      blood: "O+",
      units: 1,
      date: "Jan 15, 2025",
      camp: "-",
      status: "Approved"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      blood: "A+",
      units: 1,
      date: "Dec 20, 2024",
      camp: "-",
      status: "Approved"
    },
    {
      id: 3,
      name: "Michael Brown",
      blood: "B-",
      units: 1,
      date: "Feb 1, 2025",
      camp: "-",
      status: "Pending"
    },
    {
      id: 4,
      name: "Emily Davis",
      blood: "AB+",
      units: 1,
      date: "Feb 5, 2025",
      camp: "-",
      status: "Pending"
    }
  ]);

  /* ===== ACTIONS ===== */

  const approveDonation = (id, blood, units) => {
    deductInventory(blood, -units);

    setDonations((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "Approved" } : d
      )
    );
  };

  const rejectDonation = (id) => {
    setDonations((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "Rejected" } : d
      )
    );
  };

  /* ===== FILTER LOGIC ===== */

  const filteredDonations = donations.filter((d) => {
    const matchesFilter =
      filter === "All" || d.status === filter;

    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.blood.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const countByStatus = (status) =>
    donations.filter((d) => d.status === status).length;

  return (
    <div>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold mb-0">Donations</h2>
          <p className="text-muted">
            Manage blood donations and approvals
          </p>
        </div>

        <button className="btn btn-danger">
          + Record Donation
        </button>
      </div>

      {/* FILTERS */}
      <div className="d-flex align-items-center gap-2 mb-3">
        {["All", "Pending", "Approved", "Rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn btn-sm ${
              filter === f
                ? "btn-light border"
                : "btn-outline-secondary"
            }`}
          >
            {f} (
            {f === "All"
              ? donations.length
              : countByStatus(f)}
            )
          </button>
        ))}

        <input
          className="form-control ms-auto"
          style={{ maxWidth: "260px" }}
          placeholder="Search donations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="card shadow-sm">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Donor</th>
              <th>Date</th>
              <th>Camp</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDonations.map((d) => (
              <tr key={d.id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <span className="badge bg-danger">
                      {d.blood}
                    </span>
                    <div>
                      <strong>{d.name}</strong>
                      <div className="text-muted small">
                        {d.units} unit(s)
                      </div>
                    </div>
                  </div>
                </td>

                <td>{d.date}</td>
                <td>{d.camp}</td>

                <td>
                  <span
                    className={`badge ${
                      d.status === "Approved"
                        ? "bg-success"
                        : d.status === "Pending"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {d.status}
                  </span>
                </td>

                <td className="text-center">
                  {d.status === "Pending" && (
                    <>
                      <button
                        className="btn btn-sm text-success me-2"
                        onClick={() =>
                          approveDonation(
                            d.id,
                            d.blood,
                            d.units
                          )
                        }
                      >
                        ✓
                      </button>
                      <button
                        className="btn btn-sm text-danger"
                        onClick={() =>
                          rejectDonation(d.id)
                        }
                      >
                        ✕
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {filteredDonations.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-muted py-4"
                >
                  No donations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Donations;
