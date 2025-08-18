require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/DB/db");
const shoketsSetup = require("./src/Shokets/soket.server");
const httpServer = require("http").createServer(app);


connectDB();
shoketsSetup(httpServer);
httpServer.listen(8000, () => {
    console.log("Server Runnig on port 8000")
});