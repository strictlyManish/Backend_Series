const mongoose = require("mongoose");

const connectToDb = async () =>{
   await mongoose.connect("mongodb+srv://manishraz800:JAqQJyNF3dhZmpkW@cluster0.q9qavsc.mongodb.net/manish")
   .then(()=>{
        try {
            console.log("Success : Database connected 🚀")
        } catch (e) {
            console.log("Failure : conncetion failed ❗")
        }
   })
};

module.exports = connectToDb;