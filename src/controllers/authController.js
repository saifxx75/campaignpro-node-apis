const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { isValidEmail, isValidName } = require("../config/function");

const app = express();
app.use(express.json());

const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      status: 400,
      error: "Validation error",
      message: "All Fields are required",
    });
  } else {
    if (!isValidName(firstName) || !isValidName(lastName)) {
      return res.status(400).json({
        status: 400,
        error: "Validation Error",
        message: "Please Provide a valid name",
      });
    } else {
      if (!isValidEmail(email)) {
        return res.status(400).json({
          status: 400,
          error: "Validation Error",
          message: "Please provide a valid email",
        });
      } else {
        const user = await User.findOne({
          email: { $regex: new RegExp("^" + email + "$", "i") },
        });
        if (user) {
          return res.status(400).json({
            status: 400,
            error: "Validation Error",
            message: "User already exists with this email address",
          });
        } else {
          const newEmail = email.toLowerCase();
          const hashedPassword = await bcrypt.hash(password, 10);
          // const today = new Date();
          const newUser = await User.create({
            firstName,
            lastName,
            email: newEmail,
            password: hashedPassword,
          });
          const accessToken = jwt.sign(
            {
              userId: newUser._id,
            },
            process.env.JWT_TOKEN_SECRET,
            { expiresIn: "20m" }
          );
          return res.status(201).json({
            status: 201,
            error: "Success",
            message: "User registration successful",
            bearerToken: accessToken,
          });
        }
      }
    }
  }
});

const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      error: "Validation Error",
      message: "All Fields are mandatory",
    });
  } else {
    if (!isValidEmail(email)) {
      return res.status(400).json({
        status: 400,
        error: "Validation Error",
        message: "Please Provide a Valid Email Address",
      });
    }

    const user = await User.findOne({
      email: { $regex: new RegExp("^" + email + "$", "i") },
    });
    if (user) {
      console.log("Stored Hashed password: ", user.password);
      if (user && (await bcrypt.compare(password, user.password))) {
        await user.save();
        const accessToken = jwt.sign(
          {
            userId: user._id,
          },
          process.env.JWT_TOKEN_SECRET,
          { expiresIn: "20m" }
        );
        res.status(200).json({
          status: 200,
          error: "Success",
          message: "Login Successful",
          bearerToken: accessToken,
        });
      } else {
        res.status(400).json({
          status: 400,
          error: "Validation Error",
          message: "Incorrect Password",
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        error: "Validation Error",
        message: "We cannot find your email address",
      });
    }
  }
});

module.exports = {
  register,
  logIn
};
