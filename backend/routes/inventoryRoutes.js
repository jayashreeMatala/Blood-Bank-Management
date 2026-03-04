const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");


// 🔥 CREATE STOCK
router.post("/", async (req, res) => {
  try {
    const stock = await Inventory.create(req.body);
    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔥 GET ALL STOCK
router.get("/", async (req, res) => {
  try {
    const stocks = await Inventory.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔥 DELETE STOCK
router.delete("/:id", async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "Stock deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// 🔥 RESERVE BLOOD
router.put("/reserve", async (req, res) => {
  try {
    const { bloodGroup, units } = req.body;

    let remaining = units;

    const stocks = await Inventory.find({
      bloodGroup,
      status: "Stored"
    }).sort({ expiryDate: 1 });

    for (let stock of stocks) {
      if (remaining <= 0) break;

      const available =
        stock.units - (stock.reservedUnits || 0);

      if (available > 0) {
        const reserve = Math.min(available, remaining);

        stock.reservedUnits =
          (stock.reservedUnits || 0) + reserve;

        remaining -= reserve;

        await stock.save();
      }
    }

    if (remaining > 0) {
      return res
        .status(400)
        .json({ message: "Not enough stock" });
    }

    res.json({ message: "Blood reserved successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// 🔥 GET INVENTORY SUMMARY FOR DASHBOARD
router.get("/summary", async (req, res) => {
  try {

    const stocks = await Inventory.find();

    const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    const summary = groups.map(group => {
      const total = stocks
        .filter(s => s.bloodGroup === group && s.status === "Stored")
        .reduce((sum, s) => sum + (s.units - (s.reservedUnits || 0)), 0);

      return {
        blood: group,
        units: total
      };
    });

    res.json(summary);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;