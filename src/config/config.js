const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDb = async () => {
 try{
   const connection = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database Conneted: ", connection.connection.host, connection.connection.name);
 }catch(err){
    console.log('Error connecting to the database: ', err);
    process.exit(1);
 }
};

module.exports = connectDb;