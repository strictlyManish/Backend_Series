const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("HELLO EXPRESS.")
});


module.exports = app