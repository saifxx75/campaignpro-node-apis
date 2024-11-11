const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { error } = require("winston");
const app = express();
const User = require('../models/userModel');
app.use(express.json());

const createUser = asyncHandler(async(req, res)=>{
console.log(req.userId);
const {firstName, lastName, email, password} = req.body;
if(!firstName || !lastName || !email || !password){
  return res.status(400).json({
    status:400,
    error: 'Validation Error',
    message: 'All Fields are required'
  });
}else{
  if(password.length < 5){
    return res.status(400).json({
      status:400,
      error: 'Validation Error',
      message: 'Password must be atleast 6 character long'
    });
  }
  
  const user = await User.findOne({email: { $regex: new RegExp('^' + email + '$', 'i')}});
  
}
})

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
