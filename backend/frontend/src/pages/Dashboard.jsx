function Dashboard() {
  return (
    <div className="container-fluid">
      <h2 className="mb-4">Dashboard</h2>

      {/* TOP STATS */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Total Donors</h6>
              <h2>5</h2>
              <small className="text-muted">Registered donors</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Blood Units</h6>
              <h2>181</h2>
              <small className="text-muted">Available in stock</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Donations</h6>
              <h2>4</h2>
              <small className="text-warning">2 pending approval</small>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Upcoming Camps</h6>
              <h2>3</h2>
              <small className="text-muted">Scheduled events</small>
            </div>
          </div>
        </div>
      </div>

      {/* ALERT */}
      <div className="alert alert-warning mb-4">
        <strong>Attention Required</strong>
        <ul className="mb-0">
          <li>Low stock alert for: A-, O-, AB-</li>
          <li>2 pending blood requests awaiting approval</li>
        </ul>
      </div>

      {/* BLOOD INVENTORY */}
      <h5 className="mb-3">Blood Inventory</h5>
      <div className="row mb-4">
        {[
          { group: "A+", units: 45 },
          { group: "A-", units: 8 },
          { group: "B+", units: 32 },
          { group: "B-", units: 12 },
          { group: "O+", units: 55 },
          { group: "O-", units: 6 },
          { group: "AB+", units: 18 },
          { group: "AB-", units: 5 }
        ].map((b, i) => (
          <div className="col-md-3 mb-3" key={i}>
            <div className={`card shadow-sm ${b.units < 10 ? "border-danger" : ""}`}>
              <div className="card-body text-center">
                <h5>{b.group}</h5>
                <h3>{b.units}</h3>
                <small>Units Available</small>
                {b.units < 10 && (
                  <div className="text-danger mt-1">
                    <small>Low Stock</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM SECTION */}
      <div className="row">
        {/* RECENT DONATIONS */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Recent Donations</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  John Smith (O+) <span className="badge bg-success">Approved</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  Sarah Johnson (A+) <span className="badge bg-success">Approved</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  Michael Brown (B-) <span className="badge bg-warning">Pending</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* UPCOMING CAMPS */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>Upcoming Camps</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Community Center Camp</strong><br />
                  <small>Mar 5, 2025 • 08:00 - 15:00</small>
                </li>
                <li className="list-group-item">
                  <strong>University Donation Day</strong><br />
                  <small>Feb 25, 2025 • 10:00 - 16:00</small>
                </li>
                <li className="list-group-item">
                  <strong>City Hospital Drive</strong><br />
                  <small>Feb 20, 2025 • 09:00 - 17:00</small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
