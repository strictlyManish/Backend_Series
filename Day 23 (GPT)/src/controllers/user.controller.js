const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
    try {
        const { email, password, fullName: { firstName, lastName } } = req.body;

        const userExists = await userModel.findOne({ email });

        if (userExists) {
            return res.status(302).json({
                message: "User already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const creating_user = await userModel.create({
            email,
            password: hashedPassword,
            fullName: {
                firstName,
                lastName
            }
        });

        const token = jwt.sign({ id: creating_user._id }, process.env.JWT_KEY, {
            expiresIn: "1d"
        });

        res.cookie("token", token);

        return res.status(201).json({
            message: "User created successfully",
            user: creating_user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
async function loginController(req, res) {
    const { email, password } = req.body;

    try {
        const userExists = await userModel.findOne({ email });

        if (!userExists) {
            return res.status(401).json({
                message: "user not found or [invalid email]"
            })
        };

        const passCheck = await bcrypt.compare(password, userExists.password);
        if (!passCheck) {
            return res.status(401).json({
                message: "Incorrect password"
            })
        }
        const token = jwt.sign({ id: userExists._id }, process.env.JWT_KEY);
        res.cookie("token", token);
        const { firstName, lastName } = userExists.fullName;
        res.status(200).json({
            message: "User logged in successfully",
            name: firstName || lastName
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = { registerController, loginController };
