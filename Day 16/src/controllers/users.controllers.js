const userModel = require("../models/users.models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

async function registerHandler(req, res) {
    const { username, password } = req.body;
    const exists_user = await userModel.findOne({ username });

    if (exists_user) {
        return res.status(400).json({
            message: "user already Exist"
        });
    };

    const creat_user = await userModel.create({ username,
         password:await bcrypt.hash(password,10)
        });
    const token = jwt.sign({ id: creat_user._id }, process.env.JWT_KEY);

    res.cookie("token", token);
    res.status(200).json({
        message: "user registraion successfull",
        creat_user
    })
};

async function loginHandler(req, res) {
    const { username, password } = req.body;
    const find_user = await userModel.findOne({ username });

    if (!find_user) {
        return res.status(400).json({
            message: "user not found or [invalid username]"
        })
    };

    const pass_check = await bcrypt.compare(password,find_user.password)
    if (!pass_check) {
        return res.status(400).json({
            message: "invalid password"
        })
    };

    const token = jwt.sign({ id: find_user._id }, process.env.JWT_KEY);
    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully",
        find_user: {
            username: find_user.username,
            id: find_user._id
        }
    })

};

module.exports = {
    registerHandler,
    loginHandler
};

// REST FULL APIs