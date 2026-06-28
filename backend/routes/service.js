const express = require("express");
const Service = require("../models/service");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/vehicle/:vehicleId", async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;

    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ error: "Invalid vehicle ID" });
    }

    const services = await Service.find({ vehicleId });
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services." });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("Service body received:", req.body);

    const service = new Service(req.body);
    await service.save();

    res.status(201).json(service);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({
      error: "Failed to create service.",
      details: error.message
    });
  }
});

module.exports = router;
