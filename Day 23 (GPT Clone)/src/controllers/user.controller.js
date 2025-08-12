const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



async function getRegisterController(req, res) {
    res.render("register", { error: req.query.error || null });

}

async function postRegisterController(req, res) {
    const { username, email, password } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    if (isUserExists) {
        return res.redirect('/auth/register?error=User allready exists');

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username: username,
        email: email,
        password: hashedPassword
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY)

    res.cookie('token', token);
    res.redirect("/auth/login")
}

async function getLoginController(req, res) {
    res.render("login", { error: req.query.error || null });
}

async function postLoginController(req, res) {
    const { email, password, username } = req.body;



    const user = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    });;

    if (!user) {

        return res.redirect('/auth/login?error=User not found');
    };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.redirect('/auth/login?error=Invalid password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    res.cookie('token', token);

    return res.status(200).json({
        message: "User logged in successfully",
        user: user
    });

}


module.exports = {
    getRegisterController,
    postRegisterController,
    getLoginController,
    postLoginController
};