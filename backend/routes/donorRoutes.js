const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");

// Add Donor (with duplicate validation)
router.post("/", async (req, res) => {
  try {

    // 🔍 Check duplicate phone
    const existingPhone = await Donor.findOne({ phone: req.body.phone });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    // 🔍 Check duplicate email (if provided)
    if (req.body.email) {
      const existingEmail = await Donor.findOne({ email: req.body.email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    // ✅ Create donor
    const donor = new Donor(req.body);
    await donor.save();

    res.status(201).json({ message: "Donor added successfully", donor });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { phone, email } = req.body;

    // 🔍 Check duplicate phone (except current donor)
    const existingPhone = await Donor.findOne({
      phone,
      _id: { $ne: req.params.id }
    });

    if (existingPhone) {
      return res.status(400).json({
        message: "Phone number already exists"
      });
    }

    // 🔍 Check duplicate email (except current donor)
    if (email) {
      const existingEmail = await Donor.findOne({
        email,
        _id: { $ne: req.params.id }
      });

      if (existingEmail) {
        return res.status(400).json({
          message: "Email already exists"
        });
      }
    }

    const updatedDonor = await Donor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Donor updated successfully",
      updatedDonor
    });

  } catch (error) {
    console.error("PUT Error:", error);
    res.status(500).json({
      message: "Server error while updating donor"
    });
  }
});

// Delete Donor
router.delete("/:id", async (req, res) => {
  try {
    await Donor.findByIdAndDelete(req.params.id);
    res.json({ message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Donors
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;