require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = () =>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("DB conected")
    })
    .catch((e)=>{
        console.log(e)
    })
};


module.exports = connectDB