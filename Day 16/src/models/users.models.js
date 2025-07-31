const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const userModel = mongoose.model("users",user_schema);

module.exports = userModel;