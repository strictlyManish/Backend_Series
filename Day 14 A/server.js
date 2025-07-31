const app = require("./src/app");
const connecDB = require("./src/db/db");




connecDB()
app.listen(3000,()=>{
    console.log("Server runnig on port 3000")
});