const userModel = require("../models/users.models");
const jwt = require("jsonwebtoken");


async function authmiddlewarws(req, res) {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({
            message: "unauthrize access , please login first"
        })
    };

    try {
        const decode = jwt.verify(token, process.env.JWT_KEY);
        const get_user_data = await userModel.findOne({ id: decode._id });
        req.get_user_data = get_user_data;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "please login first or invalid token",
            error
        })
    }

};


module.exports = authmiddlewarws;