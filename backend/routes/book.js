const express = require('express');
const book = require('../controllers/book')

const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');

router.get('/', book.books );
router.get('/:id', book.book );
router.delete('/:id', book.bookDelete );
router.put('/:id',auth, book.bookUpdate );
router.post('/', auth, multer,book.booksAdd );


module.exports = router;