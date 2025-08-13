require("dotenv").config();
const http = require('http');
const conectedDB = require("./src/db/db");
const app = require("./src/app");
const conectShokets = require("./src/shokets/shoket");

const httpServer = http.createServer(app);

conectShokets(httpServer)


conectedDB();

httpServer .listen(3000,()=>{
    console.log("server runnig on port 3000")
});