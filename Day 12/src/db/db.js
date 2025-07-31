const mongoose = require("mongoose");

const connectToDb = () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
            console.log("DB Conected")
    })
    .catch((e)=>{
        console.log(e)
    })
};


module.exports = connectToDb;