const express = require('express');
const jwt = require('jsonwebtoken');
const Role = require('../models/roleModel');
const User = require('../models/userModel');
const { addExpense } = require('../controllers/dashboardController');

router = express.Router();
router.post('/addExpense', addExpense);

module.exports = router;