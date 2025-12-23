import { useState } from "react";
import { useInventory } from "../context/InventoryContext";

function Transfers() {
  const { addInventory, deductInventory } = useInventory();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [records, setRecords] = useState([
    {
      id: 1,
      type: "Receive",
      blood: "A+",
      units: 10,
      source: "From: Regional Blood Center",
      date: "Feb 1, 2025",
      status: "Completed"
    },
    {
      id: 2,
      type: "Transfer",
      blood: "O-",
      units: 5,
      source: "To: Emergency Hospital",
      date: "Feb 3, 2025",
      status: "Completed"
    }
  ]);

  /* ===== FILTER ===== */
  const filtered = records.filter((r) => {
    const matchFilter =
      filter === "All" || r.type === filter;
    const matchSearch =
      r.blood.toLowerCase().includes(search.toLowerCase()) ||
      r.source.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  /* ===== ACTIONS ===== */
  const receiveBlood = () => {
    addInventory("A+", 5);

    setRecords([
      {
        id: Date.now(),
        type: "Receive",
        blood: "A+",
        units: 5,
        source: "From: City Blood Bank",
        date: "Feb 10, 2025",
        status: "Completed"
      },
      ...records
    ]);
  };

  const transferBlood = () => {
    deductInventory("O+", 3);

    setRecords([
      {
        id: Date.now(),
        type: "Transfer",
        blood: "O+",
        units: 3,
        source: "To: District Hospital",
        date: "Feb 10, 2025",
        status: "Completed"
      },
      ...records
    ]);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold mb-0">Blood Transfers</h2>
          <p className="text-muted">
            Record blood receive and transfer operations
          </p>
        </div>

        <button className="btn btn-danger px-4">
          + Record Transfer
        </button>
      </div>

      {/* RECEIVE / TRANSFER CARDS */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div
            className="p-4 rounded text-white"
            style={{
              background:
                "linear-gradient(135deg,#1abc9c,#16a085)",
              cursor: "pointer"
            }}
            onClick={receiveBlood}
          >
            <h5 className="fw-bold mb-1">⬇ Receive Blood</h5>
            <small>Add new units to inventory</small>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className="p-4 rounded text-white"
            style={{
              background:
                "linear-gradient(135deg,#4e73df,#224abe)",
              cursor: "pointer"
            }}
            onClick={transferBlood}
          >
            <h5 className="fw-bold mb-1">⬆ Transfer Blood</h5>
            <small>Send units to another location</small>
          </div>
        </div>
      </div>

      {/* FILTER + SEARCH */}
      <div className="d-flex align-items-center gap-2 mb-3">
        {["All", "Receive", "Transfer"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn btn-sm ${
              filter === f
                ? "btn-light border fw-semibold"
                : "btn-outline-secondary"
            }`}
          >
            {f}
          </button>
        ))}

        <input
          className="form-control ms-auto"
          style={{ maxWidth: "260px" }}
          placeholder="Search transfers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="card shadow-sm">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Type</th>
              <th>Blood Group</th>
              <th>Units</th>
              <th>Source / Destination</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>
                  <span
                    className={`badge ${
                      r.type === "Receive"
                        ? "bg-success"
                        : "bg-primary"
                    }`}
                  >
                    {r.type === "Receive" ? "⬇ Receive" : "⬆ Transfer"}
                  </span>
                </td>

                <td>
                  <span className="badge bg-danger">
                    {r.blood}
                  </span>
                </td>

                <td>{r.units}</td>
                <td>{r.source}</td>
                <td>{r.date}</td>
                <td>
                  <span className="badge bg-success">
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-muted py-4"
                >
                  No transfers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transfers;
