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
    Book.findOne({ _id: req.params.id })  
    .then(thing => {
      if (req.file){
        fs.unlinkSync("images/"+thing.imageUrl.split('/').pop())
        req.body.imageUrl =  "http://localhost:4000/images/" +req.file.filename
      }
      Book.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
    .then(updateBook => res.status(200).json(updateBook))
    .catch(error => res.status(404).json({ error }))})
    .catch(error => res.status(400).json({ error }));
};

exports.bookAddRating = (req, res, next) => {
  Book.findOne({ _id: req.params.id })  
    .then(thing => {
      Book.findOneAndUpdate({ _id: req.params.id }, { $push: { ratings: {userId:req.body.userId, grade:req.body.rating} }, 
      $set: { averageRating: ((thing.averageRating*thing.ratings.length)+req.body.rating)/(thing.ratings.length+1)} }, { new: true })
      .then(updateBook => res.status(200).json(updateBook))
      .catch(error => res.status(404).json({ error }))})
    .catch(error => res.status(400).json({ error }));
};

exports.bestRating = (req, res, next) => {
  Book.find()
  .sort({ averageRating: -1 }) 
  .limit(3)
  .then(meilleursLivres => {res.status(200).json(meilleursLivres);})
  .catch(error => {res.status(500).json({ error });
  });
};

exports.bookDelete = (req, res, next) => {
  Book.findOne({ _id: req.params.id })  
    .then(thing => {
    fs.unlinkSync("images/"+thing.imageUrl.split('/').pop())
    Book.findOneAndDelete({ _id: req.params.id })
      .then(deletedBook => res.status(200).json(deletedBook))
      .catch(error => res.status(404).json({ error }));
    })
};

exports.booksAdd = (req, res, next) => {
  const bookData = JSON.parse(req.body.book);
  delete bookData.userId;
  let t = new Date();
  const book = new Book({
    ...bookData,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/${req.file.path}`
  });
  book.save()
  .then(() => { 
    res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};