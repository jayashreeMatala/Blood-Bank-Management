const express = require("express");
const router = express.Router();
const Donor = require("../models/Donor");
const Inventory = require("../models/Inventory");

// 🔥 DASHBOARD STATS
router.get("/stats", async (req, res) => {
  try {

    const donors = await Donor.countDocuments();
    const Donation = require("../models/Donation");
const totalDonations = await Donation.countDocuments();
    const Request = require("../models/Request");

const pendingRequests = await Request.countDocuments({
  status: "Pending"
});

    const inventory = await Inventory.find();

    const totalUnits = inventory.reduce(
      (sum, i) => sum + (i.units - (i.reservedUnits || 0)),
      0
    );

    const lowStock = inventory.filter(i => i.units < 5).length;

res.json({
  totalDonors: donors,
  totalUnits,
  lowStock,
  pendingRequests,
  totalDonations
});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔥 RECENT ACTIVITY
router.get("/activity", async (req, res) => {
  try {

    const Request = require("../models/Request");

    const activity = await Request.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(activity);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// 🔥 ALERTS
router.get("/alerts", async (req, res) => {
  try {

    const inventory = await Inventory.find();
    const today = new Date();

const next7days = new Date();
next7days.setDate(today.getDate() + 7);

const expiring = inventory.filter(i =>
  new Date(i.expiryDate) <= next7days &&
  new Date(i.expiryDate) >= today
);

    const outOfStock = inventory.filter(i => i.units === 0);

    const critical = inventory.filter(i => i.units > 0 && i.units <= 3);

 res.json({
  outOfStock,
  critical,
  expiring
});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/emergency", async (req, res) => {
  try {

    const Request = require("../models/Request");

    const emergency = await Request.findOne({
      priority: "Critical",
      status: "Pending"
    }).sort({ createdAt: -1 });

    res.json(emergency);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// 🔥 TOTAL DONATIONS
router.get("/donations", async (req, res) => {
  try {

    const Donation = require("../models/Donation");

    const totalDonations = await Donation.countDocuments();

    res.json({
      totalDonations
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// 🔥 MONTHLY ACTIVITY
router.get("/monthly", async (req, res) => {
  try {

    const Donation = require("../models/Donation");
    const Request = require("../models/Request");

    const donations = await Donation.countDocuments();
    const requests = await Request.countDocuments();

    res.json({
      months: ["Oct","Nov","Dec","Jan","Feb","Mar"],
      donations: [donations, donations, donations, donations, donations, donations],
      requests: [requests, requests, requests, requests, requests, requests]
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// 🔥 INVENTORY STATUS
router.get("/inventory-status", async (req, res) => {
  try {

    const inventory = await Inventory.find();

    const available = inventory
      .filter(i => i.status === "Stored")
      .reduce((sum, i) => sum + i.units, 0);

    const reserved = inventory
      .reduce((sum, i) => sum + (i.reservedUnits || 0), 0);

    const issued = inventory
      .filter(i => i.status === "Issued")
      .reduce((sum, i) => sum + i.units, 0);

    const today = new Date();

    const expired = inventory
      .filter(i => new Date(i.expiryDate) < today)
      .length;

    res.json({
      available,
      reserved,
      issued,
      expired
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;