const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      required: false
    },

    name: String,
    phone: String,
    email: String,
    bloodGroup: String,

    type: String,
    location: String,

    date: {
      type: Date,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    notes: String,

    status: {
  type: String,
  default: "Requested"
},

rejectionReason: {
  type: String,
  default: ""
}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);