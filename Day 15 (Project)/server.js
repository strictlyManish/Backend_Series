const app = require("./src/app");
const connectDB = require("./src/db/db");









connectDB();
app.listen(6000,()=>{
    console.log("Server runnig on port 6000")
});