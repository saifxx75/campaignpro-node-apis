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
   try {
    console.log('Form filled');
    res.status(200).json({
      status: 200,
      error: "Success",
      message: "Form submitted Successfully. We will get back to you shortly."

    })
   } catch (error) {
    console.error(error.reponse.body);
    res.status(500).json({
    status: 500,
    error:  "Internal Server Error",
    message: "Error while submitting form."
    });
   }
});

module.exports = {
  submitContactForm,
};
