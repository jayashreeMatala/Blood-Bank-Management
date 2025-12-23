import { useState } from "react";

function Camps() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const camps = [
    {
      id: 1,
      title: "Community Center Blood Camp",
      organizer: "Red Cross Chicago",
      status: "Upcoming",
      date: "Wednesday, March 5, 2025",
      time: "08:00 - 15:00",
      location: "Downtown Community Center",
      city: "Chicago",
      coordinator: "Tom Anderson",
      phone: "+1 555-0202",
      donors: "0 / 80"
    },
    {
      id: 2,
      title: "University Campus Donation Day",
      organizer: "University Medical Center",
      status: "Upcoming",
      date: "Tuesday, February 25, 2025",
      time: "10:00 - 16:00",
      location: "Student Union Building",
      city: "Boston",
      coordinator: "Dr. Maria Garcia",
      phone: "+1 555-0201",
      donors: "0 / 150"
    },
    {
      id: 3,
      title: "City Hospital Blood Drive",
      organizer: "City Health Department",
      status: "Upcoming",
      date: "Thursday, February 20, 2025",
      time: "09:00 - 17:00",
      location: "City General Hospital, Main Lobby",
      city: "New York",
      coordinator: "Dr. James Lee",
      phone: "+1 555-0200",
      donors: "0 / 100"
    }
  ];

  const filteredCamps = camps.filter((c) => {
    const matchFilter =
      filter === "All" || c.status === filter;
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  return (
    <div>
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="fw-bold mb-0">Donation Camps</h2>
          <p className="text-muted">
            Manage blood donation events and campaigns
          </p>
        </div>

        <button className="btn btn-danger">
          + Create Camp
        </button>
      </div>

      {/* FILTERS */}
      <div className="d-flex align-items-center gap-2 mb-4">
        {["All", "Upcoming", "Ongoing", "Completed"].map(
          (f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn btn-sm ${
                filter === f
                  ? "btn-light border"
                  : "btn-outline-secondary"
              }`}
            >
              {f}
            </button>
          )
        )}

        <input
          className="form-control ms-auto"
          style={{ maxWidth: "260px" }}
          placeholder="Search camps..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CAMP CARDS */}
      <div className="row g-4">
        {filteredCamps.map((c) => (
          <div className="col-md-4" key={c.id}>
            <div className="card shadow-sm h-100">
              {/* RED HEADER */}
              <div className="bg-danger text-white p-3 rounded-top">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="fw-bold mb-0">
                      {c.title}
                    </h6>
                    <small>{c.organizer}</small>
                  </div>

                  <span className="badge bg-light text-primary">
                    {c.status}
                  </span>
                </div>
              </div>

              {/* BODY */}
              <div className="card-body">
                <div className="mb-2">
                  📅 <strong>{c.date}</strong>
                  <div className="text-muted small">
                    {c.time}
                  </div>
                </div>

                <div className="mb-2">
                  📍 {c.location}
                  <div className="text-muted small">
                    {c.city}
                  </div>
                </div>

                <div className="mb-2">
                  📞 {c.coordinator}
                  <div className="text-muted small">
                    {c.phone}
                  </div>
                </div>

                <div className="text-muted small">
                  👥 {c.donors} donors
                </div>
              </div>

              {/* ACTIONS */}
              <div className="d-flex justify-content-end gap-3 px-3 pb-3">
                ✏️ 🗑️
              </div>
            </div>
          </div>
        ))}

        {filteredCamps.length === 0 && (
          <div className="text-center text-muted py-5">
            No camps found
          </div>
        )}
      </div>
    </div>
  );
}

export default Camps;
