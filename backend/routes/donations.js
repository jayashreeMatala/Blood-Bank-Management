const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");
const Donor = require("../models/Donor");


// 🔥 ADD DONATION
router.post("/", async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();

    // 🔥 Update Donor Automatically
    await Donor.findByIdAndUpdate(req.body.donor, {
      $inc: { donations: 1 },
      lastDonation: req.body.donationDate
    });

    res.status(201).json({
      message: "Donation recorded successfully",
      donation
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔥 GET ALL DONATIONS
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("donor", "name bloodGroup");

    res.json(donations);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;