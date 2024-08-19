const express = require('express');
const book = require('../controllers/book')
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');

router.get('/', book.books );
router.get('/bestrating', book.bestRating );
router.get('/:id', book.book );
router.delete('/:id', auth, book.bookDelete );
router.post('/:id/rating', auth, book.bookAddRating );
router.put('/:id',auth, multer, book.bookUpdate );
router.post('/', auth, multer,book.booksAdd );

module.exports = router;