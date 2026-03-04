import React, { useState, useEffect } from "react";
import "./Camps.css";
import CreateCampModal from "../components/CreateCampModal";
import RegisterCampModal from "../components/RegisterCampModal";
import CampDetailsModal from "../components/CampDetailsModal";


const Camps = () => {
  const [showModal, setShowModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null); // ✅ ONLY ONCE

  const [camps, setCamps] = useState([]);
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");



const upcomingCamps = camps.filter(c => {
  const today = new Date();
  const campDate = new Date(c.date);
  return campDate > today;
}).length;

const activeNow = camps.filter(c => {
  const today = new Date();
  const campDate = new Date(c.date);
  return campDate.toDateString() === today.toDateString();
}).length;

const totalDonors = camps.reduce((sum, c) => sum + (c.collected || 0), 0);

const unitsCollected = camps.reduce((sum, c) => sum + (c.collected || 0), 0);
const getStatus = (date) => {
  const today = new Date();
  const campDate = new Date(date);

  if (campDate.toDateString() === today.toDateString()) return "Active";
  if (campDate > today) return "Upcoming";
  return "Completed";
};

const filteredCamps = camps.filter((camp) => {
  const matchesSearch =
    camp.title?.toLowerCase().includes(search.toLowerCase()) ||
    camp.location?.toLowerCase().includes(search.toLowerCase()) ||
    camp.city?.toLowerCase().includes(search.toLowerCase());

  const status = getStatus(camp.date);

  const matchesStatus =
    statusFilter === "All" ||
    statusFilter === "All Status" ||
    status === statusFilter;

  return matchesSearch && matchesStatus;
});


useEffect(() => {
  fetchCamps();
}, []);

const fetchCamps = async () => {
  const res = await fetch("http://localhost:5000/api/camps");
  const data = await res.json();
  setCamps(data);
};
  // CREATE CAMP
 const handleCreateCamp = async (newCamp) => {

  const res = await fetch("http://localhost:5000/api/camps", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newCamp)
  });

  const data = await res.json();

  setCamps((prev) => [data, ...prev]);
};

  // REGISTER SUCCESS
  const handleRegisterSuccess = async (campId) => {

  const res = await fetch(`http://localhost:5000/api/camps/register/${campId}`, {
    method: "PUT"
  });

  const updated = await res.json();

  setCamps((prev) =>
    prev.map((c) => (c._id === updated._id ? updated : c))
  );
};

  // UPDATE CAMP (FROM DETAILS EDIT)
  const handleUpdateCamp = (updatedCamp) => {
    setCamps((prev) =>
      prev.map((c) =>
        c._id === updatedCamp._id? updatedCamp : c
      )
    );
  };

  return (
    <div className="camps-page">
{/* HERO HEADER */}
<div className="camp-hero">
  <div className="hero-left">
    <h1>Blood Donation Camps</h1>
    <p>Join our life-saving events and make a difference</p>

    <button
      className="organize-btn"
      onClick={() => setShowModal(true)}
    >
      + Organize a Camp
    </button>
  </div>

  <div className="hero-right">
    <div className="calendar-circle">
      📅
    </div>
  </div>
</div>

{/* STATS */}
<div className="stats-wrapper">
  <div className="stat-card blue">
    <div className="stat-icon">📅</div>
    <p>Upcoming Camps</p>
<h2>{upcomingCamps}</h2>
  </div>

  <div className="stat-card green">
    <div className="stat-icon">⏱</div>
    <p>Active Now</p>
   <h2>{activeNow}</h2>
  </div>

  <div className="stat-card purple">
    <div className="stat-icon">👥</div>
    <p>Total Donors</p>
   <h2>{totalDonors}</h2>
  </div>

  <div className="stat-card red">
    <div className="stat-icon">🎯</div>
    <p>Units Collected</p>
    <h2>{unitsCollected}</h2>
  </div>
</div>



      {/* FILTER */}
      <div className="filter-bar">
       <input
  placeholder="Search camps by name, venue, or city..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
        <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
>
          <option>All Status</option>
          <option>Upcoming</option>
          <option>Completed</option>
        </select>
       <button
  className="clear-btn"
  onClick={() => {
    setSearch("");
    setStatusFilter("All");
  }}
>
  ✖ Clear
</button>
</div>



      {/* CAMPS */}
<div className="camp-grid">
        {filteredCamps.map((c, i) => {
          const percent = Math.min((c.collected / c.total) * 100, 100);
          
          return (
            <div className="camp-card" key={c._id}>
              <div className="camp-top">
                <span className="badge register">Register Now</span>
                <span className="badge status">{getStatus(c.date)}</span>
                <div className="icon">📅</div>
                <h5>{c.title}</h5>
                <small>Saving Lives Together</small>
              </div>

              <div className="camp-body">
                <p>📍 {c.location}</p>
                <p>📅 {c.date}</p>
                <p>⏰ {c.startTime} - {c.endTime}</p>

                <div className="progress-text">
                  Collection Progress
                  <span>
                    {c.collected}/{c.total} units
                  </span>
                </div>

                <div className="progress-bar">
                  <div className="fill" style={{ width: `${percent}%` }} />
                </div>

                <div className="camp-actions">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      setSelectedCamp(c);
                      setShowRegister(true);
                    }}
                  >
                    Register
                  </button>

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => {
                      setSelectedCamp(c);
                      setShowDetails(true);
                    }}
                  >
                    Details →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
     

      {/* CREATE CAMP MODAL */}
      {showModal && (
        <CreateCampModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateCamp}
        />
      )}

      {/* REGISTER MODAL */}
     {showRegister && selectedCamp && (
  <RegisterCampModal
    camp={selectedCamp}
    onClose={() => setShowRegister(false)}
    onRegister={() => handleRegisterSuccess(selectedCamp._id)}
  />
)}

      {/* DETAILS MODAL */}
      {showDetails && selectedCamp && (
  <CampDetailsModal
    camp={selectedCamp}
    onClose={() => setShowDetails(false)}
    onUpdate={handleUpdateCamp}
    onRegister={() => {
      setShowRegister(true);
    }}
  />
)}


    </div>
  );
};

export default Camps;
