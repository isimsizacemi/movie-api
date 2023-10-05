var express = require('express');
var router = express.Router();

// Models
const Movie = require('../models/Movie');

router.post('/', async function(req, res, next) {
  // 

  try {
    const movie = new Movie(req.body);

    const savedMovie = await movie.save();

    res.json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: 'Film kaydedilemedi.' });
  }
});


module.exports = router;




