const express = require("express");
const router = express.Router();
const Label = require("../models/label");

// Create a new label
router.post("/", async (req, res) => {
  const { name, image_url, description } = req.body;

  try {
    const newLabel = new Label({
      name,
      image_url,
      description,
    });

    await newLabel.save();
    res.status(201).json(newLabel);
  } catch (error) {
    console.error("Error creating label:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all labels
router.get("/", async (req, res) => {
  try {
    const labels = await Label.find();
    res.json(labels);
  } catch (error) {
    console.error("Error fetching labels:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
