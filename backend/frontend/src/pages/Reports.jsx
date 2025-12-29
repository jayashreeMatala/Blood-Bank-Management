import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { useInventory } from "../context/InventoryContext";
import { useRequests } from "../context/RequestContext";
import { useDonors } from "../context/DonorContext";
import { useCamps } from "../context/CampContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

/* ✅ COMPACT CHART OPTIONS */
const smallChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        boxWidth: 10,
        font: { size: 11 }
      }
    }
  },
  scales: {
    x: { ticks: { font: { size: 10 } } },
    y: { ticks: { font: { size: 10 } } }
  }
};

function Reports() {
  const { summary } = useInventory();
  const { requests } = useRequests();
  const { donors } = useDonors();
  const { camps } = useCamps();

  /* ===== TOP METRICS ===== */
  const totalUnits = summary.reduce((s, b) => s + b.units, 0);
  const totalDonors = donors.length;
  const thisMonth = 0;
  const wastage = 0;

  /* ===== BLOOD GROUP DISTRIBUTION ===== */
  const bloodChart = {
    labels: summary.map(b => b.blood),
    datasets: [{
      data: summary.map(b => b.units),
      backgroundColor: "#ef4444"
    }]
  };

  /* ===== REQUEST STATUS ===== */
  const fulfilled = requests.filter(r => r.status === "Fulfilled").length;
  const pending = requests.filter(r => r.status === "Pending").length;

  const requestChart = {
    labels: ["Fulfilled", "Pending"],
    datasets: [{
      data: [fulfilled, pending],
      backgroundColor: ["#ef4444", "#fbbf24"]
    }]
  };

  /* ===== INVENTORY STATUS ===== */
  const inventoryChart = {
    labels: ["Active"],
    datasets: [{
      data: [totalUnits],
      backgroundColor: ["#22c55e"]
    }]
  };

  /* ===== DONATION TREND ===== */
  const donationTrend = {
    labels: ["Nov 30","Dec 5","Dec 10","Dec 15","Dec 20","Dec 25"],
    datasets: [{
      data: [0,1,0,2,1,3],
      borderColor: "#22c55e",
      tension: 0.4
    }]
  };

  /* ✅ SAFE CAMP DATA (NO CRASH) */
  const camp = camps.length > 0 ? camps[0] : null;

  const campChart = {
    labels: [camp?.name || "No Camp"],
    datasets: [
      {
        label: "Target",
        data: [camp?.target || 0],
        backgroundColor: "#94a3b8"
      },
      {
        label: "Collected",
        data: [camp?.collected || 0],
        backgroundColor: "#ef4444"
      }
    ]
  };

  return (
    <div className="container-fluid p-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between mb-4">
        <div>
          <h3 className="fw-bold">Reports & Analytics</h3>
          <p className="text-muted">Comprehensive blood bank statistics</p>
        </div>
        <div className="d-flex gap-2">
          <select className="form-select form-select-sm">
            <option>This Month</option>
          </select>
          <button className="btn btn-outline-secondary btn-sm">Export</button>
        </div>
      </div>

      {/* METRICS */}
      <div className="row g-3 mb-4">
        <Metric title="Total Units" value={totalUnits} />
        <Metric title="Total Donors" value={totalDonors} />
        <Metric title="This Month" value={thisMonth} />
        <Metric title="Wastage" value={wastage} />
      </div>

      {/* CHART ROW 1 */}
      <div className="row g-4 mb-4">
        <ChartCard title="Blood Group Distribution">
          <Bar data={bloodChart} options={smallChartOptions} />
        </ChartCard>

        <ChartCard title="Donation Trend (Last 30 Days)">
          <Line data={donationTrend} options={smallChartOptions} />
        </ChartCard>
      </div>

      {/* CHART ROW 2 */}
      <div className="row g-4 mb-4">
        <ChartCard title="Request Status Distribution">
          <Doughnut data={requestChart} options={smallChartOptions} />
        </ChartCard>

        <ChartCard title="Inventory Status">
          <Doughnut data={inventoryChart} options={smallChartOptions} />
        </ChartCard>
      </div>

      {/* CAMP PERFORMANCE */}
      <div className="card shadow-sm">
        <div className="card-body p-2">
          <h6 className="fw-bold mb-2" style={{ fontSize: "14px" }}>
            Camp Performance
          </h6>

          <div style={{ height: "220px" }}>
            <Bar data={campChart} options={smallChartOptions} />
          </div>
        </div>
      </div>

    </div>
  );
}

/* ===== SMALL COMPONENTS ===== */

function Metric({ title, value }) {
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

function ChartCard({ title, children }) {
  return (
    <div className="col-md-6">
      <div className="card shadow-sm">
        <div className="card-body p-2">
          <h6 className="fw-bold mb-2" style={{ fontSize: "14px" }}>
            {title}
          </h6>
          <div style={{ height: "200px" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
