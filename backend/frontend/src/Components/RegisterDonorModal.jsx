import { useDonors } from "../context/DonorContext";
import { useState } from "react";

function RegisterDonorModal({ donor, isEdit = false, onClose }) {
  const { addDonor, updateDonor } = useDonors();

  const [form, setForm] = useState({
    id: donor?.id || null,
    name: donor?.name || "",
    email: donor?.email || "",
    phone: donor?.phone || "",
    dob: donor?.dob || "",
    gender: donor?.gender || "",
    blood: donor?.blood || "",
    weight: donor?.weight || "",
    city: donor?.city || "",
    state: donor?.state || "",
    pincode: donor?.pincode || "",
    notes: donor?.notes || ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.blood) {
      alert("Please fill required fields");
      return;
    }

    if (isEdit) {
      // ✏️ EDIT DONOR
      updateDonor(form);
    } else {
      // ➕ REGISTER DONOR
      addDonor({
        name: form.name,
        phone: form.phone,
        email: form.email,
        blood: form.blood,
        city: form.city,
        dob: form.dob,
        gender: form.gender,
        weight: form.weight,
        state: form.state,
        pincode: form.pincode,
        notes: form.notes
      });
    }

    onClose(); // modal band
  };

  return (
    <div className="modal fade show d-block" style={{ background: "#00000080" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title">
              {isEdit ? "Edit Donor" : "Register New Donor"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">

            <h6 className="mb-3">Personal Information</h6>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Full Name *</label>
                <input
                  className="form-control"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone Number *</label>
                <input
                  className="form-control"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <h6 className="mb-3">Blood Information</h6>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Blood Group *</label>
                <select
                  className="form-select"
                  name="blood"
                  value={form.blood}
                  onChange={handleChange}
                >
                  <option value="">Select blood group</option>
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>O+</option><option>O-</option>
                  <option>AB+</option><option>AB-</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Weight (kg)</label>
                <input
                  className="form-control"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h6 className="mb-3">Address</h6>
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label">City</label>
                <input
                  className="form-control"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">State</label>
                <input
                  className="form-control"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Pincode</label>
                <input
                  className="form-control"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h6 className="mb-3">Medical Information</h6>
            <textarea
              className="form-control"
              rows="3"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any medical conditions, allergies, or notes..."
            />
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleSubmit}>
              {isEdit ? "Update Donor" : "Register Donor"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RegisterDonorModal;
