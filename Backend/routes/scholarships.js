const express = require("express");
const router = express.Router();
const Scholarship = require("../models/Scholarship");

// GET /api/scholarships - return all scholarships
router.get("/", async (req, res) => {
  try {
    const scholarships = await Scholarship.find({});
    res.json(scholarships);
  } catch (err) {
    console.error("Error fetching scholarships:", err);
    res.status(500).json({ error: "Server error while fetching scholarships" });
  }
});

module.exports = router;
