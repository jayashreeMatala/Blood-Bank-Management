import { useState } from "react";
import { useAppointments } from "../context/AppointmentContext";

function BookAppointmentModal({ onClose, selectedDate }) {
  const { addAppointment } = useAppointments();

  const [form, setForm] = useState({
    donor: "",
    phone: "",
    blood: "",
    type: "Whole Blood",
    date: selectedDate,
    time: "09:00",
    location: "Main Blood Bank",
    notes: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    if (!form.donor || !form.phone || !form.date || !form.time) {
      alert("Required fields missing");
      return;
    }

    addAppointment(form);
    onClose();
  };

  return (
    <div className="modal fade show d-block" style={{ background: "#00000080" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">📅 Book Appointment</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="row g-3">

              <div className="col-md-6">
                <label>Donor Name *</label>
                <input className="form-control" name="donor" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Phone Number *</label>
                <input className="form-control" name="phone" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Blood Group</label>
                <select className="form-select" name="blood" onChange={handleChange}>
                  <option>Select blood group</option>
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>O+</option><option>O-</option>
                  <option>AB+</option><option>AB-</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Donation Type</label>
                <select className="form-select" name="type" onChange={handleChange}>
                  <option>Whole Blood</option>
                  <option>Plasma</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Appointment Date *</label>
                <input type="date" className="form-control" name="date" value={form.date} onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Appointment Time *</label>
                <select className="form-select" name="time" onChange={handleChange}>
                  {["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","14:00","14:30","15:00","15:30"].map(t =>
                    <option key={t}>{t}</option>
                  )}
                </select>
              </div>

              <div className="col-md-12">
                <label>Notes</label>
                <textarea className="form-control" rows="3" name="notes" onChange={handleChange} />
              </div>

            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={submit}>
              Book Appointment
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BookAppointmentModal;
