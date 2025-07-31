const express = require("express");
const app = express();
const routes = require("./routes/index.routes");
const cookie_parser = require("cookie-parser");

app.use(express.json());
app.use("/caption_ai", routes);
app.use(cookie_parser())

module.exports = app;
