const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;



    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      role
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }


    const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// 🔒 Protected Profile Route
router.get("/profile", protect, async (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

// 👮 Admin Only Route
router.get("/admin", protect, authorize("admin"), async (req, res) => {
  res.json({
    message: "Welcome Admin!",
    user: req.user
  });
});

module.exports = router;