const express = require("express");
const app = express();
const auth_routes = require("../src/routes/index.routes");
const post_routes = require("../src/routes/post.routes");
const cookie_parser = require("cookie-parser");


app.use(cookie_parser());
app.use(express.json());
app.use("/caption_ai/auth",auth_routes);
app.use("/caption_ai/posts",post_routes)







module.exports = app;