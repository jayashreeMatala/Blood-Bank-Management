
import { useInventory } from "../context/InventoryContext";
import { useState } from "react";
import AddStockModal from "../components/AddStockModal";
import EditStockModal from "../components/EditStockModal";



function Inventory() {
  const [showAdd, setShowAdd] = useState(false);
  const [editBatch, setEditBatch] = useState(null);
  const { summary, batches,deleteBatch  } = useInventory();
  const [search, setSearch] = useState("");
  const [blood, setBlood] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredBatches = batches.filter(b =>
    (blood === "All" || b.blood === blood) &&
    (status === "All" || b.status === status) &&
    (b.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container-fluid p-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold">Blood Inventory</h3>
          <p className="text-muted">Manage blood stock with batch tracking and FEFO</p>
        </div>
        <button
          className="btn btn-danger"
          onClick={() => setShowAdd(true)}
        >
          + Add Stock
        </button>

      </div>
{/* SUMMARY CARDS */}
<div className="row g-3 mb-4">
  {summary.map((s) => (
    <div className="col-md-3" key={s.blood}>
      <div
        className={`card shadow-sm h-100 ${
          s.units === 0
            ? "border-danger"
            : s.units < 5
            ? "border-warning"
            : "border-success"
        }`}
        style={{ cursor: "pointer" }}
        onClick={() => setBlood(s.blood)}   // ⭐ यही main logic है
      >
        <div className="card-body text-center">
          <div className="fs-3 mb-1">🩸</div>
          <strong>{s.blood}</strong>
          <h4 className="fw-bold">
            {s.units} <small>units</small>
          </h4>
          <small
            className={
              s.units === 0
                ? "text-danger"
                : s.units < 5
                ? "text-warning"
                : "text-success"
            }
          >
            {s.units === 0
              ? "Critical"
              : s.units < 5
              ? "Low Stock"
              : "Sufficient"}
          </small>
        </div>
      </div>
    </div>
  ))}
</div>


      {/* FILTER BAR */}
      <div className="card shadow-sm mb-3">
        <div className="card-body d-flex gap-3">
          <input
            className="form-control"
            placeholder="Search by batch ID or donor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="form-select w-auto" onChange={e => setBlood(e.target.value)}>
            <option value="All">All Blood Groups</option>
            <option>A+</option><option>A-</option>
            <option>B+</option><option>B-</option>
            <option>O+</option><option>O-</option>
            <option>AB+</option><option>AB-</option>
          </select>
        <select
  className="form-select w-auto"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <option value="All">All Status</option>
  <option value="Collected">Collected</option>
  <option value="Testing">Testing</option>
  <option value="Approved">Approved</option>
  <option value="Stored">Stored</option>
  <option value="Issued">Issued</option>
  <option value="Expired">Expired</option>
  <option value="Discarded">Discarded</option>
</select>

        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Batch ID</th>
              <th>Blood Group</th>
              <th>Units</th>
              <th>Status</th>
              <th>Test Result</th>
              <th>Expiry</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBatches.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td><span className="badge bg-danger">{b.blood}</span></td>
                <td>{b.units}</td>
                <td><span className="badge bg-info">{b.status}</span></td>
                <td>
                  <span className={`badge ${b.test === "Passed" ? "bg-success" : "bg-warning"
                    }`}>
                    {b.test}
                  </span>
                </td>
                <td><span className="text-danger">{b.expiry} · Expired</span></td>
                <td>{b.location}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => setEditBatch(b)}
                  >
                    ✏
                  </button>

                  <button
  className="btn btn-sm btn-outline-danger"
  onClick={() => {
    if (window.confirm("Are you sure you want to delete this batch?")) {
      deleteBatch(b.id);
    }
  }}
>
  🗑
</button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
        {showAdd && (
          <AddStockModal onClose={() => setShowAdd(false)} />
        )}
        {editBatch && (
          <EditStockModal
            batch={editBatch}
            onClose={() => setEditBatch(null)}
          />
        )}


      </div>

    </div>
  );
}

export default Inventory;
