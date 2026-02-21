import React, { useState } from "react";

import "./BloodInventory.css";


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



function BloodInventory() {
  const [showModal, setShowModal] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  const stockData = [
  {
    batchId: "BATCH-2024-005",
    blood: "O-",
    donor: "Rahul Sharma",
    units: 3,
    collectionDate: "Dec 8, 2024",
    expiry: "Jan 23, 2025",
    hemoglobin: "12.5 g/dL",
    bp: "120",
    pulse: "78 bpm"
  },
  {
    batchId: "BATCH-2024-007",
    blood: "B-",
    donor: "Amit Kumar",
    units: 6,
    collectionDate: "Dec 14, 2024",
    expiry: "Jan 29, 2025",
    hemoglobin: "13.2 g/dL",
    bp: "118",
    pulse: "75 bpm"
  }
];


  return (
    <div className="inventory-page">

      {/* HEADER */}
<div className="inventory-header">

  <div className="header-left">
    <div className="header-icon">📦</div>

    <div>
      <h1>Blood Inventory</h1>
      <p>Manage blood stock · batch tracking · expiry control</p>
    </div>
  </div>

<button 
  className="add-stock-btn"
  onClick={() => setShowModal(true)}
>
  + Add Stock
</button>



</div>

<div className="summary-row">

  <div className="summary-card blue">
    <div className="icon-wrapper blue-bg">📦</div>
    <h2>9</h2>
    <p>Total Available</p>
  </div>

  <div className="summary-card indigo">
    <div className="icon-wrapper indigo-bg">📈</div>
    <h2>9</h2>
    <p>Total Units Collected</p>
  </div>

  <div className="summary-card red">
    <div className="icon-wrapper red-bg">⚠</div>
    <h2>7</h2>
    <p>Low Stock Alerts</p>
  </div>

  <div className="summary-card orange">
    <div className="icon-wrapper orange-bg">⏰</div>
    <h2>0</h2>
    <p>Expiring Soon (7d)</p>
  </div>

  <div className="summary-card purple">
    <div className="icon-wrapper purple-bg">🔖</div>
    <h2>0</h2>
    <p>Reserved / Issued</p>
  </div>

  <div className="summary-card gray">
    <div className="icon-wrapper gray-bg">🗑</div>
    <h2>0</h2>
    <p>Discarded / Expired</p>
  </div>

</div>


      {/* Blood Group Overview */}
<h3 className="overview-title">
  🩸 Blood Group Overview
</h3>

<div className="blood-overview-grid">

  {/* A+ */}
  <div className="blood-card">
    <div className="blood-header aplus">A+</div>
    <div className="blood-content">
      <div className="row">
        <span>Available</span>
        <strong>0</strong>
      </div>
      <div className="row">
        <span>Reserved</span>
        <span className="reserved">0</span>
      </div>
      <div className="progress"></div>
      <div className="status critical">CRITICAL</div>
    </div>
  </div>

  {/* A- */}
  <div className="blood-card">
    <div className="blood-header aminus">A-</div>
    <div className="blood-content">
      <div className="row">
        <span>Available</span>
        <strong>0</strong>
      </div>
      <div className="row">
        <span>Reserved</span>
        <span className="reserved">0</span>
      </div>
      <div className="progress"></div>
      <div className="status critical">CRITICAL</div>
    </div>
  </div>

  {/* B+ */}
  <div className="blood-card">
    <div className="blood-header bplus">B+</div>
    <div className="blood-content">
      <div className="row">
        <span>Available</span>
        <strong>0</strong>
      </div>
      <div className="row">
        <span>Reserved</span>
        <span className="reserved">0</span>
      </div>
      <div className="progress"></div>
      <div className="status critical">CRITICAL</div>
    </div>
  </div>

  {/* B- SAFE */}
  <div className="blood-card">
    <div className="blood-header bminus">B-</div>
    <div className="blood-content">
      <div className="row">
        <span>Available</span>
        <strong>6</strong>
      </div>
      <div className="row">
        <span>Reserved</span>
        <span className="reserved">0</span>
      </div>
      <div className="progress green-fill"></div>
      <div className="status safe">SAFE</div>
    </div>
  </div>

  {/* AB+ */}
  <div className="blood-card">
    <div className="blood-header abplus">AB+</div>
    <div className="blood-content">
      <div className="row">
        <span>Available</span>
        <strong>0</strong>
      </div>
      <div className="row">
        <span>Reserved</span>
        <span className="reserved">0</span>
      </div>
      <div className="progress"></div>
      <div className="status critical">CRITICAL</div>
    </div>
  </div>

  {/* AB- */}
  <div className="blood-card">
    <div className="blood-header abminus">AB-</div>
    <div className="blood-content">
      <div className="row">
        <span>Available</span>
        <strong>0</strong>
      </div>
      <div className="row">
        <span>Reserved</span>
        <span className="reserved">0</span>
      </div>
      <div className="progress"></div>
      <div className="status critical">CRITICAL</div>
    </div>
  </div>

  {/* O+ */}
  <div className="blood-card">
    <div className="blood-header oplus">O+</div>
    <div className="blood-content">
      <div className="row">
        <span>Available</span>
        <strong>0</strong>
      </div>
      <div className="row">
        <span>Reserved</span>
        <span className="reserved">0</span>
      </div>
      <div className="progress"></div>
      <div className="status critical">CRITICAL</div>
    </div>
  </div>

  {/* O- LOW */}
  <div className="blood-card">
    <div className="blood-header ominus">O-</div>
    <div className="blood-content">
      <div className="row">
        <span>Available</span>
        <strong>3</strong>
      </div>
      <div className="row">
        <span>Reserved</span>
        <span className="reserved">0</span>
      </div>
      <div className="progress yellow-fill"></div>
      <div className="status low">LOW</div>
    </div>
  </div>

</div>

{/* FILTER SECTION */}
<div className="inventory-filter">

  <div className="filter-title">
    🔎 Filters & Search
  </div>

  <div className="filter-controls">

    <div className="search-box">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search batch ID or donor..."
      />
    </div>

    <select className="filter-select">
      <option>All Blood Groups</option>
    </select>

    <select className="filter-select">
      <option>All Status</option>
    </select>

  </div>
</div>

<p className="record-count">
  Showing <strong>2</strong> records
</p>

      <div className="inventory-table">

  <table>
    <thead>
      <tr>
        <th>BATCH ID</th>
        <th>BLOOD GROUP</th>
        <th>DONOR NAME</th>
        <th>UNITS</th>
        <th>COLLECTION DATE</th>
        <th>EXPIRY DATE</th>
        <th>STORAGE</th>
        <th>STATUS</th>
        <th>TEST RESULT</th>
        <th>ACTIONS</th>
      </tr>
    </thead>

   <tbody>
  {stockData.map((stock, index) => (
    <tr key={index}>
      <td>
        <span className="batch-pill">{stock.batchId}</span>
      </td>

      <td>
        <span className={`blood-pill ${stock.blood === "O-" ? "red" : "green"}`}>
          {stock.blood}
        </span>
      </td>

      <td>{stock.donor}</td>

      <td><strong>{stock.units}</strong> units</td>

      <td>{stock.collectionDate}</td>

      <td>
        <div className="expiry">
          {stock.expiry}
          <span className="expired-badge">EXPIRED</span>
        </div>
      </td>

      <td>Refrigerator C</td>

      <td>
        <span className="status-pill stored">Stored</span>
      </td>

      <td>
        <span className="status-pill passed">Passed</span>
      </td>

      <td className="action-icons">
        <span
          className="view"
          onClick={() => {
            setSelectedStock(stock);
            setViewOpen(true);
          }}
        >
          👁
        </span>

        <span className="edit">✏</span>
        <span className="delete">🗑</span>
      </td>
    </tr>
  ))}
</tbody>

  </table>
</div>
<div className="chart-grid">

  {/* BAR CHART */}
  <div className="chart-card">
    <div className="chart-header blue">
      📊 Blood Group Availability
    </div>
    <Bar
      data={{
        labels: ["A+","A-","B+","B-","AB+","AB-","O+","O-"],
        datasets: [{
          data: [0,0,0,6,0,0,0,3],
          backgroundColor: "#ef4444",
          borderRadius: 6,
          barThickness: 28
        }]
      }}
      options={{
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color:"#f1f5f9" } },
          x: { grid: { display:false } }
        }
      }}
    />
  </div>

  {/* LINE CHART */}
  <div className="chart-card">
    <div className="chart-header green">
      📈 Monthly Collection Trend
    </div>
    <Line
      data={{
        labels:["Sep 25","Oct 25","Nov 25","Dec 25","Jan 26","Feb 26"],
        datasets:[{
          data:[0,0,0,0,0,0],
          borderColor:"#ef4444",
          backgroundColor:"#ef4444",
          tension:0.4,
          pointRadius:5
        }]
      }}
      options={{
        plugins:{ legend:{ display:false }},
        scales:{
          y:{ beginAtZero:true, grid:{ color:"#f1f5f9" }},
          x:{ grid:{ display:false }}
        }
      }}
    />
  </div>

  {/* PIE CHART */}
  <div className="chart-card">
    <div className="chart-header purple">
      🟣 Stock Status Distribution
    </div>
    <Pie
      data={{
        labels:["Stored"],
        datasets:[{
          data:[100],
          backgroundColor:["#22c55e"],
          borderWidth:0
        }]
      }}
      options={{
        plugins:{
          legend:{ display:false }
        }
      }}
    />
    <div className="pie-label">Stored 100%</div>
  </div>

</div>
{showModal && (
  <div className="stock-modal-overlay">
    <div className="stock-modal">

      <div className="stock-modal-header">
        <div className="stock-title-wrap">
          <div className="stock-icon">📦</div>
          <h3>Add New Blood Stock</h3>
        </div>
        <span
          className="stock-close"
          onClick={() => setShowModal(false)}
        >
          ×
        </span>
      </div>

      <div className="stock-section basic-section">

        <h4>Basic Information</h4>
        <div className="stock-grid">
          <div>
            <label>Batch ID</label>
            <input value="BATCH-1771525527653" readOnly />
          </div>

          <div>
            <label>Blood Group *</label>
            <select>
              <option>Select blood group</option>
            </select>
          </div>

          <div>
            <label>Units</label>
            <input type="number" defaultValue="1" />
          </div>

          <div>
            <label>Status</label>
            <select>
              <option>Collected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="stock-section blue-bg">
        <h4>Collection & Expiry</h4>
        <div className="stock-grid">
          <div>
            <label>Collection Date *</label>
            <input type="date" />
          </div>

          <div>
            <label>Expiry Date (auto: +42 days)</label>
            <input type="date" />
          </div>
        </div>
      </div>

      <div className="stock-section purple-bg">
        <h4>Storage & Source</h4>
        <div className="stock-grid">
          <div>
            <label>Storage Location / Rack</label>
            <input placeholder="e.g. Refrigerator A - Rack 2" />
          </div>

          <div>
            <label>Test Result</label>
            <select>
              <option>Pending</option>
            </select>
          </div>

          <div>
            <label>Donor Name</label>
            <input placeholder="Optional" />
          </div>

          <div>
            <label>Camp Name</label>
            <input placeholder="Optional" />
          </div>
        </div>
      </div>

      <div className="stock-footer">
        <button
          className="cancel-btn"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>

        <button className="add-btn">
          Add Stock
        </button>
      </div>

    </div>
  </div>
)}
{viewOpen && selectedStock && (
  <div className="view-overlay">
    <div className="view-card">

      <div className="view-header">
        <h2>Donation Details</h2>
        <span
          className="view-close"
          onClick={() => setViewOpen(false)}
        >
          ×
        </span>
      </div>

      {/* Donor Information */}
      <div className="view-section red-border">
        <h3>Donor Information</h3>
        <div className="view-grid">

          <div>
            <label>Donor Name</label>
            <p>{selectedStock.donor}</p>
          </div>

          <div>
            <label>Blood Group</label>
            <span className="blood-pill green">
              {selectedStock.blood}
            </span>
          </div>

          <div>
            <label>Donation Date</label>
            <p>{selectedStock.collectionDate}</p>
          </div>

        </div>
      </div>

      {/* Collection Details */}
      <div className="view-section purple-border">
        <h3>Collection Details</h3>
        <div className="view-grid">

          <div>
            <label>Batch ID</label>
            <p>{selectedStock.batchId}</p>
          </div>

          <div>
            <label>Units</label>
            <p>{selectedStock.units}</p>
          </div>

        </div>
      </div>

      {/* Vital Signs */}
      <div className="view-section blue-border">
        <h3>Vital Signs</h3>
        <div className="vital-grid">

          <div className="vital-box">
            <span>Hemoglobin</span>
            <strong>{selectedStock.hemoglobin}</strong>
          </div>

          <div className="vital-box">
            <span>Blood Pressure</span>
            <strong>{selectedStock.bp}</strong>
          </div>

          <div className="vital-box">
            <span>Pulse Rate</span>
            <strong>{selectedStock.pulse}</strong>
          </div>

        </div>
      </div>

      <div className="view-status">
        ✅ Screening Passed
      </div>

    </div>
  </div>
)}



    </div>
  );
}

export default BloodInventory;
