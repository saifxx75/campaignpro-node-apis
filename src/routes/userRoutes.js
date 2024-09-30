const express = require("express");
const { submitContactForm } = require("../controllers/userController");

router = express.Router();

router.post('/submitContactForm', submitContactForm);

module.exports = router;