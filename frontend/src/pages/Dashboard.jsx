import { useInventory } from "../context/InventoryContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

function Dashboard() {
  // ✅ FIX: inventory → summary
  const { summary } = useInventory();

  // ✅ FIX: empty check
  if (!summary || summary.length === 0) {
    return (
      <div className="text-center mt-5">
        <h4>No inventory data available</h4>
        <p className="text-muted">Please add blood stock</p>
      </div>
    );
  }

  /* ===== CALCULATIONS ===== */
  const totalUnits = summary.reduce((s, i) => s + i.units, 0);
  const lowStock = summary.filter((i) => i.units < 10);

  /* ===== BAR CHART ===== */
  const chartData = {
    labels: summary.map((i) => i.blood),
    datasets: [
      {
        data: summary.map((i) => i.units),
        backgroundColor: summary.map((i) =>
          i.units < 10 ? "#dc3545" : "#28a745"
        ),
        borderRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    animation: { duration: 800, easing: "easeOutQuart" }
  };

  return (
    <div>
      {/* ===== HEADER ===== */}
      <h2 className="fw-bold">Dashboard</h2>
      <p className="text-muted mb-4">Overview of blood bank operations</p>

      {/* ===== TOP STATS ===== */}
      <div className="row g-3 mb-4">
        <TopCard title="Total Donors" value="5" icon="👥" />
        <TopCard title="Blood Units" value={totalUnits} icon="🩸" />
        <TopCard title="Donations" value="4" icon="❤️" />
        <TopCard title="Upcoming Camps" value="3" icon="📅" />
      </div>

      {/* ===== ALERT ===== */}
      <div className="alert alert-warning d-flex gap-3">
        <span className="fs-4">⚠</span>
        <div>
          <strong>Attention Required</strong>
          <div className="small">
            • Low stock: {lowStock.map((i) => i.blood).join(", ")} <br />
            • 2 pending blood request(s)
          </div>
        </div>
      </div>

      {/* ===== INVENTORY CARDS ===== */}
      <h5 className="fw-bold mb-3">Blood Inventory</h5>
      <div className="row g-3 mb-4">
        {summary.map((i, idx) => (
          <div className="col-md-3" key={idx}>
            <div
              className={`card h-100 shadow-sm ${
                i.units < 10 ? "border-danger bg-light" : ""
              }`}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="badge bg-danger">{i.blood}</span>
                  {i.units < 10 && (
                    <span className="badge bg-danger">Low</span>
                  )}
                </div>

                <h3 className="fw-bold">{i.units}</h3>
                <small className="text-muted">Units Available</small>

                <div className="progress mt-2" style={{ height: "6px" }}>
                  <div
                    className={`progress-bar ${
                      i.units < 10 ? "bg-danger" : "bg-success"
                    }`}
                    style={{
                      width: `${Math.min((i.units / 50) * 100, 100)}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== RECENT + CAMPS ===== */}
      <div className="row g-3">
        <RecentDonations />
        <UpcomingCamps />
      </div>

      {/* ===== BAR CHART ===== */}
      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h6 className="text-muted mb-3">Inventory Overview</h6>
          <div style={{ height: "180px" }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* ===== COMPATIBILITY TABLE ===== */}
      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h6 className="fw-bold mb-3">Blood Compatibility</h6>
          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>Group</th>
                <th>Donate To</th>
                <th>Receive From</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>O−</td><td>All</td><td>O−</td></tr>
              <tr><td>O+</td><td>O+, A+, B+, AB+</td><td>O+, O−</td></tr>
              <tr><td>A−</td><td>A−, A+, AB−, AB+</td><td>A−, O−</td></tr>
              <tr><td>A+</td><td>A+, AB+</td><td>A+, A−, O+, O−</td></tr>
              <tr><td>B−</td><td>B−, B+, AB−, AB+</td><td>B−, O−</td></tr>
              <tr><td>B+</td><td>B+, AB+</td><td>B+, B−, O+, O−</td></tr>
              <tr><td>AB−</td><td>AB−, AB+</td><td>AB−, A−, B−, O−</td></tr>
              <tr><td>AB+</td><td>AB+</td><td>All</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ===== SMALL COMPONENTS ===== */

function TopCard({ title, value, icon }) {
  return (
    <div className="col-md-3">
      <div className="card shadow-sm h-100">
        <div className="card-body d-flex justify-content-between">
          <div>
            <small className="text-muted">{title}</small>
            <h3 className="fw-bold">{value}</h3>
          </div>
          <div className="fs-2">{icon}</div>
        </div>
      </div>
    </div>
  );
}

function RecentDonations() {
  return (
    <div className="col-md-6">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h6 className="fw-bold">Recent Donations</h6>
          <DonationRow name="John Smith" blood="O+" />
          <DonationRow name="Sarah Johnson" blood="A+" />
          <DonationRow name="Michael Brown" blood="B−" />
        </div>
      </div>
    </div>
  );
}

function DonationRow({ name, blood }) {
  return (
    <div className="d-flex justify-content-between py-2 border-bottom">
      <strong>{name}</strong>
      <span className="text-muted">{blood}</span>
    </div>
  );
}

function UpcomingCamps() {
  return (
    <div className="col-md-6">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h6 className="fw-bold">Upcoming Camps</h6>
          <div>Mar 5 – Community Center</div>
          <div>Feb 25 – University Campus</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
