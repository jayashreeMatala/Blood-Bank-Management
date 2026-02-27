<div className="col-md-4">
  <div
    className="card shadow-sm"
    style={{
      border: "1px solid #e5e7eb",
      borderRadius: "12px",
    }}
  >
    <div className="card-body">

      {/* TOP ROW */}
      <div className="d-flex justify-content-between align-items-start">
        <div className="d-flex gap-3">

          {/* RED AVATAR (BLUE REMOVED) */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "10px",
              background: "#ef4444",   // 🔴 RED
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
            }}
          >
            👤
          </div>

          <div>
            <h6 className="mb-0">Amit Kumar</h6>
            <small className="text-muted">
              +91 9876543212
            </small>
          </div>
        </div>

        {/* COMPLETED BADGE – SAME SIZE, SOFT GREEN */}
        <span
          style={{
            background: "#ecfdf5",
            color: "#16a34a",
            border: "1px solid #86efac",
            padding: "4px 10px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          Completed
        </span>
      </div>

      <hr />

      {/* DETAILS */}
      <p className="mb-1">🩸 <strong>B+</strong></p>
      <p className="mb-1">
        📅 Wednesday, Jan 15, 2025
      </p>
      <p className="mb-1">
        ⏰ 09:00 - 09:30
      </p>
      <p className="mb-2">
        📍 Corporate Donation Camp
      </p>

      {/* TAG */}
      <span
        style={{
          border: "1px solid #e5e7eb",
          padding: "4px 12px",
          borderRadius: "8px",
          fontSize: "12px",
          display: "inline-block",
        }}
      >
        Camp Donation
      </span>

      {/* BUTTON */}
      <button
        className="btn w-100 mt-3"
        style={{
          border: "1px solid #e5e7eb",
          background: "#fff",
        }}
        onClick={() => setShowDetails(true)}
      >
        View Details →
      </button>

    </div>
  </div>
</div>
