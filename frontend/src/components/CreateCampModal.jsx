import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateCampModal = ({ onClose, onCreate, editData }) => {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    address: "",
    city: "",
    state: "",
    organizer: "",
    phone: "",
    startTime: "",
    endTime: "",
    total: "",
    status: "Upcoming",
    image: null,
    collected: 0,
  });

  // ✅ PREFILL WHEN EDITING
  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = () => {
    onCreate(form);
    onClose();
  };

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content p-4">

          <div className="d-flex justify-content-between mb-4">
            <h5>{editData ? "Edit Camp" : "Create New Camp"}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="d-flex justify-content-center mb-4 gap-3">
            {[1, 2, 3].map(n => (
              <div
                key={n}
                className={`rounded-circle px-3 py-2 ${
                  step >= n ? "bg-danger text-white" : "bg-light"
                }`}
              >
                {n}
              </div>
            ))}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <input name="title" value={form.title} onChange={handleChange} className="form-control mb-3" placeholder="Camp Name *" />
              <textarea name="description" value={form.description} onChange={handleChange} className="form-control mb-3" placeholder="Description" />
              <div className="row">
                <div className="col-md-6">
                  <input name="location" value={form.location} onChange={handleChange} className="form-control mb-3" placeholder="Venue *" />
                </div>
                <div className="col-md-6">
                  <input type="date" name="date" value={form.date} onChange={handleChange} className="form-control mb-3" />
                </div>
              </div>
              <div className="text-end">
                <button className="btn btn-danger" onClick={() => setStep(2)}>Next Step</button>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <input name="address" value={form.address} onChange={handleChange} className="form-control mb-3" placeholder="Full Address" />
              <div className="row">
                <div className="col-md-6">
                  <input name="city" value={form.city} onChange={handleChange} className="form-control mb-3" placeholder="City" />
                </div>
                <div className="col-md-6">
                  <input name="state" value={form.state} onChange={handleChange} className="form-control mb-3" placeholder="State" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <input name="organizer" value={form.organizer} onChange={handleChange} className="form-control mb-3" placeholder="Organizer Name" />
                </div>
                <div className="col-md-6">
                  <input name="phone" value={form.phone} onChange={handleChange} className="form-control mb-3" placeholder="Contact Phone" />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-outline-secondary" onClick={() => setStep(1)}>Previous</button>
                <button className="btn btn-danger" onClick={() => setStep(3)}>Next Step</button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <div className="row">
                <div className="col-md-6">
                  <input type="time" name="startTime" value={form.startTime} onChange={handleChange} className="form-control mb-3" />
                </div>
                <div className="col-md-6">
                  <input type="time" name="endTime" value={form.endTime} onChange={handleChange} className="form-control mb-3" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <input name="total" value={form.total} onChange={handleChange} className="form-control mb-3" placeholder="Target Blood Units" />
                </div>
                <div className="col-md-6">
                  <select name="status" value={form.status} onChange={handleChange} className="form-control mb-3">
                    <option>Upcoming</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <button className="btn btn-outline-secondary" onClick={() => setStep(2)}>Previous</button>
                <button className="btn btn-danger" onClick={handleSubmit}>
                  {editData ? "Update Camp" : "Create Camp"}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default CreateCampModal;
