require("dotenv").config();
const mongoose = require("mongoose");


const connecDB = () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Database Conected 🚀")
    })
    .catch(()=>{
        console.log("Conection error of database")
    })
};

module.exports = connecDB;