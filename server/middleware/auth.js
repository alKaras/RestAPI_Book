const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

require('dotenv').config();
module.exports = async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            req.user = user;
            next();
        } catch (error) {
            return res.status(403).json({
                message: "No access internal",
            });
        }

    } else {
        // return res.status(403).json({
        //     message: "No access at all",
        // })
    }
}