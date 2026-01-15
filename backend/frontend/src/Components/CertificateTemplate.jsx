import React from "react";

const CertificateTemplate = React.forwardRef(({ donor }, ref) => {
  return (
    <div ref={ref} style={{
      width: "800px",
      padding: "30px",
      border: "3px solid #ffcccc",
      textAlign: "center",
      fontFamily: "Arial",
      background: "#fff"
    }}>
      <h2 style={{ color: "#e53935" }}>Certificate of Honor</h2>
      <p>Blood Bank Management System</p>

      <h3 style={{ marginTop: "20px" }}>🏅 Gold Hero</h3>

      <p>This is to certify that</p>
      <h1 style={{ color: "#d32f2f" }}>{donor.name}</h1>

      <p>has selflessly donated</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <div style={{ background: "#e53935", color: "#fff", padding: "15px" }}>
          <h3>1</h3>
          <small>Unit of Blood</small>
        </div>
        <div style={{ background: "#1e88e5", color: "#fff", padding: "15px" }}>
          <h3>{donor.blood}</h3>
          <small>Blood Type</small>
        </div>
      </div>

      <p style={{ marginTop: "20px" }}>on</p>
      <strong>December 10, 2024</strong>

      <p style={{ marginTop: "20px" }}>
        ❤️ Every drop of blood you donate is a gift of life.
      </p>

      <p style={{ marginTop: "30px" }}>
        Total Lifetime Donations: <strong>{donor.donations}</strong>
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
        <div>
          <strong>Medical Director</strong>
          <p>Blood Bank Authority</p>
        </div>
        <div>
          <strong>Administrator</strong>
          <p>Blood Bank Management</p>
        </div>
      </div>
    </div>
  );
});

export default CertificateTemplate;
