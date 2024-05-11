const Review = require('../models/reviewModel');

const createReview = async (req, res) => {
    const { body } = req.body;
    const user = req.user;

    const review = new Review({
        body: body,
        bookId: req.params.id,
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
        const review = await Review.find({ bookId: req.params.id }).populate('reviewer', 'username').populate('bookId', 'title author')
        return res.status(200).json({ data: review })
    } catch (error) {
        return res.status(500).json({ message: "Couldn\'t fetch book by id" })
    }
}

module.exports = {
    createReview,
    getAllReview,
    getReviewByBookId
}