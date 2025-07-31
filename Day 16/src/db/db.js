const mongoose = require("mongoose");

const connectDB = () =>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("DB connected successfully")
    })
    .catch(()=>{
        console.log("DB connection failed")
    })
};


module.exports = connectDB;