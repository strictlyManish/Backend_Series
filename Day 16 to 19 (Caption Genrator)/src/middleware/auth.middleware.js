const userModel = require("../models/users.models");
const jwt = require("jsonwebtoken");


async function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const user = await userModel.findOne({
            _id: decoded.id
        })

        req.user = user;
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token, please login again"
        })
    }

}

module.exports = authMiddleware;