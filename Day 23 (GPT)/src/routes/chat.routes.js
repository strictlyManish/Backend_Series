const express = require("express");
const chatRoute = express.Router();
const chatController = require("../controllers/chat.controller");
const authuser = require = require("../middleware/auth.middleware");
 

chatRoute.post("/",chatController,authuser);


module.exports = chatRoute;