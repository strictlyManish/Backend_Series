const express = require("express");
const userModel = require("../models/user.model")
const route = express.Router();

route.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const createdUser = await userModel.create({
        username: username,
        password: password
    })

    res.status(201).json({
        message: "User Created",
        data: createdUser
    })
});

route.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const _user = await userModel.findOne({
        username: username
    });

    if (!_user) {
       return res.status(401).json({
            message: "username not found [ invailed username ]",
        })
    }

    const isvalide_pass = password == _user.password;
    if(!isvalide_pass){
      return res.status(401).json({
            message:"Invalid password."
        })
    }

    res.status(200).json({
        message:"Success : User Logged In.",
        data:`Welcome dear ${username} ❤️`
    })
})



module.exports = route;