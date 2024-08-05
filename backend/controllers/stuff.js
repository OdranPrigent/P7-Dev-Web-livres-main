const Thing = require('../models/Thing')


exports.books = (req, res, next) => {
        Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
}