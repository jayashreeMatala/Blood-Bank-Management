import { useState } from "react";
import { useTransfers } from "../context/TransferContext";
import NewTransferModal from "../components/NewTransferModal";
import "./Transfers.css";




function Transfers() {
  const { transfers, receiveTransfer } = useTransfers();
  const [search, setSearch] = useState("");
  const [blood, setBlood] = useState("All");
  const [status, setStatus] = useState("All");
  const [showNew, setShowNew] = useState(false);


  const filtered = transfers.filter(t =>
    (blood === "All" || t.blood === blood) &&
    (status === "All" || t.status === status) &&
    (t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.from.toLowerCase().includes(search.toLowerCase()) ||
      t.to.toLowerCase().includes(search.toLowerCase()))
  );

  const initiated = transfers.filter(t => t.status === "Initiated").length;
  const inTransit = transfers.filter(t => t.status === "In Transit").length;
  const outgoing = transfers.filter(t => t.type === "Outgoing")
    .reduce((s, t) => s + t.units, 0);
  const incoming = transfers.filter(t => t.type === "Incoming")
    .reduce((s, t) => s + t.units, 0);

  return (
    <div className="container-fluid p-4 transfers-page">


      {/* HEADER */}
      <div className="d-flex justify-content-between mb-4">
        <div>
          <h3 className="fw-bold">Stock Transfers</h3>
          <p className="text-muted">Transfer blood units between locations</p>
        </div>
        <button className="btn btn-danger btn-sm" style={{ height: "38px" }}
        onClick={() => setShowNew(true)}>
          + New Transfer
        </button>
      </div>

      {/* STATS */}
      <div className="row g-3 mb-4">
        <Stat title="Initiated" value={initiated} />
        <Stat title="In Transit" value={inTransit} />
        <Stat title="Outgoing Units" value={outgoing} />
        <Stat title="Incoming Units" value={incoming} />
      </div>

      {/* FILTER */}
      <div className="card shadow-sm mb-3">
        <div className="card-body d-flex gap-3">
          <input
            className="form-control"
            placeholder="Search by transfer ID or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select className="form-select w-auto" onChange={e => setBlood(e.target.value)}>
            <option value="All">All Blood Groups</option>
            <option>A+</option><option>A-</option>
            <option>B+</option><option>B-</option>
            <option>O+</option><option>O-</option>
            <option>AB+</option><option>AB-</option>
          </select>

          <select className="form-select w-auto" onChange={e => setStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option>Received</option>
            <option>In Transit</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Transfer ID</th>
              <th>Route</th>
              <th>Blood</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td>{t.id}</td>

                <td>
                  🏥 {t.from} → {t.to}
                </td>

                <td>
                  <span className="badge bg-danger">
                    {t.blood} ×{t.units}
                  </span>
                </td>

                <td>
                  <span className={`badge ${
                    t.type === "Outgoing" ? "bg-warning" : "bg-success"
                  }`}>
                    {t.type}
                  </span>
                </td>

                <td>
                  <span className={`badge ${
                    t.status === "Received" ? "bg-success" : "bg-primary"
                  }`}>
                    {t.status}
                  </span>
                </td>

                <td>{t.date}</td>

                <td>
                  {t.status === "In Transit" && (
                    <button
                      className="btn btn-sm text-success"
                      onClick={() => receiveTransfer(t.id)}
                    >
                      ✓ Receive
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
{showNew && (
  <NewTransferModal onClose={() => setShowNew(false)} />
)}
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="col-md-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <small className="text-muted">{title}</small>
          <h3 className="fw-bold">{value}</h3>
        </div>
      </div>
    </div>
  );
}

export default Transfers;
