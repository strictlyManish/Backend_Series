const mongosse = require("mongoose");


const connectDB = () =>{
    mongosse.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("DB conected 🚀")
    })
    .catch(()=>{
        console.log("Database conection error ")
    })
};


module.exports = connectDB;