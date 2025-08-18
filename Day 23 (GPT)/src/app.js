const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const authentication = require("../src/Routes/user.route");
const chatRoute = require("../src/Routes/chat.route");


//Middlewares
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authentication);
app.use("/api", chatRoute);



module.exports = app;