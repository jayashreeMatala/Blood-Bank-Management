import React, { useState } from "react";
import CreateCampModal from "./CreateCampModal";
import "./CampDetailsModal.css";

const CampDetailsModal = ({ camp, onClose, onUpdate, onRegister }) => {
  const [editMode, setEditMode] = useState(false);

  if (!camp) return null;

  // EDIT MODE → reuse CreateCampModal
  if (editMode) {
    return (
      <CreateCampModal
        editData={camp}
        onClose={() => setEditMode(false)}
        onCreate={(updatedCamp) => {
          onUpdate(updatedCamp);
          setEditMode(false);
        }}
      />
    );
  }

  return (
    <div className="modal d-block camp-details-backdrop">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content camp-details-card">

          {/* HEADER */}
          <div className="camp-details-header">
            <div>
              <h5>Camp Details</h5>
              <h3>{camp.title}</h3>
            </div>
            <span className="status-badge">{camp.status}</span>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* DESCRIPTION */}
          <div className="camp-description">
            {camp.description || "Annual blood donation camp"}
          </div>

          {/* INFO GRID */}
          <div className="details-grid">
            <div className="info-box blue">
              <h6>Location</h6>
              <p>{camp.location}</p>
            </div>

            <div className="info-box purple">
              <h6>Schedule</h6>
              <p>{camp.date}</p>
              <small>{camp.time}</small>
            </div>

            <div className="info-box light-blue center">
              <h2>{camp.collected}</h2>
              <span>Registered Donors</span>
            </div>

            <div className="info-box light-red center">
              <h2>{camp.collected}/{camp.total}</h2>
              <span>Units Collected</span>
            </div>
          </div>

          {/* FOOTER INFO */}
          <div className="camp-footer-info">
            <p><strong>Organizer:</strong> {camp.organizer || "Red Cross Society"}</p>
            <p><strong>Contact:</strong> {camp.phone || "+91 2234567890"}</p>
          </div>

          {/* ACTIONS */}
          <div className="camp-actions">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setEditMode(true)}
            >
              Edit Camp
            </button>

            <button
              className="btn btn-danger"
              onClick={() => {
                onClose();
                onRegister();
              }}
            >
              Register Donors
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CampDetailsModal;
