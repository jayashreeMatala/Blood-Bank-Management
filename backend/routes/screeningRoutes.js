const express = require("express");
const router = express.Router();
const Screening = require("../models/Screening");
const Donor = require("../models/Donor");

// CREATE SCREENING
router.post("/", async (req, res) => {
  try {
    const {
      donor,
      hemoglobin,
      pulse,
      weight,
      bp,
      temp,
      answers,
      status,
      nextEligible,
      deferralReason
    } = req.body;

    const screening = await Screening.create({
      donor,
      hemoglobin,
      pulse,
      weight,
      bp,
      temp,
      answers,
      status,
      nextEligible,
      deferralReason
    });

    // 🔥 UPDATE DONOR STATUS
    await Donor.findByIdAndUpdate(donor, {
      screeningStatus: status,
      eligibility: status === "Eligible" ? "Eligible" : "Not Eligible",
      lastScreenedDate: new Date()
    });

    res.status(201).json(screening);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL SCREENINGS
router.get("/", async (req, res) => {
  try {
    const screenings = await Screening.find()
      .populate("donor", "name blood phone");

    res.json(screenings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;