const userModel = require("../Models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Register Controller

async function registerController(req, res) {
    const { email, password, fullname } = req.body;

    try {
        const exists_user = await userModel.findOne({ email });
        if (exists_user) {
            return res.status(208).json({
                message: "Email already exists",
            });
        }

        const hashed_password = await bcrypt.hash(password, 10);

        const created_user = await userModel.create({
            email,
            password: hashed_password,
            fullname,
        });

        const token = jwt.sign({ id: created_user._id }, process.env.JWT_KEY)
        res.cookie("token", token);

        return res.status(201).json({
            message: "User created successfully",
            created_user,
        });
    } catch (error) {
        return res.status(406).json({
            message: "internet conection required or required field value or field name is not correct"
        })
    }

}

// Login Controller

async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        const registred_user = await userModel.findOne({ email });
        if (!registred_user) {
            return res.status(401).json({ message: "User not found or [invalid email]" });
        }

        const isPasswordValid = await bcrypt.compare(password, registred_user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: registred_user._id }, process.env.JWT_KEY);

        res.cookie("token", token);

        return res.status(200).json({
            message: "Login successful",
            name: registred_user.fullname
        });
    } catch (error) {
        return res.status(406).json({
            message: "internet conection required or required field value or field name is not correct"
        })
    }
}

module.exports = { registerController, loginController };