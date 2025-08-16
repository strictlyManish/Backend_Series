const mongoose = require("mongoose");


const conecteDB = async () =>{
    try {
      await  mongoose.connect(process.env.MONGODB_URI)
        console.log("DB conected successfully")
    } catch (error) {
        console.log(error)
    }

};


module.exports = conecteDB;