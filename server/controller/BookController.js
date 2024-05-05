const Book = require('../models/bookModel');

const createBook = async (req, res) => {
    const { isbn, title, author, pubdate, publisher, numOfPage } = req.body;

    try {
        const book = await Book.create({
            isbn: isbn,
            title: title,
            author: author,
            pubdate: pubdate,
            publisher: publisher,
            numOfPage: numOfPage,
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
        const books = await Book.find({});
        if (res.status(200)) {
            return res.json({ data: books });
        }
    } catch (error) {
        return res.status(500).json({ message: "Couldn't fetch all books" })
    }
}

const getBook = async (req, res) => {
    const bookID = req.params.bookID.toString();
    const book = await Book.findById(bookID);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ data: book })
}

const editBook = async (req, res) => {
    try {
        const bookID = req.params.bookID.toString();
        const { isbn, title, author, pubdate, publisher, numOfPage } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(bookID, {
            isbn: isbn,
            title: title,
            author: author,
            pubdate: pubdate,
            publisher: publisher,
            numOfPage: numOfPage
        });
        if (res.status(200)) {
            return res.json({ message: "Book is up to date!" })
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
    deleteBook,
    getBook
}