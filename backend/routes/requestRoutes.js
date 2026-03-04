const express = require("express");
const router = express.Router();
const Request = require("../models/Request");
const Inventory = require("../models/Inventory");


// =======================
// CREATE REQUEST
// =======================
router.post("/", async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =======================
// GET ALL REQUESTS
// =======================
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =======================
// APPROVE REQUEST
// =======================
router.put("/:id/approve", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    let remaining = request.units;

    const batches = await Inventory.find({
      bloodGroup: request.blood,
      status: "Stored"
    }).sort({ expiryDate: 1 });

    for (let batch of batches) {
      if (remaining <= 0) break;

      const available = batch.units - (batch.reservedUnits || 0);

      if (available > 0) {
        const reserve = Math.min(available, remaining);
        batch.reservedUnits = (batch.reservedUnits || 0) + reserve;
        remaining -= reserve;
        await batch.save();
      }
    }

    if (remaining > 0) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    request.status = "Approved";
    await request.save();

    res.json(request);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =======================
// REJECT REQUEST
// =======================
router.put("/:id/reject", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.status === "Fulfilled") {
      return res.status(400).json({
        message: "Cannot reject fulfilled request"
      });
    }

    // If approved, release reserved stock
    if (request.status === "Approved") {
      let remaining = request.units;

      const batches = await Inventory.find({
        bloodGroup: request.blood
      }).sort({ expiryDate: 1 });

      for (let batch of batches) {
        if (remaining <= 0) break;

        const reserved = batch.reservedUnits || 0;

        if (reserved > 0) {
          const release = Math.min(reserved, remaining);
          batch.reservedUnits -= release;
          remaining -= release;
          await batch.save();
        }
      }
    }

    request.status = "Rejected";
    await request.save();

    res.json(request);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =======================
// FULFILL REQUEST
// =======================
router.put("/:id/fulfill", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    let remainingUnits = request.units;

    const batches = await Inventory.find({
      bloodGroup: request.blood,
      status: "Stored"
    }).sort({ createdAt: 1 });

    for (let batch of batches) {
      if (remainingUnits <= 0) break;

      const availableReserved = batch.reservedUnits || 0;

      if (availableReserved > 0) {
        const deduct = Math.min(availableReserved, remainingUnits);

        batch.units -= deduct;
        batch.reservedUnits -= deduct;
        remainingUnits -= deduct;

        if (batch.units === 0) {
          batch.status = "Issued";
        }

        await batch.save();
      }
    }

    if (remainingUnits > 0) {
      return res.status(400).json({
        message: "Not enough stock available"
      });
    }

    request.status = "Fulfilled";
    await request.save();

    res.json(request);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =======================
// DELETE REQUEST
// =======================
router.delete("/:id", async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // If approved, release reserved stock
    if (request.status === "Approved") {
      let remaining = request.units;

      const batches = await Inventory.find({
        bloodGroup: request.blood
      }).sort({ expiryDate: 1 });

      for (let batch of batches) {
        if (remaining <= 0) break;

        const reserved = batch.reservedUnits || 0;

        if (reserved > 0) {
          const release = Math.min(reserved, remaining);
          batch.reservedUnits -= release;
          remaining -= release;
          await batch.save();
        }
      }
    }

    await Request.findByIdAndDelete(req.params.id);

    res.json({ message: "Request deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;