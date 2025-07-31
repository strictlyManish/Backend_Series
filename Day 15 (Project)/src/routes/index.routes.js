const express = require("express");
const userModel = require("../models/users.model");
const routes = express.Router();
const jwt = require('jsonwebtoken');


routes.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const exists_user = await userModel.findOne({ username });

    if (exists_user) {
        return res.status(409).json({
            message: "user already registred"
        })
    }

    const created_user = await userModel.create({ username, password });
    const token = jwt.sign({ id: created_user._id }, process.env.JWT_KEY);
    res.cookie("token", token)
    res.status(201).json({
        message: "User Registed Successfull",
        created_user
    })
});

routes.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const get_user = await userModel.findOne({ username });

    if (!get_user) {
        return res.status(401).json({
            message: "unauthrized [invalid username]"
        })
    };

    const pass_check = password == get_user.password;
    if (!pass_check) {
        return res.status(401).json({
            message: "unauthrized [invalid password]"
        })
    };
    const token = jwt.sign({ id: get_user.id }, process.env.JWT_KEY);
    res.cookie("token", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), })

    res.status(200).json({
        message: "User Logged In",
        username
    })
});

routes.get("/user", async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ 
            message: "Unauthorized, token not found ❗"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findById(decoded.id).select("-password -__v");

        return res.status(200).json({
            message: "User dashboard",
           user
        });

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized: invalid token ❌"
        });
    }
})

module.exports = routes;