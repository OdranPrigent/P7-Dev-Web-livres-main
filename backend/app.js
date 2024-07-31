const express = require('express');

const app = express();


app.use((req, res, next) => {
   res.json({ message: 'test requete' }); 
});

module.exports = app;