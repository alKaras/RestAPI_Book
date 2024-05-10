const express = require('express');
const router = express.Router();

const reviewController = require('../controller/reviewController');
const checkAuth = require('../middleware/auth');

router.post(`/create/:id`, checkAuth, reviewController.createReview);
router.get('/fetch', reviewController.getAllReview);

module.exports = router;