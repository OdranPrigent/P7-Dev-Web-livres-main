const Thing = require('../models/Thing')
const fs = require('fs'); 

exports.books = (req, res, next) => {
  Thing.find()
    .then(things => {
      res.status(200).json(things);
    })
    .catch(error => {
      console.error(error); 
      res.status(400).json({ error });
    });
};

exports.booksAdd = (req, res, next) => {
  const bookData = JSON.parse(req.body.book);
  delete bookData.userId;
  const thing = new Thing({
    ...bookData,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  thing.save()
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};