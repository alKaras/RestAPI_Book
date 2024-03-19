const express = require('express')
const router = express.Router()

const bookController = require('../controller/BookController')
router.post('/createBook', bookController.createBook);
router.get('/getBooks', bookController.getBooks);
router.put('/editBook/:bookID', bookController.editBook);
router.delete('/deleteBook/:bookID', bookController.deleteBook);
router.get('/getBook/:bookID', bookController.getBook);
module.exports = router;