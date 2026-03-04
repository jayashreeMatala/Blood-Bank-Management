const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");


// 🔥 CREATE APPOINTMENT
router.post("/", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔥 GET ALL APPOINTMENTS
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔥 UPDATE STATUS (General)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// 🔥 APPROVE APPOINTMENT
router.patch("/:id/approve", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: "Approved",
        rejectionReason: ""
      },
      { new: true }
    );

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 REJECT APPOINTMENT
router.patch("/:id/reject", async (req, res) => {
  try {
    const { reason } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: "Rejected",
        rejectionReason: reason
      },
      { new: true }
    );

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 MARK APPOINTMENT AS COMPLETED
router.patch("/:id/complete", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        status: "Completed"
      },
      { new: true }
    );

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 DELETE APPOINTMENT
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;