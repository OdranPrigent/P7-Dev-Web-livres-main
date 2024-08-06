const express = require('express');
const stuff = require('../controllers/stuff')
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('multer');

router.get('/', stuff.books );
router.post('/', auth, multer, stuff.booksAdd );

module.exports = router;