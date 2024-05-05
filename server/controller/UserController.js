const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const userIsExisted = await User.findOne({ email });
        if (userIsExisted) { return res.status(500).json({ message: "User is existed. Try again." }) }

        const newUser = await User.create({
            username,
            email,
            password: hash,
        });

        const user = await newUser.save();
        return res.status(200).json({ user: user })
    } catch (error) {
        return res.status(500).json({ message: "Fatal Error " + error })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) { return res.status(404).json({ message: "Haven't found any users with this email." }) }

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
            {
                userId: user._id,
                userName: user.username,
                userRole: user.userRole,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRESIN
            }
        );
        return res.json({
            user: user,
            token: token,
        })
    } else {
        return res.status(401).json({ message: "Incorrect password" });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            const token = jwt.sign(
                {
                    userId: user._id,
                    userName: user.username,
                    userRole: user.userRole,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRESIN,
                }
            );
            return res.status(200).json({
                data: user,
                token: token,
            })
        } else {
            res.status(404).json({ message: "Haven't found any users with this credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Fatal Error " + error });
    }
}

const fetchUsers = async (req, res) => {
    const users = await User.find({});
    return res.status(200).json({ data: users });
}

module.exports = {
    login,
    register,
    getUser,
    fetchUsers
}