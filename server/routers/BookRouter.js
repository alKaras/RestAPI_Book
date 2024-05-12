const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/auth')

const bookController = require('../controller/BookController')
router.post('/createBook', checkAuth, bookController.createBook);
router.get('/getBooks', bookController.getBooks);
router.put('/editBook/:alias', bookController.editBook);
router.delete('/deleteBook/:bookID', bookController.deleteBook);
module.exports = router;