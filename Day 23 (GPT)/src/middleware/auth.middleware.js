const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");


async function authuser(req,res,next) {
    const {token} = req.cookies

    if(!token){
        return res.status(401).json({
            message:"Unauthrized token"
        })
    };

    try {
        const decode = jwt.verify(token,process.env.JWT_KEY)
        const user = await userModel.findOne(decode.id);
        req.user = user
        next();
    } catch (error) {
        res.status(401).json({
            message:"Unauthrized"
        })
    }
    
};

module.exports = authuser