import React, { useState } from "react";
import "./Camps.css";
import CreateCampModal from "../components/CreateCampModal";
import RegisterCampModal from "../components/RegisterCampModal";
import CampDetailsModal from "../components/CampDetailsModal";

const Camps = () => {
  const [showModal, setShowModal] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null); // ✅ ONLY ONCE

  const stats = [
    { title: "Upcoming Camps", value: 4, color: "blue" },
    { title: "Active Now", value: 0, color: "green" },
    { title: "Total Donors", value: 257, color: "purple" },
    { title: "Units Collected", value: 142, color: "red" },
  ];

  const [camps, setCamps] = useState([
    {
      title: "Blood Donation Camp",
      location: "Mumbai Central",
      date: "February 2, 2026",
      time: "09:00 - 17:00",
      collected: 0,
      total: 100,
      status: "Upcoming",
    },
    {
      title: "Winter Blood Drive 2024",
      location: "Community Center, Mumbai",
      date: "January 20, 2026",
      time: "09:00 - 17:00",
      collected: 45,
      total: 100,
      status: "Upcoming",
    },
    {
      title: "Corporate Donation Camp",
      location: "TechPark Convention Hall",
      date: "January 15, 2026",
      time: "10:00 - 16:00",
      collected: 32,
      total: 75,
      status: "Upcoming",
    },
    {
      title: "University Blood Camp",
      location: "Delhi University Campus",
      date: "December 20, 2024",
      time: "09:00 - 15:00",
      collected: 142,
      total: 150,
      status: "Completed",
    },
  ]);

  // CREATE CAMP
  const handleCreateCamp = (newCamp) => {
    setCamps((prev) => [newCamp, ...prev]);
  };

  // REGISTER SUCCESS
  const handleRegisterSuccess = (campTitle) => {
    setCamps((prev) =>
      prev.map((camp) =>
        camp.title === campTitle
          ? { ...camp, collected: camp.collected + 1 }
          : camp
      )
    );
  };

  // UPDATE CAMP (FROM DETAILS EDIT)
  const handleUpdateCamp = (updatedCamp) => {
    setCamps((prev) =>
      prev.map((c) =>
        c.title === updatedCamp.title ? updatedCamp : c
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
    <h2>4</h2>
  </div>

  <div className="stat-card green">
    <div className="stat-icon">⏱</div>
    <p>Active Now</p>
    <h2>0</h2>
  </div>

  <div className="stat-card purple">
    <div className="stat-icon">👥</div>
    <p>Total Donors</p>
    <h2>259</h2>
  </div>

  <div className="stat-card red">
    <div className="stat-icon">🎯</div>
    <p>Units Collected</p>
    <h2>142</h2>
  </div>
</div>



      {/* FILTER */}
      <div className="filter-bar">
        <input placeholder="Search camps by name, venue, or city..." />
        <select>
          <option>All Status</option>
          <option>Upcoming</option>
          <option>Completed</option>
        </select>
        <button className="clear-btn">✖ Clear</button>
      </div>

      {/* CAMPS */}
      <div className="camp-grid">
        {camps.map((c, i) => {
          const percent = Math.min((c.collected / c.total) * 100, 100);

          return (
            <div className="camp-card" key={i}>
              <div className="camp-top">
                <span className="badge register">Register Now</span>
                <span className="badge status">{c.status}</span>
                <div className="icon">📅</div>
                <h5>{c.title}</h5>
                <small>Saving Lives Together</small>
              </div>

              <div className="camp-body">
                <p>📍 {c.location}</p>
                <p>📅 {c.date}</p>
                <p>⏰ {c.time}</p>

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
          onRegister={handleRegisterSuccess}
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
