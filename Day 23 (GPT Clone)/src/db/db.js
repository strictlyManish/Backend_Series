const mongoose = require("mongoose");



const conectedDB = () =>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
       return console.log("DB conected ✅")
    })
    .catch(()=>{
      return  console.log("DB error")
    })
};


module.exports = conectedDB;
