import React, { useState, useEffect } from "react";
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
  const [stockData, setStockData] = useState([]);
  const [formData, setFormData] = useState({
  bloodGroup: "",
  units: 1,
  status: "Collected",
  collectionDate: "",
  expiryDate: "",
  storageLocation: "",
  testResult: "Pending",
  donorName: "",
  campName: ""
});

const getGroupUnits = (group) => {
  const today = new Date();
  today.setHours(0,0,0,0);

  return stockData
    .filter(stock => {
      const expiry = new Date(stock.expiryDate);
      expiry.setHours(0,0,0,0);

      return (
        stock.bloodGroup === group &&
        stock.status === "Stored" &&
        expiry >= today
      );
    })
    .reduce((total, stock) => {
      const available = stock.units - (stock.reservedUnits || 0);
      return total + available;
    }, 0);
};

const getReservedUnits = (group) => {
  return stockData
    .filter(stock => stock.bloodGroup === group)
    .reduce((total, stock) => {
      return total + (stock.reservedUnits || 0);
    }, 0);
};
  useEffect(() => {
  fetchStocks();
}, []);

const fetchStocks = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/inventory");
    const data = await res.json();
    setStockData(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

// 🔴 LOW STOCK LOGIC

const bloodGroups = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];

// Available units per group (Stored + Not Expired)
const getAvailableUnits = (group) => {
  const today = new Date();
  today.setHours(0,0,0,0);

  return stockData
    .filter(stock => {
      const expiry = new Date(stock.expiryDate);
      expiry.setHours(0,0,0,0);

      return (
        stock.bloodGroup === group &&
        stock.status === "Stored" &&
        expiry >= today
      );
    })
    .reduce((total, stock) => total + Number(stock.units || 0), 0);
};



// Count how many groups are LOW or CRITICAL

const lowStockCount = bloodGroups.filter(group => {
  const units = getAvailableUnits(group);

  const groupExists = stockData.some(
    stock => stock.bloodGroup === group
  );

  return groupExists && units > 0 && units <= 3;
}).length;
 const handleAddStock = async () => {
  try {
   if (
  formData.bloodGroup.trim() === "" ||
  formData.collectionDate.trim() === ""
) {
  alert("Please fill required fields");
  return;
} 

    const expiry =
      formData.expiryDate ||
      new Date(
        new Date(formData.collectionDate).setDate(
          new Date(formData.collectionDate).getDate() + 42
        )
      );

    await fetch("http://localhost:5000/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        batchId: "BATCH-" + Date.now(),
        bloodGroup: formData.bloodGroup,
        donorName: formData.donorName,
        units: Number(formData.units)||1,
        collectionDate: formData.collectionDate,
        expiryDate: expiry,
        status: formData.status,
        testResult: formData.testResult,
        storageLocation: formData.storageLocation
      })
    });

    setShowModal(false);
    fetchStocks();

    // Reset form
    setFormData({
      bloodGroup: "",
      units: 1,
      status: "Collected",
      collectionDate: "",
      expiryDate: "",
      storageLocation: "",
      testResult: "Pending",
      donorName: "",
      campName: ""
    });

  } catch (error) {
    console.error(error);
    alert("Add failed");
  }
};


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
   <h2>
  {
    stockData.filter(stock => {
      const today = new Date();
      today.setHours(0,0,0,0);

      const expiry = new Date(stock.expiryDate);
      expiry.setHours(0,0,0,0);

      return (
        stock.status === "Stored" &&
        expiry >= today
      );
    }).length
  }
</h2>
    <p>Total Available</p>
  </div>

  <div className="summary-card indigo">
    <div className="icon-wrapper indigo-bg">📈</div>
    <h2>9</h2>
    <p>Total Units Collected</p>
  </div>

  <div className="summary-card red">
    <div className="icon-wrapper red-bg">⚠</div>
    <h2>{lowStockCount}</h2>
    <p>Low Stock Alerts</p>
  </div>

  <div className="summary-card orange">
    <div className="icon-wrapper orange-bg">⏰</div>
   <h2>
  {
    stockData.filter(stock => {
      const today = new Date();
      today.setHours(0,0,0,0);

      const expiry = new Date(stock.expiryDate);
      expiry.setHours(0,0,0,0);

      const diffDays = Math.ceil(
        (expiry - today) / (1000 * 60 * 60 * 24)
      );

      return diffDays >= 0 && diffDays <= 7;
    }).length
  }
</h2>
    <p>Expiring Soon (7d)</p>
  </div>

  <div className="summary-card purple">
    <div className="icon-wrapper purple-bg">🔖</div>
    <h2>
  {stockData.reduce(
    (total, stock) => total + (stock.reservedUnits || 0),
    0
  )}
</h2>
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
        <strong>{getGroupUnits("A+")}</strong>
      </div>
      <div className="row">
        <span>Reserved</span>
       <span className="reserved">
  {getReservedUnits("A+")}
</span>
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
       <strong>{getGroupUnits("A-")}</strong>
      </div>
      <div className="row">
        <span>Reserved</span>
        <span className="reserved">
  {getReservedUnits("A-")}
</span>
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
        <strong>{getGroupUnits("B+")}</strong>
      </div>
      <div className="row">
        <span>Reserved</span>
        <span className="reserved">
  {getReservedUnits("B+")}
</span>
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
        <strong>{getGroupUnits("B-")}</strong>
      </div>
      <div className="row">
        <span>Reserved</span>
       <span className="reserved">
  {getReservedUnits("B-")}
</span>
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
       <strong>{getGroupUnits("AB+")}</strong>
      </div>
      <div className="row">
        <span>Reserved</span>
       <span className="reserved">
  {getReservedUnits("AB+")}
</span>
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
      <strong>{getGroupUnits("AB-")}</strong>
      </div>
      <div className="row">
        <span>Reserved</span>
       <span className="reserved">
  {getReservedUnits("AB-")}
</span>
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
        <strong>{getGroupUnits("O+")}</strong>
      </div>
      <div className="row">
        <span>Reserved</span>
       <span className="reserved">
  {getReservedUnits("O+")}
</span>
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
        <strong>{getGroupUnits("O-")}</strong>
      </div>
      <div className="row">
        <span>Reserved</span>
       <span className="reserved">
  {getReservedUnits("O-")}
</span>
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
        <span className={`blood-pill ${stock.bloodGroup === "O-" ? "red" : "green"}`}>
          {stock.bloodGroup}
        </span>
      </td>

      <td>{stock.donorName}</td>

      <td><strong>{stock.units}</strong> units</td>

      <td>
 {stock.collectionDate
  ? new Date(stock.collectionDate).toLocaleDateString()
  : "-"}
</td>

     <td>
  <div className="expiry">
    {stock.expiryDate
  ? new Date(stock.expiryDate).toLocaleDateString()
  : "-"}

    {(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const expiry = new Date(stock.expiryDate);
      expiry.setHours(0, 0, 0, 0);

      const diffDays = Math.ceil(
        (expiry - today) / (1000 * 60 * 60 * 24)
      );

      if (diffDays < 0) {
        return <span className="expired-badge">EXPIRED</span>;
      }

      if (diffDays <= 7) {
        return <span className="soon-badge">EXPIRING SOON</span>;
      }

      return null;
    })()}
  </div>
</td>
    <td>{stock.storageLocation}</td>

      <td>
        <span className="status-pill stored">{stock.status}</span>
      </td>

      <td>
        <span className="status-pill passed">{stock.testResult}</span>
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
        <span
  className="delete"
  onClick={async () => {
    await fetch(
      `http://localhost:5000/api/inventory/${stock._id}`,
      { method: "DELETE" }
    );
    fetchStocks();
  }}
>
  🗑
</span>
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
           <input value={"BATCH-" + Date.now()} readOnly />
          </div>

          <div>
            <label>Blood Group *</label>
            <select
  value={formData.bloodGroup}
  onChange={(e) =>
    setFormData({ ...formData, bloodGroup: e.target.value })
  }
>
  <option value="">Select blood group</option>
  <option value="A+">A+</option>
  <option value="A-">A-</option>
  <option value="B+">B+</option>
  <option value="B-">B-</option>
  <option value="AB+">AB+</option>
  <option value="AB-">AB-</option>
  <option value="O+">O+</option>
  <option value="O-">O-</option>
</select>
              
           
          </div>

          <div>
            <label>Units</label>
            <input
  type="number"
  value={formData.units}
  onChange={(e) =>
    setFormData({ ...formData, units: e.target.value })
  }
/>
          </div>

          <div>
            <label>Status</label>
            
              <select
  value={formData.status}
  onChange={(e) =>
    setFormData({ ...formData, status: e.target.value })
  }
>
  <option value="Collected">Collected</option>
  <option value="Stored">Stored</option>
  <option value="Issued">Issued</option>
</select>
           
          </div>
        </div>
      </div>

      <div className="stock-section blue-bg">
        <h4>Collection & Expiry</h4>
        <div className="stock-grid">
          <div>
            <label>Collection Date *</label>
            <input
  type="date"
  value={formData.collectionDate}
  onChange={(e) => {
  const selectedDate = e.target.value;

  // Agar date empty hai to crash mat hone do
  if (!selectedDate) {
    setFormData({
      ...formData,
      collectionDate: "",
      expiryDate: ""
    });
    return;
  }

  const expiryDate = new Date(selectedDate);

  // Safety check
  if (isNaN(expiryDate.getTime())) {
    return;
  }

  expiryDate.setDate(expiryDate.getDate() + 42);

  setFormData({
    ...formData,
    collectionDate: selectedDate,
    expiryDate: expiryDate.toISOString().split("T")[0]
  });

  }}
/>
          </div>

          <div>
            <label>Expiry Date (auto: +42 days)</label>
           <input
  type="date"
  value={formData.expiryDate}
  readOnly
/>
          </div>
        </div>
      </div>

      <div className="stock-section purple-bg">
        <h4>Storage & Source</h4>
        <div className="stock-grid">
          <div>
            <label>Storage Location / Rack</label>
            <input
  placeholder="e.g. Refrigerator A - Rack 2"
  value={formData.storageLocation}
  onChange={(e) =>
    setFormData({ ...formData, storageLocation: e.target.value })
  }
/>
          </div>

          <div>
            <label>Test Result</label>
            <select
  value={formData.testResult}
  onChange={(e) =>
    setFormData({ ...formData, testResult: e.target.value })
  }
>
  <option value="Pending">Pending</option>
  <option value="Passed">Passed</option>
  <option value="Failed">Failed</option>
</select>
          </div>

          <div>
            <label>Donor Name</label>
            <input
  placeholder="Optional"
  value={formData.donorName}
  onChange={(e) =>
    setFormData({ ...formData, donorName: e.target.value })
  }
/>
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

        <button className="add-btn"
        onClick={handleAddStock}>
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
            <p>{selectedStock.donorName}</p>
          </div>

          <div>
            <label>Blood Group</label>
            <span className="blood-pill green">
              {selectedStock.bloodGroup}
            </span>
          </div>

          <div>
            <label>Donation Date</label>
            <p>{new Date(selectedStock.collectionDate).toLocaleDateString()}</p>
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
            <strong>{selectedStock.hemoglobin || "-"}</strong>
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
