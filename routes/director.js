const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


//models 
const Director = require('../models/Director');

/* GET home page. */
router.post('/', async function(req, res, next) {
    const director = new Director(req.body);

    const promise = await director.save();

    res.json(promise);
});

router.get('/', async (req,res) => {
    try{
        const directors =  await Director.find({ });
        res.json(directors);
    }catch{
        res.status(500).json({ error: 'Kayırlar Bulunamadı!' });
    }
})


router.get('/:director_id', (req, res) => {
	const promise = Director.aggregate([
		{
			$match: {
				'_id': mongoose.Types.ObjectId(req.params.director_id)
			}
		},
		{
			$lookup: {
				from: 'movies',
				localField: '_id',
				foreignField: 'director_id',
				as: 'movies'
			}
		},
		{
			$unwind: {
				path: '$movies',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$group: {
				_id: {
					_id: '$_id',
					name: '$name',
					surname: '$surname',
					bio: '$bio'
				},
				movies: {
					$push: '$movies'
				}
			}
		},
		{
			$project: {
				_id: '$_id._id',
				name: '$_id.name',
				surname: '$_id.surname',
				movies: '$movies'
			}
		}
	]);

	promise.then((data) => {
		res.json(data);
	}).catch((err) => {
		res.json(err);
	});
});



module.exports = router;
