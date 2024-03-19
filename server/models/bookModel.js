const mongoose = require('mongoose')
const bookModelScheme = new mongoose.Schema (
    {
        isbn: {
            type: String,
        },
        title: {
            type: String,
        },
        author: {
            type: String,
        },
        pubdate: {
            type: Date,
            default: Date.now()
        },
        publisher: {
            type: String
        },
        numOfPage: {
            type: Number
        }
    }
)

const Books = mongoose.model("Books", bookModelScheme);
module.exports = Books;