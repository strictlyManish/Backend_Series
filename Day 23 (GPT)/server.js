require("dotenv").config();
const app = require("./src/app");
const conecteDB = require("./src/db/db");


conecteDB()
app.listen(3000,()=>{
    console.log("Server runnig on port 3000")
});