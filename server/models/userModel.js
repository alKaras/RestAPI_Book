const mongoose = require('mongoose')
const userModelScheme = new mongoose.Schema(
    {
        username: {
            type: String
        },
        email: {
            type: String,
        },
        password: {
            type: String
        },
        userRole: {
            type: String,
            default: 'user'
        }
    }
)

const User = mongoose.model("Users", userModelScheme);
module.exports = User;