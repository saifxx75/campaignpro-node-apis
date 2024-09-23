const express = require('express');
const extractUserIdFromToken = require('../middlewares/extractUserIdFromToken');


const {
    register,
    logIn
} = require('../controllers/authController');

router = express.Router();

router.post('/register', register);
router.post('/logIn', logIn);



module.exports = router;