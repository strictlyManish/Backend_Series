require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/db/db");



connectToDb()
app.listen(3000,()=>{
    console.log("Server runnig on port no 3000")
})