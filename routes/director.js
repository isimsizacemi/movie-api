var express = require('express');

var router = express.Router();


//models 
const Director = require('../models/Director');

/* GET home page. */
router.post('/', async function(req, res, next) {
    const director = new Director();

    const promise = await director.save();

    res.json(promise);
});

module.exports = router;
