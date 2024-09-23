const axios = require('axios');
const http = require('https');


function isValidEmail(email) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}

function isValidName(name) {
    const pattern = /^[a-zA-Z ]+$/;
    return pattern.test(name); 
}

module.exports = {
 isValidEmail,
 isValidName
};