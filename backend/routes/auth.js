const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const User = require("../models/user");
const emailUtils = require("../utils/nodemailer");
require('dotenv').config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists.." })
    }

    const newUser = new User({ email, password, isApproved: false, role: 'base_user' });
    await newUser.save();
    console.log("After save()")

    //Send registration email
    emailUtils.sendEmailNotification(email);

    res.status(201).json({ message: "User registered successfully. Please allow time for registration approval." });

    } catch (error) {
      res.status(400).json({ message: "Server Error" });
      console.log(error);
    }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    if (!user.isApproved) return res.status(400).json({ message: "You have not been approved for login yet." })

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: "Invalid Token" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};

module.exports = { router, authMiddleware };
