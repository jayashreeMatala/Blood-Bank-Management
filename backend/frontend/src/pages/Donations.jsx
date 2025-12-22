import { useState } from "react";

function Donations() {
  const [donations, setDonations] = useState([
    {
      id: 1,
      donor: "Rahul Sharma",
      blood: "O+",
      units: 1,
      date: "2025-02-10",
      status: "Pending"
    },
    {
      id: 2,
      donor: "Sneha Patil",
      blood: "A+",
      units: 1,
      date: "2025-02-09",
      status: "Approved"
    },
    {
      id: 3,
      donor: "Amit Verma",
      blood: "B-",
      units: 2,
      date: "2025-02-08",
      status: "Rejected"
    }
  ]);

  const approveDonation = (id) => {
    setDonations(
      donations.map((d) =>
        d.id === id ? { ...d, status: "Approved" } : d
      )
    );
  };

  const rejectDonation = (id) => {
    setDonations(
      donations.map((d) =>
        d.id === id ? { ...d, status: "Rejected" } : d
      )
    );
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Donations</h2>

      {/* INFO ALERT */}
      <div className="alert alert-info">
        Review blood donations before approval.
      </div>

      {/* DONATIONS TABLE */}
      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Donor Name</th>
                <th>Blood Group</th>
                <th>Units</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {donations.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No donations found
                  </td>
                </tr>
              ) : (
                donations.map((d, index) => (
                  <tr key={d.id}>
                    <td>{index + 1}</td>
                    <td>{d.donor}</td>
                    <td>
                      <span className="badge bg-danger">
                        {d.blood}
                      </span>
                    </td>
                    <td>{d.units}</td>
                    <td>{d.date}</td>
                    <td>
                      {d.status === "Pending" && (
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      )}
                      {d.status === "Approved" && (
                        <span className="badge bg-success">
                          Approved
                        </span>
                      )}
                      {d.status === "Rejected" && (
                        <span className="badge bg-secondary">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td>
                      {d.status === "Pending" ? (
                        <>
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => approveDonation(d.id)}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => rejectDonation(d.id)}
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

export default Donations;
