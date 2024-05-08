const Review = require('../models/reviewModel');

const createReview = async (req, res) => {
    const { bookId } = req.params.id;
    const { body } = req.body;
    const user = req.user;

    const review = new Review({
        body: body,
        bookId: bookId,
        reviewer: user
    })

    await review.save();
    await review.populate('bookId', 'title author');

    res.status(200).json(review);
}

const getAllReview = async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.status(200).json({ data: reviews });
    } catch (error) {
        return res.status(500).json({ message: 'Couldn\'t fetch all reviews' });
    }
}

module.exports = {
    createReview,
    getAllReview
}