const express = require('express');
const asyncHandler = require('express-async-handler');
const Role = require('../models/roleModel');
const { error } = require('winston');


const createRole = asyncHandler(async(req, res) => {
const {roleId, roleName} = req.body;
if(!roleId || !roleName){
  return res.status(400).json({
    status: 400,
    error: 'Validation Error',
    message: 'All fields are required'
  });
} else{
     const role = await Role.findOne({roleId: roleId})
     
     if(!role){
        const newRole = await Role.create({
            roleId,
            roleName
        });
        console.log(role);
        return res.status(201).json({
            status: 201,
            error: 'Success',
            message: 'Role Created Successfully'

        });
     } else{
        return res.status(400).json({
            status: 400,
            error: 'validation Error',
            message: 'Role already exists with this role ID'
        });
     }
}
});


module.exports = {
    createRole
}