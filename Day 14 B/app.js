const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("./src/routes/index.routes");

const app = express();

app.use(express.json());             
app.use(cookieParser());              

app.use("/auth", routes);             

module.exports = app;
