const express = require('express');
const Thing = require('../models/Thing')
const stuff = require('../controllers/stuff')
const router = express.Router();

router.use('/', stuff.books );

module.exports = router;