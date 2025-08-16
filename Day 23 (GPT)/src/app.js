const express = require("express");
const app = express();
const routes = require("../src/routes/user.routes");
const cookie_parser = require("cookie-parser");
const chatRoute = require("./routes/chat.routes");


app.use(express.json());

app.use("/api/auth",routes);
app.use("/api",chatRoute);
app.use(cookie_parser());


module.exports = app;