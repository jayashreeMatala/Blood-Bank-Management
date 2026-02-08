import { useState } from "react";
import { useRequests } from "../context/RequestContext";
import NewRequestModal from "../components/NewRequestModal";


function Requests() {
  const { requests, approveRequest, rejectRequest, markFulfilled } = useRequests();

  const [showNew, setShowNew] = useState(false);
  const [search, setSearch] = useState("");
  const [blood, setBlood] = useState("All");
  const [status, setStatus] = useState("All");


  const filtered = requests.filter(r =>
    (blood === "All" || r.blood === blood) &&
    (status === "All" || r.status === status) &&
    (
      r.hospital.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
    )
  );

  const total = requests.length;
  const pending = requests.filter(r => r.status === "Pending").length;
  const emergency = requests.filter(r => r.priority === "Emergency").length;
  const fulfilled = requests.filter(r => r.status === "Fulfilled").length;

  return (
    <div className="container-fluid p-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between mb-4">
        <div>
          <h3 className="fw-bold">Blood Requests</h3>
          <p className="text-muted">
            Manage incoming blood requests from hospitals
          </p>
        </div>

        <button
          className="btn btn-danger btn-sm"
          style={{ height: "38px" }}
          onClick={() => setShowNew(true)}
        >
          + New Request
        </button>


      </div>

      {/* STATS */}
      <div className="row g-3 mb-4">
        <Stat title="Total Requests" value={total} />
        <Stat title="Pending" value={pending} color="warning" />
        <Stat title="Emergency" value={emergency} color="danger" />
        <Stat title="Fulfilled" value={fulfilled} color="success" />
      </div>

      {/* FILTER BAR */}
      <div className="card shadow-sm mb-3">
        <div className="card-body d-flex gap-3">
          <input
            className="form-control"
            placeholder="Search by hospital, patient, or request ID..."
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
            <option>Pending</option>
            <option>Approved</option>
            <option>Fulfilled</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="card shadow-sm">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Request ID</th>
              <th>Hospital</th>
              <th>Blood</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Required Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>

                <td>
                  <strong>{r.hospital}</strong>
                  <div className="small text-muted">{r.doctor}</div>
                </td>

                <td>
                  <span className="badge bg-danger">
                    {r.blood} ×{r.units}
                  </span>
                </td>

                <td>
                  <span className={`badge ${r.priority === "Emergency"
                    ? "bg-danger"
                    : r.priority === "Urgent"
                      ? "bg-warning"
                      : "bg-secondary"
                    }`}>
                    {r.priority}
                  </span>
                </td>

                <td>
                  <span className={`badge ${r.status === "Approved"
                    ? "bg-success"
                    : r.status === "Pending"
                      ? "bg-warning text-dark"
                      : "bg-info"
                    }`}>
                    {r.status}
                  </span>
                </td>

                <td>{r.date}</td>

                <td>
                  {r.status === "Pending" && (
                    <>
                      <button
                        className="btn btn-sm text-success me-2"
                        onClick={() => approveRequest(r.id)}
                      >
                        ✓ Approve
                      </button>

                      <button
                        className="btn btn-sm text-danger"
                        onClick={() => rejectRequest(r.id)}
                      >
                        ✕ Reject
                      </button>
                    </>
                  )}

                  {r.status === "Approved" && (
                    <button
                      className="btn btn-sm text-primary"
                      onClick={() => markFulfilled(r.id)}
                    >
                      ✔ Mark Fulfilled
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showNew && (
        <NewRequestModal onClose={() => setShowNew(false)} />
      )}

    </div>
  );
}

function Stat({ title, value, color }) {
  return (
    <div className="col-md-3">
      <div className={`card shadow-sm border-${color || "light"}`}>
        <div className="card-body">
          <small className="text-muted">{title}</small>
          <h3 className={`fw-bold text-${color || "dark"}`}>{value}</h3>

        </div>
      </div>

    </div>
  );
}

export default Requests;
