const Review = require('../models/reviewModel');
const Book = require('../models/bookModel');
const createReview = async (req, res) => {
    const { body } = req.body;
    const user = req.user;
    const bookId = await Book.findOne({ alias: req.params.alias }).select('_id')
    const review = new Review({
        body: body,
        bookId: bookId._id.toString(),
        reviewer: user
    })

    await review.save();
    await review.populate('bookId', 'title');
    await review.populate('bookId', 'author');

    return res.status(200).json(review);
}

const getAllReview = async (req, res) => {
    try {
        const reviews = await Review.find({});
        return res.status(200).json({ data: reviews });
    } catch (error) {
        return res.status(500).json({ message: 'Couldn\'t fetch all reviews' });
    }
}

const getReviewByBookId = async (req, res) => {
    try {
        const bookId = await Book.findOne({ alias: req.params.alias }).select('_id')
        const review = await Review.find({ bookId: bookId._id.toString() }).populate('reviewer', 'username').populate('bookId', 'title author addedBy');
        return res.status(200).json({ data: review })
    } catch (error) {
        return res.status(500).json({ message: "Couldn\'t fetch book by id" })
    }
}

const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const deletedReview = await Review.findByIdAndDelete(reviewId);
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting review' });
    }
}

module.exports = {
    createReview,
    getAllReview,
    getReviewByBookId,
    deleteReview
}