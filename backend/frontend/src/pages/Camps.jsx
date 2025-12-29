import { useState } from "react";
import { useCamps } from "../context/CampContext";
import CreateCampModal from "../Components/CreateCampModal";
import CampDetailsModal from "../Components/CampDetailsModal";

function Camps() {
  const { camps } = useCamps();
  const [showCreate, setShowCreate] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);

  /* ===== STATS ===== */
  const upcoming = camps.filter(c => c.status === "Upcoming").length;
  const ongoing = camps.filter(c => c.status === "Ongoing").length;
  const totalRegistered = camps.reduce((s, c) => s + (c.registered || 0), 0);
  const totalCollected = camps.reduce((s, c) => s + (c.collected || 0), 0);

  return (
    <div className="container-fluid p-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between mb-4">
        <div>
          <h3 className="fw-bold">Donation Camps</h3>
          <p className="text-muted">
            Manage blood donation drives and events
          </p>
        </div>

        <button
          className="btn btn-danger btn-sm"
          style={{ height: "38px" }}
          onClick={() => setShowCreate(true)}

        >
          + Create Camp
        </button>
      </div>

      {/* STATS */}
      <div className="row g-3 mb-4">
        <Stat title="Upcoming" value={upcoming} />
        <Stat title="Ongoing" value={ongoing} />
        <Stat title="Total Registered" value={totalRegistered} />
        <Stat title="Units Collected" value={totalCollected} />
      </div>

      {/* CAMPS GRID */}
      <div className="row g-4">
        {camps.map(c => {
          const target = Number(c.targetUnits || 0);
          const collected = Number(c.collected || 0);
          const progress =
            target > 0 ? Math.min((collected / target) * 100, 100) : 0;

          return (
            <div className="col-md-4" key={c.id}>
              <div className="card shadow-sm h-100">

                <div className="card-body">
                  <span className="badge bg-primary mb-2">
                    {c.status}
                  </span>

                  <h5 className="fw-bold">{c.name}</h5>
                  <div className="small text-muted">
                    {c.venue}, {c.city}
                  </div>
                  <div className="small">{c.date}</div>

                  {/* PROGRESS */}
                  <div className="mt-3">
                    <div className="small">Collection Progress</div>
                    <div className="progress">
                      <div
                        className="progress-bar bg-danger"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <small>
                      {collected}/{target} units
                    </small>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-3 d-flex gap-2">
                    <button className="btn btn-danger btn-sm">
                      Register
                    </button>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => setSelectedCamp(c)}
                    >
                      Details →
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* MODALS */}
      {showCreate && (
        <CreateCampModal onClose={() => setShowCreate(false)} />
      )}

      {selectedCamp && (
        <CampDetailsModal
          camp={selectedCamp}
          onClose={() => setSelectedCamp(null)}
        />
      )}
    </div>
  );
}

/* ===== SMALL STAT CARD ===== */
function Stat({ title, value }) {
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

export default Camps;
