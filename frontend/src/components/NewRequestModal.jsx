import { useState } from "react";
import { useRequests } from "../context/RequestContext";

function NewRequestModal({ onClose }) {
  const { addRequest } = useRequests();

  const [form, setForm] = useState({
    hospital: "",
    doctor: "",
    phone: "",
    email: "",
    patient: "",
    blood: "",
    units: 1,
    priority: "Normal",
    date: "",
    reason: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.hospital || !form.blood || !form.units || !form.date) {
      alert("Please fill required fields");
      return;
    }

    addRequest(form);   // ✅ THIS WAS THE MOST IMPORTANT PART
    onClose();
  };

  return (
    <div className="modal fade show d-block" style={{ background: "#00000080" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">❤️ New Blood Request</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">

            <h6>Hospital Information</h6>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label>Hospital Name *</label>
                <input className="form-control" name="hospital" onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Doctor Name</label>
                <input className="form-control" name="doctor" onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Contact Phone</label>
                <input className="form-control" name="phone" onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Contact Email</label>
                <input className="form-control" name="email" onChange={handleChange} />
              </div>
            </div>

            <h6>Request Details</h6>
            <div className="row g-3">
              <div className="col-md-6">
                <label>Patient Name</label>
                <input className="form-control" name="patient" onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Blood Group *</label>
                <select className="form-select" name="blood" onChange={handleChange}>
                  <option value="">Select</option>
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>O+</option><option>O-</option>
                  <option>AB+</option><option>AB-</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>Units Required *</label>
                <input type="number" className="form-control" name="units" onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Priority</label>
                <select className="form-select" name="priority" onChange={handleChange}>
                  <option>Normal</option>
                  <option>Urgent</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>Required Date *</label>
                <input type="date" className="form-control" name="date" onChange={handleChange} />
              </div>
            </div>

            <div className="mt-3">
              <label>Reason</label>
              <textarea className="form-control" rows="3" name="reason" onChange={handleChange} />
            </div>

          </div>

          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleSubmit}>
              Submit Request
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default NewRequestModal;
