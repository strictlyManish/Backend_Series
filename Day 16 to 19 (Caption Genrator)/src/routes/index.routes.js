const express = require("express");
const { registerHandler,loginHandler } = require("../controllers/users.controllers");

const routes = express.Router();

routes.post("/register",registerHandler);
routes.post("/login",loginHandler);



module.exports = routes;