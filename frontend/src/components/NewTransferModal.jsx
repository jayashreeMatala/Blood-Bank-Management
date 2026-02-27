import { useState } from "react";
import { useTransfers } from "../context/TransferContext";

function NewTransferModal({ onClose }) {
  const { addTransfer } = useTransfers();

  const [form, setForm] = useState({
    type: "Outgoing",
    from: "",
    to: "",
    blood: "",
    units: 1,
    date: "",
    notes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.from || !form.to || !form.blood || !form.units || !form.date) {
      alert("Please fill required fields");
      return;
    }

    addTransfer(form);
    onClose();
  };

  return (
    <div className="modal fade show d-block" style={{ background: "#00000080" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">🚚 New Stock Transfer</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">

            <label className="form-label">Transfer Type</label>
            <select className="form-select mb-3" name="type" onChange={handleChange}>
              <option>Outgoing</option>
              <option>Incoming</option>
            </select>

            <label className="form-label">From Location *</label>
            <input className="form-control mb-3" name="from" onChange={handleChange} />

            <label className="form-label">To Location *</label>
            <input className="form-control mb-3" name="to" onChange={handleChange} />

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Blood Group *</label>
                <select className="form-select" name="blood" onChange={handleChange}>
                  <option value="">Select blood group</option>
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>O+</option><option>O-</option>
                  <option>AB+</option><option>AB-</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Units</label>
                <input type="number" className="form-control" name="units" onChange={handleChange} />
              </div>
            </div>

            <label className="form-label mt-3">Transfer Date</label>
            <input type="date" className="form-control mb-3" name="date" onChange={handleChange} />

            <label className="form-label">Notes</label>
            <textarea className="form-control" rows="3" name="notes" onChange={handleChange} />

          </div>

          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleSubmit}>
              Initiate Transfer
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default NewTransferModal;
