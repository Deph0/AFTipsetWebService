const express = require('express')
const router = express.Router()
// const database = require('../database')

// on routes that end in /bears/:bear_id
router.route('/:bear_id')
	// get the bear with that id
	.get(function(req, res) {
		/*Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err)
			res.json(bear)
		})*/
    res.json('beers id='+req.params.bear_id )
	})

	// update the bear with this id
	.put(function(req, res) {
		/*Bear.findById(req.params.bear_id, function(err, bear) {

			if (err)
				res.send(err)

			bear.name = req.body.name
			bear.save(function(err) {
				if (err)
					res.send(err)

				res.json({ message: 'Bear updated!' })
			})

		})*/
	})

	// delete the bear with this id
	.delete(function(req, res) {
		/*Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err)

			res.json({ message: 'Successfully deleted' })
		})*/
	})

  module.exports = router
