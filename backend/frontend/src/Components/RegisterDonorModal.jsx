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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let newErrors = {};

    // Required fields
    if (!form.name.trim()) {
      newErrors.name = "Full Name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!form.blood) {
      newErrors.blood = "Blood group is required";
    }

    // Email validation (optional)
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    // Age validation
    if (form.dob) {
      const birthDate = new Date(form.dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.dob = "Donor must be at least 18 years old";
      }
    }

    // Weight validation
    if (form.weight && Number(form.weight) < 50) {
      newErrors.weight = "Minimum weight must be 50 kg";
    }

    // Pincode validation
    if (form.pincode && !/^[0-9]{6}$/.test(form.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    if (isEdit) {
      updateDonor(form);
    } else {
      addDonor({
        ...form,
        status: "Active",
        donations: 0
      });
    }

    onClose();
  };

  return (
    <div className="modal fade show d-block" style={{ background: "#00000080" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              {isEdit ? "Edit Donor" : "Register New Donor"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

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
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone Number *</label>
                <input
                  className="form-control"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && <small className="text-danger">{errors.phone}</small>}
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
                {errors.dob && <small className="text-danger">{errors.dob}</small>}
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
                {errors.blood && <small className="text-danger">{errors.blood}</small>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Weight (kg)</label>
                <input
                  className="form-control"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                />
                {errors.weight && <small className="text-danger">{errors.weight}</small>}
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
                {errors.pincode && <small className="text-danger">{errors.pincode}</small>}
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
