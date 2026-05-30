const express = require('express');
const Client = require('../models/client');
const Vehicle = require('../models/vehicle');
const Service = require('../models/service');
const router = express.Router();
const mongoose = require('mongoose');
const clientUtils = require('../utils/clientUtils');

// Routes \\


// GET: Get all clients \\
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clients.' });
  }
});


//Get by ID (View)
router.get('/:id', async (req, res) => {
  try {
    const clientId = req.params.id;

    //validate ID
    if (!mongoose.Types.ObjectId.isValid(clientId)) {
      return res.status(400).json({ error: 'Client with id is invalid' });
    }

    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ error: 'Client does not exist' });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error('Error fetching client with id %s', error);
    res.status(500).json({ error: 'Failed to fetch client with id %s' });
  }
})


//Counter for clients
router.get('/dash/count', async (req, res) => {
  try {
    const count = await Client.countDocuments();
    res.json(count);
  } catch (error) {
    console.error('Error fetching client count:', error);
    res.status(500).json({ error: 'Failed to fetch count.' });
  }
})


// POST: Create a new client \\
router.post('/', async (req, res) => {
  try {
    req.body.phoneNumber = clientUtils.formatPhoneNumber(req.body.phoneNumber);
    const client = new Client(req.body);
    await client.save();
    res.status(201).send(client);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create client.' });
  }
});


// DELETE: Delete a client \\
router.delete('/:id', async (req, res) => {
  try {
    const deleteClient = await Client.deleteOne({ _id: req.params.id });
    res.status(200).send(deleteClient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete client.' });
  }
});


// PUT: Update a client \\
router.put('/edit-client/:id', async (req, res) => {
  try {
    req.body.phoneNumber = clientUtils.formatPhoneNumber(req.body.phoneNumber);
    const updateClient = await Client.updateOne(
      { _id: req.params.id },
      {$set: req.body }
    );

    res.status(200).json(updateClient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update client.' });
  }
})

// Get a vehicle for a client
router.get("/client/:clientId", async (req, res) => {
  const vehicles = await Vehicle.find({ clientId: req.params.clientId });
  res.json(vehicles);
})

// Services for one vehicle
router.get("/vehicle/:vehicleId", async (req, res) => {
  const services = await Service.find({ vehicleId: req.params.vehicleId });
  res.json(services);
});

module.exports = router;
