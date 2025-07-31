const express = require("express");
const userModel = require("../models/users.model");
const routes = express.Router();
const jwt = require('jsonwebtoken');

routes.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username: username });

    if (user) {
        return res.status(208).json({
            message: "user allready registread"
        })
    };

    const user_creat = await userModel.create({
        username: username,
        password: password
    });

    const token = jwt.sign({ id: user_creat._id }, process.env.JWT_KEY);
    res.cookie("token", token);
    res.status(201).json({
        message: "user Created ✅",
        user_creat,
    });
}); // for registraion

routes.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username: username });

    if (!user) {
        return res.status(409).json({
            message: "user not found [invalid username]"
        })
    };

    const pass_check = password == user.password;

    if (!pass_check) {
        return res.status(409).json({
            message: "password incorrect"
        })
    };

    const token = jwt.sign({id:user.id},process.env.JWT_KEY);
    res.cookie("token",token,{expires:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),})

    res.status(200).json({
        message: "logged In",
        msg: `Welcome back ${username} 😍`
    })
}) // for logged in

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
}); // for readings

routes.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    });
    
    return res.status(200).json({ message: "Logged out successfully" });
}); // for logout feature 


module.exports = routes;