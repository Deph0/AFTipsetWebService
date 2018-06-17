const express = require('express')
const router = express.Router()
// const database = require('../database')

router.route('/')
  .get((req, res) => {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
  .delete((req, res) => {
    res.send('Delete the book')
  })
router.route('/read')
    .get((req, res) => {
      res.send('Get a read book')
    })
    .post(function (req, res) {
      res.send('Add a read book')
    })
    .put(function (req, res) {
      res.send('Update the book to read')
    })
    .delete((req, res) => {
      res.send('Delete the read book')
    })

module.exports = router
