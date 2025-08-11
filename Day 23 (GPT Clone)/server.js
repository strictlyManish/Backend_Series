require("dotenv").config();
const conectedDB = require("./src/db/db");
const app = require("./src/app");





conectedDB();
app.listen(3000,()=>{
    console.log("server runnig on port 3000")
});