const express = require("express");
const validateUser = require('../middlewares/validateUser');
const validateAdmin = require('../middlewares/validateAdmin');

const { 
    createRole,
 } = require("../controllers/roleController");

router = express.Router();

router.post('/createRole', validateAdmin, createRole);

module.exports = router;
