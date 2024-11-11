const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const validateAdmin = asyncHandler(async(req, res, next) => {
    try{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            status: 401,
            error: 'Unauthorized',
            message: 'Unauthorized access',
        });
    }

    //extract Bearer token from authHeader
    const token = authHeader.split(' ')[1];
    const decode = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    const currentTimestamp = Math.floor(Date.now()/1000);
    if(decode.exp && decode.exp < currentTimestamp){
      return res.status(401).json({
        status: 401,
        error: 'Unauthorized',
        message: 'Token has expired',
      });
    }

    const user = await User.findOne({_id: decode.userId});
    if(!user || user.roleId !== '651c23eac5e7c88757479418' || user.status.trim() !== 'Active'){
    return res.status(401).json({
        status: 401,
        error: 'Unauthorized',
        message: 'User is not authorized. Only Admins has rights to access this resources'
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
    validateAdmin
}