import { useState } from "react";
import { useCamps } from "../context/CampContext";

function CreateCampModal({ onClose }) {
  const { addCamp } = useCamps();

  const [form, setForm] = useState({
    name: "",
    description: "",
    venue: "",
    address: "",
    city: "",
    state: "",
    date: "",
    status: "Upcoming",
    startTime: "",
    endTime: "",
    organizer: "",
    phone: "",
    targetUnits: 50
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.venue || !form.date) {
      alert("Please fill required fields");
      return;
    }

    addCamp(form);
    onClose();
  };

  return (
    <div className="modal fade show d-block" style={{ background: "#00000080" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">📅 Create New Camp</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <div className="row g-3">

              <div className="col-md-12">
                <label>Camp Name *</label>
                <input className="form-control" name="name" onChange={handleChange} />
              </div>

              <div className="col-md-12">
                <label>Description</label>
                <textarea className="form-control" name="description" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Venue *</label>
                <input className="form-control" name="venue" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Address</label>
                <input className="form-control" name="address" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>City</label>
                <input className="form-control" name="city" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>State</label>
                <input className="form-control" name="state" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Date *</label>
                <input type="date" className="form-control" name="date" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Status</label>
                <select className="form-select" name="status" onChange={handleChange}>
                  <option>Upcoming</option>
                  <option>Ongoing</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Start Time</label>
                <input type="time" className="form-control" name="startTime" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>End Time</label>
                <input type="time" className="form-control" name="endTime" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Organizer</label>
                <input className="form-control" name="organizer" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Contact Phone</label>
                <input className="form-control" name="phone" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Target Units</label>
                <input
                  type="number"
                  className="form-control"
                  name="targetUnits"
                  onChange={handleChange}
                />
              </div>

            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleSubmit}>
              Create Camp
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CreateCampModal;
