const express = require("express");
const Vehicle = require("../models/vehicle");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/client/:clientId", async (req, res) => {
  try {
    const clientId = req.params.clientId;

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return res.status(400).json({ error: "Invalid client ID" });
    }

    const vehicles = await Vehicle.find({ clientId });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicles." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const vehicleId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ error: "Invalid vehicle ID" });
    }

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    res.status(500).json({ error: "Failed to fetch vehicle." });
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

router.put("/edit-vehicle/:id", async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    res.status(200).json(updatedVehicle);
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ error: "Failed to update vehicle." });
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
