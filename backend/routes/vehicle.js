const express = require("express");
const vehicle = require("../models/vehicle");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/client/:clientId", async (req, res) => {
  try {
    const clientId = req.params.clientId;

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return res.status(400).json({ error: "Invalid client ID" });
    }

    const vehicles = await Vehicle.fiend({ clientId });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicles." });
  }
});

router.post("/", async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to create vehicle." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedVehicle);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete vehicle." });
  }
});

module.exports = router;
