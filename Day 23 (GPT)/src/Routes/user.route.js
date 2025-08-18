const express = require("express");
const authentication = express.Router();
const {registerController,loginController} = require("../Controllers/Main.Controller");


authentication.post("/register",registerController)
authentication.post("/login",loginController)




module.exports = authentication;