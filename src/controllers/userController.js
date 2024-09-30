const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const app = express();
app.use(express.json());

const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({
      status: 400,
      error: "Validation Error",
      message: "All fields are required",
    });
  }
});

module.exports = {
  submitContactForm,
};
