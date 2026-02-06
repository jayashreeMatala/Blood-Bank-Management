import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import "./Analytics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const Analytics = () => {
  /* ===== TOP CARDS ===== */
  const cards = [
    { title: "Total Donations", value: 4, sub: "↑ 0% this month" },
    { title: "Total Units", value: 5, sub: "Units collected" },
    { title: "Active Donors", value: 6, sub: "of 6 total" },
    { title: "Avg Donations", value: 0.7, sub: "Per donor" },
  ];

  /* ===== MONTHLY TREND ===== */
  const monthlyTrend = {
    labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
    datasets: [
      {
        label: "Donations",
        data: [0, 0, 0, 0, 0, 0],
        borderColor: "#ef4444",
        backgroundColor: "#ef4444",
      },
      {
        label: "Units",
        data: [0, 0, 0, 0, 0, 0],
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
      },
    ],
  };

  /* ===== BLOOD GROUP DISTRIBUTION ===== */
  const bloodGroup = {
    labels: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    datasets: [
      {
        label: "Donors",
        data: [2, 1, 2, 1, 1, 0, 3, 1],
        backgroundColor: "#ef4444",
      },
      {
        label: "Stock Units",
        data: [45, 8, 32, 5, 18, 3, 52, 12],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  /* ===== DONATION TYPES ===== */
  const donationTypes = {
    labels: ["Whole Blood", "Plasma", "Double Red Cells"],
    datasets: [
      {
        data: [50, 25, 25],
        backgroundColor: ["#ef4444", "#3b82f6", "#10b981"],
      },
    ],
  };

  /* ===== GENDER ===== */
  const genderData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [3, 3],
        backgroundColor: ["#ef4444", "#3b82f6"],
      },
    ],
  };

  return (
    <div className="analytics-page">
      <h3>Analytics & Reports</h3>
      <p className="text-muted">Comprehensive insights and statistics</p>

      {/* ===== CARDS ===== */}
      <div className="row g-3">
        {cards.map((c, i) => (
          <div className="col-md-3" key={i}>
            <div className="card shadow-sm p-3">
              <p className="text-muted">{c.title}</p>
              <h3>{c.value}</h3>
              <small className="text-success">{c.sub}</small>
            </div>
          </div>
        ))}
      </div>

      {/* ===== GRAPHS ===== */}
      <div className="row mt-4 g-3">
        <div className="col-md-6">
          <div className="card p-3">
            <h6>Monthly Donation Trend</h6>
            <Line data={monthlyTrend} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3">
            <h6>Blood Group Distribution</h6>
            <Bar data={bloodGroup} />
          </div>
        </div>
      </div>

      {/* ===== PIE + TOP DONORS ===== */}
      <div className="row mt-4 g-3">
        <div className="col-md-4">
          <div className="card p-3">
            <h6>Donation Types</h6>
            <Pie data={donationTypes} />
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h6>Gender Distribution</h6>
            <Pie data={genderData} />
          </div>
        </div>

<div className="col-md-4">
  <div className="card top-donors-card p-3">
    <h6 className="mb-3">🏅 Top Donors</h6>

    <div className="donor-item">
      <div className="donor-left">
        <span className="rank gold">1</span>
        <div>
          <strong>Vikram Singh</strong>
          <small>O-</small>
        </div>
      </div>
      <span className="badge donation-badge">15 donations</span>
    </div>

    <div className="donor-item">
      <div className="donor-left">
        <span className="rank silver">2</span>
        <div>
          <strong>Priya Patel</strong>
          <small>O+</small>
        </div>
      </div>
      <span className="badge donation-badge">12 donations</span>
    </div>

    <div className="donor-item">
      <div className="donor-left">
        <span className="rank bronze">3</span>
        <div>
          <strong>Rahul Sharma</strong>
          <small>A+</small>
        </div>
      </div>
      <span className="badge donation-badge">8 donations</span>
    </div>

    <div className="donor-item">
      <div className="donor-left">
        <span className="rank gray">4</span>
        <div>
          <strong>Sneha Reddy</strong>
          <small>AB+</small>
        </div>
      </div>
      <span className="badge donation-badge">5 donations</span>
    </div>

    <div className="donor-item">
      <div className="donor-left">
        <span className="rank gray">5</span>
        <div>
          <strong>Amit Kumar</strong>
          <small>B+</small>
        </div>
      </div>
      <span className="badge donation-badge">3 donations</span>
    </div>
  </div>
</div>

      </div>

      {/* ===== BLOOD STOCK ===== */}
      <div className="card p-3 mt-4">
        <h6>Blood Stock Status</h6>
        <p>A-, B-, AB- low • O+, A+ healthy</p>
      </div>
    </div>
  );
};

export default Analytics;
