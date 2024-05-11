const express = require('express');
const router = express.Router();

const reviewController = require('../controller/reviewController');
const checkAuth = require('../middleware/auth');

router.post(`/create/:alias`, checkAuth, reviewController.createReview);
router.get('/fetch-review/:alias', reviewController.getReviewByBookId);

module.exports = router;