const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');


const validateUser = asyncHandler(async(req, res, next) => {
   try {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
     return res.status(401).json({
        status: 401,
        error: 'Unauthorized',
        message: 'Unauthorized Access',
     });
    }
    const token = authHeader.split(' ')[1];

    // verify Token
    const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    const currentTimestamp = Math.floor(Date.now()/ 1000); //Convert into seconds
    if(decode.exp && decode.exp < currentTimestamp){
        return res.status(401).json({
            status: 401,
            error: 'Unauthorized',
            message: 'Token has expired',
        });
    }
    
    const user = await User.findOne({_id: decode.userId});
    if(!user){
        return  res.status(401).json({
            status: 401,
            error: 'Unauthorized',
            message: 'User is not authorized',
        });
    }
    next();
   } catch(err){
    res.status(401).json({
        status: 401,
        error: 'Unauthorized',
        message: 'Please sign in again',
    });
   }
});

module.exports = {
    validateUser
}