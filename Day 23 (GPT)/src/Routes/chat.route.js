const express = require("express");
const chatRoute = express.Router();
const ChatController = require("../Controllers/Chat.Controller");
const authMiddleware = require("../Middlewares/Authentication");



chatRoute.post("/chat",authMiddleware,ChatController);


module.exports = chatRoute;