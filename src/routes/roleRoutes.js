const express = require("express");
const validateAdmin = require('../middlewares/validateAdmin');

const { 
    createRole,
 } = require("../controllers/roleController");

router = express.Router();

router.post('/createRole', validateAdmin, createRole);

module.exports = router;
