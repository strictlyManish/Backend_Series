const express = require("express");
const routes = express.Router();
const authmiddlewarws = require("../middleware/auth.middleware");
const multer = require("multer");

const upload = multer({storage:multer.memoryStorage()});


routes.post("/", authmiddlewarws,
    upload.single("image"),
    creatPostcontroller
)




module.exports = routes;