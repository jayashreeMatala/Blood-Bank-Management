import { useInventory } from "../context/InventoryContext";

function Inventory() {
  const { inventory } = useInventory();

  const totalUnits = inventory.reduce((s, i) => s + i.units, 0);
  const lowStockCount = inventory.filter((i) => i.units < 10).length;

  return (
    <div>
      {/* PAGE HEADER */}
      <h2 className="fw-bold">Blood Inventory</h2>
      <p className="text-muted mb-4">
        Manage blood stock levels across all blood groups
      </p>

      {/* TOP SUMMARY CARDS */}
      <div className="row g-3 mb-4">
        <SummaryCard title="Total Units" value={totalUnits} icon="📦" />
        <SummaryCard title="Blood Groups" value="8" icon="🧬" />
        <SummaryCard
          title="Low Stock Alerts"
          value={lowStockCount}
          icon="⚠"
          warning
        />
      </div>

      {/* INVENTORY CARDS */}
      <div className="row g-4">
        {inventory.map((i, idx) => {
          const isLow = i.units < 10;

          return (
            <div className="col-md-3" key={idx}>
              <div
                className={`card h-100 shadow-sm ${
                  isLow ? "border-danger bg-light" : ""
                }`}
              >
                <div className="card-body">

                  {/* HEADER */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-danger fs-6">{i.blood}</span>
                    {isLow && (
                      <span className="badge bg-danger-subtle text-danger">
                        Low
                      </span>
                    )}
                  </div>

                  {/* UNITS */}
                  <h3 className="fw-bold mb-1">{i.units}</h3>
                  <small className="text-muted">Units Available</small>

                  {/* PROGRESS */}
                  <div className="progress mt-3" style={{ height: "6px" }}>
                    <div
                      className={`progress-bar ${
                        isLow ? "bg-danger" : "bg-success"
                      }`}
                      style={{
                        width: `${Math.min((i.units / 50) * 100, 100)}%`
                      }}
                    />
                  </div>

                  {/* THRESHOLD */}
                  <small className="text-muted d-block mt-2">
                    Threshold: 10 units
                  </small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ===== SMALL SUMMARY CARD ===== */

function SummaryCard({ title, value, icon, warning }) {
  return (
    <div className="col-md-4">
      <div
        className={`card shadow-sm ${
          warning ? "bg-warning bg-opacity-25" : ""
        }`}
      >
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">{title}</small>
            <h3 className="fw-bold mb-0">{value}</h3>
          </div>
          <div className="fs-2">{icon}</div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
