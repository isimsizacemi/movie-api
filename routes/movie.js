var express = require('express');
var router = express.Router();

// Models
const Movie = require('../models/Movie');

router.get('/', async (req,res,next) => {
  try {
    const movies = await Movie.find({ });

    res.json(movies);

  } catch (error) {
    res.status(500).json({ error: 'Kayırlar ALINAMADI!' });
  }
});

router.get('/top10', async (req,res,next) => {
  try {
    const movies = await Movie.find({ }).limit(10).sort({imdb_score : -1});

    res.json(movies);

  } catch (error) {
    res.status(500).json({ error: 'Kayırlar ALINAMADI!' });
  }
})




router.put('/:movie_id' , async(req,res,next) => {
  const movie = await Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    {new : true}
  );
  if(!movie) {
    next('HATA');
  }
  res.json(movie);
})


router.delete('/:movie_id' , async(req,res,next) => {
  const movie = await Movie.findByIdAndRemove(
    req.params.movie_id
  );
  if(!movie) {
    next('HATA');
  }
  res.json({status: 1});
})



router.get('/:movie_id' , async(req,res,next) => {
    const movie = await Movie.findById(req.params.movie_id);
    if(!movie) {
      next('The movie was not found');
    }
    res.json(movie);
})

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

// between 

router.get('/between/:start_year/:end_year', async (req,res,next) => {
  try {
    const {start_year,end_year}= req.params;
    const movies = await Movie.find({
        year: {"$gte": parseInt(start_year), "$lte": parseInt(end_year) }
     });

    res.json(movies);

  } catch (error) {
    res.status(500).json({ error: 'Kayırlar ALINAMADI!' });
  }
})



module.exports = router;




