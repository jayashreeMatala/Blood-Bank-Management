const Camp = require("../models/Camp");

/* GET ALL CAMPS */
exports.getCamps = async (req, res) => {
  try {
    const camps = await Camp.find().sort({ createdAt: -1 });
    res.json(camps);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* CREATE CAMP */
exports.createCamp = async (req, res) => {
  try {
    const camp = new Camp(req.body);
    const saved = await camp.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* UPDATE CAMP */
exports.updateCamp = async (req, res) => {
  try {
    const camp = await Camp.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(camp);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* REGISTER DONOR */
exports.registerDonor = async (req, res) => {
  try {
    const camp = await Camp.findById(req.params.id);

    if (!camp) {
      return res.status(404).json({ message: "Camp not found" });
    }

    // 🚫 STOP IF CAMP FULL
    if (camp.collected >= camp.total) {
      return res.status(400).json({
        message: "Camp target already reached"
      });
    }

    camp.collected += 1;

    await camp.save();

    res.json(camp);

  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteCamp = async (req, res) => {
  try {
    await Camp.findByIdAndDelete(req.params.id);
    res.json({ message: "Camp deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};