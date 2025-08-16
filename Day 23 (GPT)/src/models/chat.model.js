const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    lastActivity:{
        type:Date,
        default:Date.now
    }
},{timstamp:true});


const chatModel = mongoose.model("chats",chatSchema);
module.exports = chatModel