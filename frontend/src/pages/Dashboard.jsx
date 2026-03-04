import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "./Dashboard.css";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend
);

function Dashboard() {
 const [summary, setSummary] = useState([]);
 const [stats, setStats] = useState({});
 const [emergency, setEmergency] = useState(null);
 const [activity, setActivity] = useState([]);
 const [alerts, setAlerts] = useState({});
useEffect(() => {
  
  fetchActivity();
  fetchInventory();
  fetchStats();
  fetchEmergency();
    fetchAlerts();
  
  

  const interval = setInterval(() => {
    fetchEmergency();
  }, 10000); // 10 sec refresh

  return () => clearInterval(interval);

}, []);

const fetchInventory = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/inventory/summary");
    setSummary(res.data);
  } catch (err) {
    console.error("Error fetching inventory:", err);
  }
};
const fetchStats = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/dashboard/stats");
    setStats(res.data);
  } catch (err) {
    console.error("Error fetching stats:", err);
  }
};
const fetchEmergency = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/dashboard/emergency");

    console.log("Emergency API Response:", res.data);  // ⭐ ye add karo

    setEmergency(res.data);
  } catch (err) {
    console.error("Error fetching emergency:", err);
  }
};
const fetchActivity = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/dashboard/activity");
    setActivity(res.data);
  } catch (err) {
    console.error(err);
  }
};
const fetchAlerts = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/dashboard/alerts");
    setAlerts(res.data);
  } catch (err) {
    console.error("Error fetching alerts:", err);
  }
};
  if (!summary || summary.length === 0) {
    return (
      <div className="text-center mt-5">
        <h4>No inventory data available</h4>
        <p className="text-muted">Please add blood stock</p>
      </div>
    );
  }

  const totalUnits = summary.reduce((s, i) => s + i.units, 0);
  const lowStock = summary.filter((i) => i.units < 10);

  const chartData = {
    labels: summary.map((i) => i.blood),
    datasets: [
      {
        data: summary.map((i) => i.units),
       backgroundColor: summary.map((i) => {
  if(i.units === 0) return "#6b7280";
  if(i.units <= 3) return "#dc3545";
  if(i.units <= 7) return "#f59e0b";
  return "#10b981";
}),
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

const monthlyData = {
labels: ["Oct","Nov","Dec","Jan","Feb","Mar"],
datasets: [
{
label: "Donations",
data: [
stats?.totalDonations || 0,
stats?.totalDonations || 0,
stats?.totalDonations || 0,
stats?.totalDonations || 0,
stats?.totalDonations || 0,
stats?.totalDonations || 0
],
borderColor:"#dc3545",
backgroundColor:"#dc3545",
tension:0.4
},
{
label:"Requests",
data:[
stats?.pendingRequests || 0,
stats?.pendingRequests || 0,
stats?.pendingRequests || 0,
stats?.pendingRequests || 0,
stats?.pendingRequests || 0,
stats?.pendingRequests || 0
],
borderColor:"#3b82f6",
backgroundColor:"#3b82f6",
tension:0.4
}
]
};
  const monthlyOptions = {
responsive: true,
maintainAspectRatio: false,
plugins: {
legend: {
position: "bottom",
labels: {
usePointStyle: true
}
}
},
scales: {
y: {
beginAtZero: true,
ticks: {
stepSize: 1
}
}
},
tension: 0.4
};

  const stockDistribution = {
    labels: ["Critical (1-3)", "Out of Stock (0)"],
    datasets: [
      {
        data: [
          summary.filter(i => i.units > 0 && i.units <= 3).length,
          summary.filter(i => i.units === 0).length
        ],
        backgroundColor: ["#10b981", "#f59e0b"],
        borderWidth: 0
      }
    ]
  };


  const doughnutOptions = {
responsive: true,
maintainAspectRatio: false,
plugins: {
legend: {
position: "bottom"
}
}
};
  return (
    <div>
      <h2 className="fw-bold">Dashboard</h2>
      <p className="text-muted mb-4">Overview of blood bank operations</p>
    {emergency && (
<div className="emergency-banner">

  <div className="emergency-left">
    <div className="emergency-icon">🚨</div>

    <div>
      <h5>Emergency Blood Requests</h5>
      <p>
        1 critical request require immediate action. Patient lives depend on your response.
      </p>

      <span className="emergency-tag">
        {emergency.blood} • {emergency.hospital} • {emergency.units} units
      </span>
    </div>
  </div>

  <button className="respond-btn">
    Respond Now →
  </button>

</div>
)}

      <div className="row g-3 mb-4">
        <TopCard title="Total Donors" value={stats?.totalDonors || 0} icon="👥" />
        <TopCard title="Blood Units" value={totalUnits} icon="🩸" />
        <TopCard title="Donations" value={stats?.totalDonations || 0} icon="❤️" />
        <TopCard title="Upcoming Camps" value="3" icon="📅" />
      </div>

      <div className="alert alert-warning d-flex gap-3">
        <span className="fs-4">⚠</span>
        <div>
          <strong>Attention Required</strong>
          <div className="small">
            • Low stock: {lowStock.map((i) => i.blood).join(", ")} <br />
            • {stats?.pendingRequests || 0} pending blood request(s)
          </div>
        </div>
      </div>

      <h5 className="fw-bold mb-3 d-flex justify-content-between">
        Blood Inventory
        <span className="view-all">View All →</span>
      </h5>

      <div className="inventory-wrapper">
        {summary.map((i, idx) => {
          let statusClass = "critical";
          if (i.units > 5) statusClass = "sufficient";
          else if (i.units > 0 && i.units <= 5) statusClass = "low";

          return (
            <div key={idx} className={`inventory-card ${statusClass}`}>
              <div className="icon-box">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C12 2 5 9 5 14a7 7 0 0014 0c0-5-7-12-7-12z" />
                </svg>
              </div>

              <h5 className="blood-type">{i.blood}</h5>

              <div className="units">
                <span className="unit-number">{i.units}</span>
                <span className="unit-text">units</span>
              </div>

              <div className="status">
                ● {statusClass === "critical"
                  ? "Critical"
                  : statusClass === "low"
                  ? "Low Stock"
                  : "Sufficient"}
              </div>
            </div>
          );
        })}
      </div>

   <div className="row g-4 mt-4">

{/* Monthly Activity Trend */}
<div className="col-md-8">
  <div className="chart-card p-3">

    <div className="chart-header">
      <div className="chart-icon">📉</div>

      <div>
        <h6 className="fw-bold mb-0">Monthly Activity Trend</h6>
        <small className="text-muted">
          Donations vs Requests — Last 6 months
        </small>
      </div>
    </div>

    <div style={{ height: "250px", marginTop: "10px" }}>
     <Line data={monthlyData} options={monthlyOptions} />
    </div>

  </div>
</div>


{/* Stock Distribution */}
<div className="col-md-4">
  <div className="chart-card p-3">

    <div className="chart-header">
      <div className="chart-icon">🩸</div>

      <div>
        <h6 className="fw-bold mb-0">Stock Distribution</h6>
        <small className="text-muted">
          Blood group health status
        </small>
      </div>
    </div>

    <div style={{ height: "250px", marginTop: "10px" }}>
      <Doughnut data={stockDistribution} options={doughnutOptions} />
    </div>

  </div>
</div>

</div>

    <div className="row g-4 mt-4">

  {/* Blood Group Availability Chart */}
  <div className="col-md-8">
    <div className="chart-card p-3">

      <div className="chart-header">
        <div className="chart-icon">📊</div>
        <div>
          <h6 className="fw-bold mb-0">Blood Group Availability Chart</h6>
          <small className="text-muted">
            Available units by blood type
          </small>
        </div>
      </div>

      <div style={{ height: "250px", marginTop: "10px" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>

    </div>
  </div>

  
{/* Alerts Panel */}
<div className="col-md-4">
  <div className="chart-card p-3">

    <div className="chart-header">
      <div className="chart-icon">🔔</div>
      <div>
        <h6 className="fw-bold mb-0">Alerts Panel</h6>
        <small className="text-muted">
          Requires your attention
        </small>
      </div>
    </div>

    <div className="alerts-wrapper mt-3">

     

      {alerts.outOfStock && alerts.outOfStock.length > 0 && (
        <AlertBox
          title={`Out of Stock: ${alerts.outOfStock.map(a => a.bloodGroup).join(", ")}`}
          subtitle="Zero units available"
          type="danger-light"
        />
      )}

      {alerts.critical && alerts.critical.length > 0 && (
        <AlertBox
          title={`Critical Low: ${alerts.critical.map(a => a.bloodGroup).join(", ")}`}
          subtitle="1–3 units remaining"
          type="warning"
        />
      )}

      {alerts.expiring && alerts.expiring.length > 0 && (
        <AlertBox
          title={`${alerts.expiring.length} Units Expiring Soon`}
          subtitle="Within next 7 days"
          type="yellow"
        />
      )}

    </div>

  </div>
</div>

</div>
<div className="row g-4 mt-4">

  {/* Inventory Status */}
  <div className="col-md-6">
    <div className="chart-card p-3">

      <div className="chart-header">
        <div className="chart-icon">📦</div>
        <div>
          <h6 className="fw-bold mb-0">Inventory Status</h6>
          <small className="text-muted">Overview of blood bags</small>
        </div>
        <span className="ms-auto text-primary small">View All →</span>
      </div>

      <div className="inventory-stats mt-3">

        <div className="status-card available">
          <small>AVAILABLE</small>
          <h2>{totalUnits}</h2>
          <span>Blood Bags</span>
        </div>

        <div className="status-card reserved">
          <small>RESERVED</small>
     <h2>{summary.reduce((s,i)=>s+(i.reservedUnits||0),0)}</h2>
          <span>Blood Bags</span>
        </div>

        <div className="status-card issued">
          <small>ISSUED</small>
          <h2>{summary.filter(i => i.status === "Issued").length}</h2>
          <span>Blood Bags</span>
        </div>

        <div className="status-card expired">
          <small>EXPIRED</small>
          <h2>{summary.filter(i=>new Date(i.expiryDate)<new Date()).length}</h2>
          <span>Blood Bags</span>
        </div>

      </div>

    </div>
  </div>

  {/* Performance Metrics */}
  <div className="col-md-6">
    <div className="chart-card p-3">

      <div className="chart-header">
        <div className="chart-icon">📈</div>
        <div>
          <h6 className="fw-bold mb-0">Performance Metrics</h6>
          <small className="text-muted">System health overview</small>
        </div>
      </div>

      <div className="metrics mt-4">

        <div className="metric-item">
          <div className="d-flex justify-content-between">
            <span>Request Fulfillment Rate</span>
            <strong>33%</strong>
          </div>
          <div className="progress">
            <div className="progress-bar bg-danger" style={{width:"33%"}}></div>
          </div>
        </div>

        <div className="metric-item">
          <div className="d-flex justify-content-between">
            <span>Active Donors</span>
            <strong>5 / 5</strong>
          </div>
          <div className="progress">
            <div className="progress-bar bg-primary" style={{width:"100%"}}></div>
          </div>
        </div>

        <div className="metric-item">
          <div className="d-flex justify-content-between">
           <span>Blood Utilization Rate</span>
<strong>60%</strong>
          </div>
          <div className="progress">
            <div className="progress-bar bg-secondary" style={{width:"0%"}}></div>
          </div>
        </div>

        <div className="metric-item">
          <div className="d-flex justify-content-between">
            <span>Stock Availability</span>
            <strong>0 / 8 Safe</strong>
          </div>
          <div className="progress">
            <div className="progress-bar bg-dark" style={{width:"0%"}}></div>
          </div>
        </div>

      </div>

    </div>
  </div>

</div>
<div className="row g-4 mt-4">

  <div className="col-12">
    <div className="chart-card p-3">

      <div className="chart-header">
        <div className="chart-icon">📡</div>
        <div>
          <h6 className="fw-bold mb-0">Recent Activity Feed</h6>
          <small className="text-muted">Latest system activities</small>
        </div>

        <span className="ms-auto text-primary small">View All →</span>
      </div>

  <div className="activity-list mt-3">

{activity.length === 0 && (
  <p className="text-muted">No recent activity</p>
)}

{activity.map((a, i) => (

<div key={i} className="activity-item">

<div className={`activity-icon ${a.status === "Fulfilled" ? "success" : "pending"}`}>
  {a.status === "Fulfilled" ? "✔" : "⏱"}
</div>

<div className="activity-text">
<strong>
Request {a.status} – {a.hospital} – {a.units} units {a.blood}
</strong>

<div className="small text-muted">
{new Date(a.createdAt).toLocaleDateString()}
</div>

</div>

<div className={`activity-status ${a.status === "Fulfilled" ? "success-dot" : "pending-dot"}`}></div>

</div>

))}

</div>

    </div>
  </div>

</div>
</div>

  );
}

/* SMALL COMPONENTS */

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

function AlertBox({ title, subtitle, type }) {
  return (
    <div className={`alert-box ${type}`}>
      <div>
        <strong>{title}</strong>
        <div className="small text-muted">{subtitle}</div>
      </div>
      <span>→</span>
    </div>
  );
}

export default Dashboard;