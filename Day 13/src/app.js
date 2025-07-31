const express = require("express");
const route = require("./routes/auth.routes");
const app = express();
app.use(express.json())


app.use("/auth",route);




module.exports = app;