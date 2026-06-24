const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ---------------- SIGNUP ----------------

const signupUser = async (req, res) => {

    try {

        let { username, email, password } = req.body;

        if (!username || !email || !password) {

            return res.status(400).json({
                message: "Please fill all fields"
            });

        }

        if (password.length < 6) {

            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });

        }

        email = email.trim().toLowerCase();

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const newUser = new User({

            username,
            email,
            password: hashedPassword

        });

        await newUser.save();

        res.status(201).json({

            message: "Signup successful"

        });

    } catch (error) {

        console.error("Signup Error:", error);

        res.status(500).json({

            message: "Server error. Please try again later."

        });

    }

};

// ---------------- LOGIN ----------------

const loginUser = async (req, res) => {

    try {

        let { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                message: "Please fill all fields"
            });

        }

        email = email.trim().toLowerCase();

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "Invalid email or password"
            });

        }

        const isMatch =
            await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid email or password"
            });

        }

        res.status(200).json({

            message: "Login successful",

            user: {

                id: user._id,
                username: user.username,
                email: user.email

            }

        });

    } catch (error) {

        console.error("Login Error:", error);

        res.status(500).json({

            message: "Server error. Please try again later."

        });

    }

};

module.exports = {

    signupUser,
    loginUser

};