const express = require('express');
const Thing = require('../models/Thing')
const stuff = require('../controllers/stuff')
const router = express.Router();

router.post('/auth/login', stuff.login);
router.use('/books', stuff.books );

module.exports = router;