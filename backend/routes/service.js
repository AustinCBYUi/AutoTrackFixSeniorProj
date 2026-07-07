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

router.get("/vehicle/:vehicleId", async (req, res) => {
  try {
    const vehicleId = req.params.vehicleId;

    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ error: "Invalid vehicle ID" });
    }

    const services = await Service.find({ vehicleId });
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching vehicle services:", error);
    res.status(500).json({ error: "Failed to fetch vehicle services." });
  }
});

router.get("/client/:clientId", async (req, res) => {
  try {
    const clientId = req.params.clientId;

    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return res.status(400).json({ error: "Invalid client ID" });
    }

    const services = await Service.find({ clientId });
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching client services:", error);
    res.status(500).json({ error: "Failed to fetch client services." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const serviceId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({ error: "Invalid service ID" });
    }

    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ error: "Failed to fetch service." });
  }
});

router.put("/edit-service/:id", async (req, res) => {
  try {
    const updatedService = await Service.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    res.status(200).json(updatedService);
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Failed to update service." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedService = await Service.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedService);
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Failed to delete service." });
  }
})

module.exports = router;
