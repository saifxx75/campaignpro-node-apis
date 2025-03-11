const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Role = require('../models/roleModel');   
const Expense = require('../models/expenseModel'); 

const addExpense = asyncHandler(async(req, res) => {
    const {expenseName, expenseAmount, expenseCategory, expenseDate} = req.body;
    if(!expenseName || !expenseAmount || !expenseCategory || !expenseDate){
        return res.status(400).json({
            status: 400,
            error: 'Validation Error',
            message: 'All fields are required'
        });
    }
    else{
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({
                status: 404,
                error: 'Not Found',
                message: 'User not found'
            });
        }
        else{
            const newExpense = await Expense.create({
                userId: user._id,
                expenseName,
                expenseAmount,
                expenseCategory,
                expenseDate
            });
            return res.status(201).json({
                status: 201,
                error: 'Success',
                message: 'Expense added successfully',
                data: newExpense
            });
        }
    }
});

module.exports = {
    addExpense
}
