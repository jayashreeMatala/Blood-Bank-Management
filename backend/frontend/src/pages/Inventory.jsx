function Inventory() {
  const inventory = [
    { blood: "A+", units: 45 },
    { blood: "A-", units: 8 },
    { blood: "B+", units: 32 },
    { blood: "B-", units: 12 },
    { blood: "O+", units: 55 },
    { blood: "O-", units: 6 },
    { blood: "AB+", units: 18 },
    { blood: "AB-", units: 5 }
  ];

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Blood Inventory</h2>

      {/* SUMMARY CARDS */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Total Units</h6>
              <h2>
                {inventory.reduce((sum, item) => sum + item.units, 0)}
              </h2>
              <small className="text-muted">Available in stock</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Blood Groups</h6>
              <h2>{inventory.length}</h2>
              <small className="text-muted">Types available</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>Low Stock Alerts</h6>
              <h2>
                {inventory.filter((i) => i.units < 10).length}
              </h2>
              <small className="text-danger">Below threshold</small>
            </div>
          </div>
        </div>
      </div>

      {/* INVENTORY CARDS */}
      <div className="row">
        {inventory.map((item, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div
              className={`card shadow-sm ${
                item.units < 10 ? "border-danger" : ""
              }`}
            >
              <div className="card-body text-center">
                <h4>{item.blood}</h4>
                <h2>{item.units}</h2>
                <small>Units Available</small>

                {item.units < 10 && (
                  <div className="text-danger mt-2">
                    <small>⚠ Low Stock</small>
                  </div>
                )}

                <div className="mt-3">
                  <div className="progress">
                    <div
                      className={`progress-bar ${
                        item.units < 10 ? "bg-danger" : "bg-success"
                      }`}
                      style={{ width: `${Math.min(item.units * 2, 100)}%` }}
                    ></div>
                  </div>
                  <small className="text-muted">Threshold: 10 units</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory;
