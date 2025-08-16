const express = require("express");
const routes = express.Router();
const {loginController,registerController} = require("../controllers/user.controller");
const authuser = require("../middleware/auth.middleware");


routes.post("/register",registerController)
routes.post("/login",loginController)



module.exports = routes;