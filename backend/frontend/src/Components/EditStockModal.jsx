import { useState } from "react";
import { useInventory } from "../context/InventoryContext";

function EditStockModal({ batch, onClose }) {
  const { updateBatch } = useInventory();

  const [form, setForm] = useState({
    id: batch.id,
    blood: batch.blood,
    units: batch.units,
    status: batch.status,
    test: batch.test,
    expiry: batch.expiry,
    location: batch.location,
    donor: batch.donor || "",
    camp: batch.camp || ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    updateBatch(form);
    onClose();
  };

  return (
    <div className="modal fade show d-block" style={{ background: "#00000080" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Edit Inventory</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <div className="row g-3">

              <div className="col-md-6">
                <label>Batch ID</label>
                <input className="form-control" value={form.id} disabled />
              </div>

              <div className="col-md-6">
                <label>Blood Group</label>
                <select
                  className="form-select"
                  name="blood"
                  value={form.blood}
                  onChange={handleChange}
                >
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>O+</option><option>O-</option>
                  <option>AB+</option><option>AB-</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Units</label>
                <input
                  className="form-control"
                  name="units"
                  value={form.units}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Stored</option>
                  <option>Testing</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Test Result</label>
                <select
                  className="form-select"
                  name="test"
                  value={form.test}
                  onChange={handleChange}
                >
                  <option>Passed</option>
                  <option>Pending</option>
                </select>
              </div>

              <div className="col-md-6">
                <label>Expiry Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="expiry"
                  value={form.expiry}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>Storage Location</label>
                <input
                  className="form-control"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>Donor Name</label>
                <input
                  className="form-control"
                  name="donor"
                  value={form.donor}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label>Camp Name</label>
                <input
                  className="form-control"
                  name="camp"
                  value={form.camp}
                  onChange={handleChange}
                />
              </div>

            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleUpdate}>
              Update
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default EditStockModal;
