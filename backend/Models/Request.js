const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  hospital: { type: String, required: true },
  doctor: String,
  phone: String,
  email: String,
  patient: String,
  blood: { type: String, required: true },
  units: { type: Number, required: true },
  priority: { type: String, default: "Normal" },
  date: { type: Date, required: true },
  reason: String,
  status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Request", requestSchema);

