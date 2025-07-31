const express = require("express");
const app = express();


app.use((req,res,next)=>{
    console.log("costume middlwware runnig b/w app and route");
    next()
})



module.exports = app;