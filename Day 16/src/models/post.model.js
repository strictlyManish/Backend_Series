const mongoose = require("mongoose");


const postScheam = new mongoose.Schema({
    image:String,
    caption:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
});

const postModel = mongoose.model("post",postScheam);

module.exports = postModel;