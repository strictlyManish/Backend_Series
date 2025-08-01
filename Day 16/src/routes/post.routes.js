const express = require("express");
const routes = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const multer = require("multer");
const creatPostcontroller = require("../controllers/post.cotroller")


const upload = multer({storage:multer.memoryStorage()});


routes.post('/',
    authMiddleware,
    upload.single("image"),
    creatPostcontroller
)

module.exports = routes;