import React, { useState } from "react";
import "./BookAppointment.css";

const BookAppointmentModal = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    donorName: "",
    phone: "",
    bloodGroup: "",
    date: "2026-02-02",
    time: "",
    location: "Tata",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <h3>Book Appointment</h3>
          <button onClick={onClose}>✖</button>
        </div>

        {/* STEP INDICATOR */}
        <div className="steps">
          <div className={step === 1 ? "active" : ""}>1 Donor Info</div>
          <div className={step === 2 ? "active" : ""}>2 Appointment</div>
          <div className={step === 3 ? "active" : ""}>3 Confirm</div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input
              name="donorName"
              placeholder="Full Name"
              value={form.donorName}
              onChange={handleChange}
            />

            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
            />

            <select
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
            </select>

            <button className="btn-next" onClick={() => setStep(2)}>
              Continue
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input type="date" name="date" value={form.date} readOnly />

            <div className="time-grid">
              {["09:00", "09:30", "10:00", "10:30"].map((t) => (
                <button
                  key={t}
                  className={form.time === t ? "time active" : "time"}
                  onClick={() => setForm({ ...form, time: t })}
                >
                  {t}
                </button>
              ))}
            </div>

            <textarea
              name="notes"
              placeholder="Notes (optional)"
              onChange={handleChange}
            />

            <div className="actions">
              <button onClick={() => setStep(1)}>Back</button>
              <button onClick={() => setStep(3)}>Review</button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h4>Review Appointment</h4>

            <p><b>Donor:</b> {form.donorName}</p>
            <p><b>Blood Group:</b> {form.bloodGroup}</p>
            <p><b>Date:</b> {form.date}</p>
            <p><b>Time:</b> {form.time}</p>
            <p><b>Location:</b> {form.location}</p>

            <div className="actions">
              <button onClick={() => setStep(2)}>Back</button>
              <button className="confirm">Confirm Booking</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookAppointmentModal;
