import { useState } from "react";
import { useInventory } from "../context/InventoryContext";

function Requests() {
  const { inventory, deductInventory } = useInventory();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [requests, setRequests] = useState([
    {
      id: 1,
      blood: "A+",
      units: 2,
      patient: "David Chen",
      hospital: "Metro General Hospital",
      doctor: "Dr. Smith",
      phone: "+1 555-0300",
      requiredBy: "Feb 10, 2025",
      priority: "Urgent",
      status: "Pending"
    },
    {
      id: 2,
      blood: "O-",
      units: 3,
      patient: "Lisa Martinez",
      hospital: "St. Mary's Medical Center",
      doctor: "Dr. Johnson",
      phone: "+1 555-0301",
      requiredBy: "Feb 8, 2025",
      priority: "Critical",
      status: "Pending"
    }
  ]);

  /* ===== HELPERS ===== */

  const getAvailableUnits = (blood) =>
    inventory.find((i) => i.blood === blood)?.units || 0;

  const approveRequest = (id, blood, units) => {
    const available = getAvailableUnits(blood);

    if (available < units) {
      alert("❌ Not enough blood units available");
      return;
    }

    // reduce inventory
    deductInventory(blood, units);

    // update request status
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Fulfilled" } : r
      )
    );
  };

  const rejectRequest = (id) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Rejected" } : r
      )
    );
  };

  const filteredRequests = requests.filter((r) => {
    const matchFilter =
      filter === "All" || r.status === filter;
    const matchSearch =
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.blood.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <div>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold mb-0">Blood Requests</h2>
          <p className="text-muted">
            Manage blood requests from hospitals
          </p>
        </div>

        <button className="btn btn-danger">
          + New Request
        </button>
      </div>

      {/* FILTERS */}
      <div className="d-flex align-items-center gap-2 mb-4">
        {["All", "Pending", "Approved", "Fulfilled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn btn-sm ${
              filter === f
                ? "btn-light border"
                : "btn-outline-secondary"
            }`}
          >
            {f}
          </button>
        ))}

        <input
          className="form-control ms-auto"
          style={{ maxWidth: "260px" }}
          placeholder="Search requests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* REQUEST CARDS */}
      <div className="row g-4">
        {filteredRequests.map((r) => {
          const available = getAvailableUnits(r.blood);

          return (
            <div className="col-md-6" key={r.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  {/* TOP */}
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <span className="badge bg-danger fs-6">
                      {r.blood}
                      <div className="small">
                        {r.units} units
                      </div>
                    </span>

                    <div>
                      <strong>{r.patient}</strong>
                      <div className="d-flex gap-2 mt-1">
                        <span className="badge bg-warning text-dark">
                          {r.priority}
                        </span>

                        <span
                          className={`badge ${
                            r.status === "Pending"
                              ? "bg-warning text-dark"
                              : r.status === "Fulfilled"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {r.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="text-muted small mb-2">
                    🏥 {r.hospital}
                  </div>
                  <div className="text-muted small mb-2">
                    📞 {r.doctor} · {r.phone}
                  </div>
                  <div className="text-muted small mb-3">
                    📅 Required by: {r.requiredBy}
                  </div>

                  {/* STOCK */}
                  <div
                    className={`alert py-2 small ${
                      available < r.units
                        ? "alert-danger"
                        : "alert-success"
                    }`}
                  >
                    {available < r.units
                      ? `⚠ Only ${available} units available (Insufficient)`
                      : `✓ ${available} units available in stock`}
                  </div>

                  {/* ACTIONS */}
                  {r.status === "Pending" && (
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-success w-100"
                        disabled={available < r.units}
                        onClick={() =>
                          approveRequest(
                            r.id,
                            r.blood,
                            r.units
                          )
                        }
                      >
                        ✓ Approve
                      </button>

                      <button
                        className="btn btn-outline-danger w-100"
                        onClick={() => rejectRequest(r.id)}
                      >
                        ✕ Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredRequests.length === 0 && (
          <div className="text-center text-muted py-5">
            No requests found
          </div>
        )}
      </div>
    </div>
  );
}

export default Requests;
