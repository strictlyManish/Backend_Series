require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = () =>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Database conected 🚀")
    })
    .catch(()=>{
        console.log("Database conection failed ❗")
    })
};


module.exports = connectDB;