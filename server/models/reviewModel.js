const mongoose = require('mongoose')
const reviewModelScheme = new mongoose.Schema (
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Books',
        },
        reviewer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        },
        body: {
            type: String,
        }
    },
    {
        timestamps: true,
        collection: 'reviews',
    }
)

const Reviews = mongoose.model("reviews", reviewModelScheme);
module.exports = Reviews;