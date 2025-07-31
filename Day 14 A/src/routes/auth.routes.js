const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const routes = express.Router();


routes.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!(username && password)) {
        return res.status(404).json({
            message: "username and password is must."
        })
    }

    const exist = await userModel.findOne({ username: username });

    if (exist) {
        return res.status(409).json({
            message: "User Allready Exists"
        })
    }

    const user = await userModel.create({
        username: username,
        password: password
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN)
    res.cookie("token",token)
    res.status(201).json({
        message: "user created successfully",
        data: user,
        token
    })

}); //for register

routes.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username: username });

    if (!user) {
        return res.status(401).json({
            message: 'username not found [invild username]'
        })
    };
    const pass = password == user.password;

    if (!pass) {
        return res.status(401).json({
            message: 'password incorrect'
        })
    };

    res.status(200).json({
        message: `Sucsess ${username}'s logged in`,
    })

}); // for login

routes.get("/user", async (req, res) => {
    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({
            message: "Unauthrized Access !"
        })
    };

    try {
        const decode = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await userModel.findById({_id: decode.id }).select("-password -__v")

        return res.status(200).json({
            message: "user fecthed successfully",
            user
        })

    } catch (error) {
        return res.status(401).json({
            message: "Access denied [Invalid Token]"
        })
    }

})



module.exports = routes;