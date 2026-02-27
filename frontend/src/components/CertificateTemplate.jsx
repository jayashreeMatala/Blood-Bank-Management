import React from "react";

const CertificateTemplate = React.forwardRef(({ donor }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        width: "794px",          // A4 width
        height: "1123px",        // A4 height
        padding: "30px",
        background: "#fff",
        boxSizing: "border-box",
        position: "relative",
        fontFamily: "Arial",
      }}
    >
      {/* OUTER FRAME */}
      <div
        style={{
          border: "3px solid #ffb300",
          height: "100%",
          padding: "25px",
          boxSizing: "border-box",
        }}
      >
        {/* INNER FRAME */}
        <div
          style={{
            border: "2px solid #ffcccc",
            height: "100%",
            padding: "30px",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{ color: "#e53935", marginBottom: "5px" }}>
            Certificate of Honor
          </h2>
          <p style={{ marginTop: 0 }}>Blood Bank Management System</p>

          <h3 style={{ marginTop: "20px" }}>🏅 Gold Hero</h3>
          <p>This is to certify that</p>

          <h1 style={{ color: "#d32f2f", margin: "15px 0" }}>
            {donor.name}
          </h1>

          <p>has selflessly donated</p>

          {/* BLOOD INFO */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              margin: "20px 0",
            }}
          >
            <div style={boxRed}>
              <h3>1</h3>
              <small>Unit of Blood</small>
            </div>

            <div style={boxBlue}>
              <h3>{donor.blood}</h3>
              <small>Blood Type</small>
            </div>
          </div>

          <p>on</p>
          <strong>December 10, 2024</strong>

          <p style={{ marginTop: "20px" }}>
            ❤️ Every drop of blood you donate is a gift of life.
          </p>

          <p style={{ marginTop: "15px" }}>
            Total Lifetime Donations: <strong>{donor.donations}</strong>
          </p>

          {/* SIGNATURE SECTION */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "80px",
              padding: "0 40px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <img src="/director-sign.png" alt="sign" height="50" />
              <hr />
              <strong>Medical Director</strong>
              <p>Blood Bank Authority</p>
            </div>

            <div style={{ textAlign: "center" }}>
              <img src="/admin-sign.png" alt="sign" height="50" />
              <hr />
              <strong>Administrator</strong>
              <p>Blood Bank Management</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});

export default CertificateTemplate;

const boxRed = {
  background: "#e53935",
  color: "#fff",
  padding: "15px",
  width: "120px",
};

const boxBlue = {
  background: "#1e88e5",
  color: "#fff",
  padding: "15px",
  width: "120px",
};
