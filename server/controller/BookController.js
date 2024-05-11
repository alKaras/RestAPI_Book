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
        // const books = await Book.find().populate('addedBy', 'username').exec();
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

const getBook = async (req, res) => {
    const bookID = req.params.bookID.toString();
    const book = await Book.findById(bookID).populate('addedBy', 'username');



    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json({ data: book })
}

const editBook = async (req, res) => {
    try {
        const bookID = req.params.bookID.toString();
        const { title, author, publisher, numPages } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(bookID, {
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

const fetchByFilter = async (req, res) => {
    try {
        const { author, title, publisher, pubdate } = req.query;
        const query = {};
        if (author) query.author = author;
        if (title) query.title = title;
        if (publisher) query.publisher = publisher;
        if (pubdate) query.pubdate = pubdate;

        const filteredBooks = await Book.find(query);
        return res.status(200).json(filteredBooks);
    } catch (error) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = {
    createBook,
    getBooks,
    editBook,
    deleteBook,
    getBook,
    fetchByFilter
}