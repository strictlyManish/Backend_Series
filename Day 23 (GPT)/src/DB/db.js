const mongoose = require("mongoose");


const connectDB = () =>{
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Connected  Successfully")
    } catch (error) {
        console.log("Database facing somthing error")
    }
};

module.exports = connectDB;