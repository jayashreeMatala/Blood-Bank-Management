import { useState } from "react";
import { useInventory } from "../context/InventoryContext";

function Requests() {
  const { decreaseStock } = useInventory();

  const [requests, setRequests] = useState([
    {
      id: 1,
      hospital: "City Hospital",
      blood: "O+",
      units: 2,
      status: "Pending"
    },
    {
      id: 2,
      hospital: "Life Care Center",
      blood: "A-",
      units: 1,
      status: "Pending"
    },
    {
      id: 3,
      hospital: "Metro Hospital",
      blood: "AB+",
      units: 3,
      status: "Approved"
    }
  ]);

  const approveRequest = (req) => {
    // 🔴 Inventory minus
    decreaseStock(req.blood, req.units);

    // ✅ Status update
    setRequests((prev) =>
      prev.map((r) =>
        r.id === req.id ? { ...r, status: "Approved" } : r
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

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Blood Requests</h2>

      <div className="alert alert-info">
        Approving a request will automatically reduce inventory stock.
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Hospital</th>
                <th>Blood Group</th>
                <th>Units</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No requests available
                  </td>
                </tr>
              ) : (
                requests.map((r, index) => (
                  <tr key={r.id}>
                    <td>{index + 1}</td>
                    <td>{r.hospital}</td>
                    <td>
                      <span className="badge bg-danger">{r.blood}</span>
                    </td>
                    <td>{r.units}</td>
                    <td>
                      {r.status === "Pending" && (
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      )}
                      {r.status === "Approved" && (
                        <span className="badge bg-success">
                          Approved
                        </span>
                      )}
                      {r.status === "Rejected" && (
                        <span className="badge bg-secondary">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td>
                      {r.status === "Pending" ? (
                        <>
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => approveRequest(r)}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => rejectRequest(r.id)}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-muted">No Action</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Requests;
