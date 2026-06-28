const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const clientRoutes = require('./routes/client');
const vehicleRoutes = require("./routes/vehicle");
const serviceRoutes = require("./routes/service");
const { router: authRoutes } = require('./routes/auth');
require('dotenv').config();

const app = express();


// Database connection string
let mongo_uri = process.env.MONGO_URI;


// Middleware \\
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


//Mongo DB Connection
mongoose
  .connect(mongo_uri)
  .then(() => { console.log(`Connected to database successfully on ${Date()}`)})
  .catch((err) => console.error('Database error:', err));


//Routes
app.get('/', (req, res) => {
  res.send('API is running!');
});
app.use('/clients', clientRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/services', serviceRoutes);
app.use('/api/auth', authRoutes);


// Starting Server \\
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
