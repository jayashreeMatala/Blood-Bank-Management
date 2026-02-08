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
    {
      title: "Total Donations",
      value: 4,
      sub: "↑ 0% this month",
      icon: "❤️",
      bg: "red",
    },
    {
      title: "Total Units",
      value: 5,
      sub: "Units collected",
      icon: "💧",
      bg: "blue",
    },
    {
      title: "Active Donors",
      value: 6,
      sub: "of 6 total",
      icon: "👥",
      bg: "green",
    },
    {
      title: "Avg Donations",
      value: 0.7,
      sub: "Per donor",
      icon: "📈",
      bg: "purple",
    },
  ];

  /* ===== CHART DATA ===== */
  const monthlyTrend = {
    labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
    datasets: [
      {
        label: "Donations",
        data: [0, 0, 0, 0, 0, 0],
        borderColor: "#ef4444",
        tension: 0.4,
      },
      {
        label: "Units",
        data: [0, 0, 0, 0, 0, 0],
        borderColor: "#3b82f6",
        tension: 0.4,
      },
    ],
  };

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

  const donationTypes = {
    labels: ["Whole Blood", "Plasma", "Double Red Cells"],
    datasets: [
      {
        data: [50, 25, 25],
        backgroundColor: ["#ef4444", "#3b82f6", "#10b981"],
      },
    ],
  };

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

      {/* TOP CARDS */}
      <div className="row g-3 mt-3">
        {cards.map((c, i) => (
          <div className="col-md-3" key={i}>
            <div className="analytics-stat-card">
              <div>
                <p className="card-title">{c.title}</p>
                <h3>{c.value}</h3>
                <small className="text-success">{c.sub}</small>
              </div>
              <div className={`stat-icon ${c.bg}`}>{c.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="row mt-4 g-3">
        <div className="col-md-6">
          <div className="analytics-card">
            <h6>Monthly Donation Trend</h6>
            <Line data={monthlyTrend} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="analytics-card">
            <h6>Blood Group Distribution</h6>
            <Bar data={bloodGroup} />
          </div>
        </div>
      </div>

      {/* PIE + TOP DONORS */}
      <div className="row mt-4 g-3">
        <div className="col-md-4">
          <div className="analytics-card">
            <h6>Donation Types</h6>
            <Pie data={donationTypes} />
          </div>
        </div>

        <div className="col-md-4">
          <div className="analytics-card">
            <h6>Gender Distribution</h6>
            <Pie data={genderData} />
          </div>
        </div>

        <div className="col-md-4">
          <div className="analytics-card">
            <h6>🏅 Top Donors</h6>

            {[
              ["1", "Vikram Singh", "O-", "15"],
              ["2", "Priya Patel", "O+", "12"],
              ["3", "Rahul Sharma", "A+", "8"],
              ["4", "Sneha Reddy", "AB+", "5"],
              ["5", "Amit Kumar", "B+", "3"],
            ].map((d, i) => (
              <div className="donor-item" key={i}>
                <div className="donor-left">
                  <span className={`rank ${i < 3 ? ["gold","silver","bronze"][i] : "gray"}`}>
                    {d[0]}
                  </span>
                  <div>
                    <strong>{d[1]}</strong>
                    <small>{d[2]}</small>
                  </div>
                </div>
                <span className="donation-badge">{d[3]} donations</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BLOOD STOCK */}
      <div className="analytics-card mt-4">
        <h6>Blood Stock Status</h6>

        <div className="stock-grid">
          {[
            ["A-", 8],
            ["O-", 12],
            ["B+", 32],
            ["AB-", 3],
            ["O+", 52],
            ["B-", 5],
            ["A+", 45],
            ["AB+", 18],
          ].map((b, i) => {
            const low = b[1] < 10;
            return (
              <div className="stock-item" key={i}>
                <div className="stock-header">
                  <span>{b[0]}</span>
                  <span className={`unit-badge ${low ? "low" : "ok"}`}>
                    {b[1]} units
                  </span>
                </div>
                <div className="progress-bg">
                  <div
                    className={`progress-fill ${low ? "red" : "green"}`}
                    style={{ width: `${Math.min(b[1], 60)}%` }}
                  />
                </div>
                <small>Min: 10 units</small>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
