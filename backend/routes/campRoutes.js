const express = require("express");
const router = express.Router();

const {
  getCamps,
  createCamp,
  updateCamp,
  registerDonor,
  deleteCamp
} = require("../controllers/campController");

router.get("/", getCamps);

router.post("/", createCamp);

router.put("/:id", updateCamp);

router.put("/register/:id", registerDonor);
router.delete("/:id", deleteCamp);

module.exports = router;