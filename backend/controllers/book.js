const Book = require('../models/Book')
const fs = require('fs'); 


exports.books = (req, res, next) => {
  Book.find()
    .then(things => {
      res.status(200).json(things);
    })
    .catch(error => {
      console.error(error); 
      res.status(400).json({ error });
    });
};

exports.book = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
};

exports.bookUpdate = (req, res, next) => {
  Book.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    .then(updateBook => res.status(200).json(updateBook))
    .catch(error => res.status(404).json({ error }))
};

exports.bookAddRating = (req, res, next) => {
  Book.findOne({ _id: req.params.id })  
    .then(thing => {
      console.log(thing)
      console.log(((thing.averageRating*thing.ratings.length)+req.body.rating)/(thing.ratings.length+1))
      Book.findOneAndUpdate({ _id: req.params.id }, { $push: { ratings: {userId:req.body.userId, grade:req.body.rating} }, 
      $set: { averageRating: ((thing.averageRating*thing.ratings.length)+req.body.rating)/(thing.ratings.length+1)} }, { new: true })
      .then(updateBook => res.status(200).json(updateBook))
      .catch(error => res.status(404).json({ error }))})
    .catch(error => res.status(400).json({ error }));
  //if (!b.body.ratings.findOne(id: req.body.userId))
};

exports.bookDelete = (req, res, next) => {
  Book.findOneAndDelete({ _id: req.params.id })
    .then(deletedBook => res.status(200).json(deletedBook))
    .catch(error => res.status(404).json({ error }));
};

exports.booksAdd = (req, res, next) => {
  const bookData = JSON.parse(req.body.book);
  delete bookData.userId;
  const book = new Book({
    ...bookData,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  book.save()
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};