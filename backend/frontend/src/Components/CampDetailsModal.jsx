function CampDetailsModal({ camp, onClose }) {
  return (
    <div className="modal fade show d-block" style={{ background: "#00000080" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <div>
              <h5 className="fw-bold mb-1">Camp Details</h5>
              <h6 className="fw-bold">{camp.name}</h6>
              <p className="text-muted mb-0">{camp.description}</p>
            </div>

            <span className="badge bg-primary">{camp.status}</span>

            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">

            {/* INFO */}
            <div className="mb-4 p-3 bg-light rounded">
              <div className="mb-2">📍 {camp.venue}, {camp.city}</div>
              <div className="mb-2">📅 {camp.date}</div>
              <div className="mb-2">⏰ {camp.startTime} – {camp.endTime}</div>
              <div className="mb-2">🏢 {camp.organizer}</div>
              <div>📞 {camp.phone}</div>
            </div>

            {/* STATS */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <div className="p-3 bg-primary bg-opacity-10 rounded text-center">
                  <h4 className="fw-bold">{camp.registered}</h4>
                  <small className="text-primary">Registered</small>
                </div>
              </div>

              <div className="col-md-6">
                <div className="p-3 bg-danger bg-opacity-10 rounded text-center">
                  <h4 className="fw-bold">
                    {camp.collected}/{camp.target}
                  </h4>
                  <small className="text-danger">Collected</small>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="d-flex justify-content-between">
              <button className="btn btn-outline-secondary">
                ✏ Edit
              </button>

              <button className="btn btn-danger">
                Register Donors
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CampDetailsModal;
