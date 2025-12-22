import { useState } from "react";

function Transfers() {
  const [transfers, setTransfers] = useState([
    {
      id: 1,
      from: "Central Blood Bank",
      to: "City Hospital",
      blood: "O+",
      units: 2,
      date: "2025-02-11",
      status: "Pending"
    },
    {
      id: 2,
      from: "West Zone Bank",
      to: "Life Care Center",
      blood: "A-",
      units: 1,
      date: "2025-02-10",
      status: "Approved"
    }
  ]);

  const approveTransfer = (id) => {
    setTransfers(
      transfers.map((t) =>
        t.id === id ? { ...t, status: "Approved" } : t
      )
    );
  };

  const rejectTransfer = (id) => {
    setTransfers(
      transfers.map((t) =>
        t.id === id ? { ...t, status: "Rejected" } : t
      )
    );
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Blood Transfers</h2>

      {/* INFO ALERT */}
      <div className="alert alert-info">
        Manage inter-bank and hospital blood transfers.
      </div>

      {/* TRANSFERS TABLE */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>From</th>
                <th>To</th>
                <th>Blood Group</th>
                <th>Units</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {transfers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    No transfers found
                  </td>
                </tr>
              ) : (
                transfers.map((t, index) => (
                  <tr key={t.id}>
                    <td>{index + 1}</td>
                    <td>{t.from}</td>
                    <td>{t.to}</td>
                    <td>
                      <span className="badge bg-danger">
                        {t.blood}
                      </span>
                    </td>
                    <td>{t.units}</td>
                    <td>{t.date}</td>
                    <td>
                      {t.status === "Pending" && (
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      )}
                      {t.status === "Approved" && (
                        <span className="badge bg-success">
                          Approved
                        </span>
                      )}
                      {t.status === "Rejected" && (
                        <span className="badge bg-secondary">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td>
                      {t.status === "Pending" ? (
                        <>
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => approveTransfer(t.id)}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => rejectTransfer(t.id)}
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

export default Transfers;
