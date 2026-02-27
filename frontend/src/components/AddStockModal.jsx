import { useState } from "react";
import { useInventory } from "../context/InventoryContext";


function AddStockModal({ onClose }) {
  const { addBatch } = useInventory();

  const [form, setForm] = useState({
    batchId: "BATCH-" + Date.now(),
    blood: "",
    units: 1,
    status: "Collected",
    collectionDate: "",
    expiryDate: "",
    test: "Pending",
    location: "",
    donor: "",
    camp: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
  if (!form.blood || !form.units || !form.expiryDate) {
    alert("Required fields missing");
    return;
  }

  addBatch({
    id: form.batchId,
    blood: form.blood,
    units: Number(form.units),      // IMPORTANT
    status: form.status,
    test: form.test,
    expiry: form.expiryDate,        // IMPORTANT (name match)
    location: form.location,
    donor: form.donor,
    camp: form.camp,
    collectionDate: form.collectionDate
  });

  onClose();
};


  return (
    <div className="modal fade show d-block" style={{ background: "#00000080" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">➕ Add New Stock</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <div className="row g-3">

              <div className="col-md-6">
                <label>Batch ID</label>
                <input className="form-control" value={form.batchId} disabled />
              </div>

              <div className="col-md-6">
                <label>Blood Group *</label>
                <select className="form-select" name="blood" onChange={handleChange}>
                  <option value="">Select blood group</option>
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>O+</option><option>O-</option>
                  <option>AB+</option><option>AB-</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Units</label>
                <input className="form-control" name="units" type="number" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Status</label>
                <select className="form-select" name="status" onChange={handleChange}>
                  <option>Collected</option>
                  <option>Stored</option>
                  <option>Testing</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Collection Date</label>
                <input type="date" className="form-control" name="collectionDate" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Expiry Date *</label>
                <input type="date" className="form-control" name="expiryDate" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Test Result</label>
                <select className="form-select" name="test" onChange={handleChange}>
                  <option>Pending</option>
                  <option>Passed</option>
                  <option>Failed</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Storage Location</label>
                <input className="form-control" name="location" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Donor Name</label>
                <input className="form-control" name="donor" onChange={handleChange} />
              </div>

              <div className="col-md-6">
                <label>Camp Name</label>
                <input className="form-control" name="camp" onChange={handleChange} />
              </div>

            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleSubmit}>
              Add Stock
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddStockModal;
