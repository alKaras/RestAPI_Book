const Book = require('../models/bookModel');

const slugMaker = require('../service/slugMaker')

const createBook = async (req, res) => {
    const { isbn, title, author, pubdate, publisher, numOfPage } = req.body;

    try {
        const book = await Book.create({
            isbn: isbn,
            title: title,
            alias: slugMaker.createSlug(title),
            author: author,
            pubdate: pubdate,
            publisher: publisher,
            numOfPage: numOfPage,
            addedBy: req.user
        })

        if (res.status(200)) {
            return res.json({ data: book })
        }
    } catch (error) {
        return res.status(500).json({ message: "Couldn't create book" })
    }
}

const getBooks = async (req, res) => {
    try {
        const { author, title, publisher, pubdate } = req.query;
        const query = {};

        if (author) query.author = author;
        if (title) query.title = title;
        if (publisher) query.publisher = publisher;
        if (pubdate) {
            query.pubdate = { $gte: new Date(pubdate) }
        }
        const filteredBooks = await Book.find(query).populate('addedBy', 'username').exec();;
        return res.status(200).json({ data: filteredBooks });
    } catch (error) {
        return res.status(500).json({ message: "Couldn't fetch all books" })
    }
}

const editBook = async (req, res) => {
    try {
        const alias = req.params.alias;
        const { title, author, publisher, numPages } = req.body;
        const updatedBook = await Book.findOneAndUpdate({ alias: alias }, {
            title: title,
            author: author,
            publisher: publisher,
            numOfPage: numPages
        });

        if (res.status(200)) {
            return res.json({ success_message: "Book is up to date!", data: updatedBook })
        }
    } catch (error) {
        return res.status(500).json({ message: "Error editing book " + error })
    }
}

const deleteBook = async (req, res) => {
    try {
        const bookID = req.params.bookID.toString();
        const deletedBook = await Book.findByIdAndDelete(bookID);
        return res.status(200).json({ data: deletedBook })
    } catch (error) {
        return res.status(500).json({ message: "Couldn't delete book" })
    }
}

module.exports = {
    createBook,
    getBooks,
    editBook,
    deleteBook
}