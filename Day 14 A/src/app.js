const express = require("express");
const app = express();
const routes = require("../src/routes/auth.routes");
const cookieParser = require("cookie-parser");
app.use(express.json())
app.use(cookieParser())

app.use("/auth",routes);



module.exports = app;