const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function getRegisterController(req, res) {
    res.render("register", { error: req.query.error || null, success: req.query.success || null });
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
        return res.redirect('/auth/register?error=User already exists');

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username: username,
        email: email,
        password: hashedPassword
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY)

    res.cookie('token', token);

    return res.redirect("/auth/login")
}

async function getLoginController(req, res) {
    res.render("login", { error: req.query.error || null, success: req.query.success || null });

}

async function postLoginController(req, res) {
    const { email, password } = req.body;



    const user = await userModel.findOne({
        email: email
    })

    if (!user) {
        return res.redirect('/auth/login?error=User not found');
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.redirect('/auth/login?error=Invalid password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);

    res.cookie('token', token);

    return res.redirect("/")
}

async function userLogout(req, res) {
    res.clearCookie('token');
    return res.redirect("/auth/logout");
}

module.exports = {
    getRegisterController,
    postRegisterController,
    getLoginController,
    postLoginController,
    userLogout
};