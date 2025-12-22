const mongoose = require("mongoose");

const DonorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  bloodGroup: String,
  phone: String,
  email: String,
  lastDonation: Date,
  status: { type: String, default: "Active" }
});

module.exports = mongoose.model("Donor", DonorSchema);
