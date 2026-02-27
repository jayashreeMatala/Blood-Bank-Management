const mongoose = require("mongoose");

const screeningSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      required: true
    },
    hemoglobin: Number,
    pulse: Number,
    weight: Number,
    bp: String,
    temp: Number,
    answers: [String],
    status: String, // Eligible or Temporary Deferral
    nextEligible: Date,
    deferralReason: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Screening", screeningSchema);