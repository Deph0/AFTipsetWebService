const express = require('express')
const router = express.Router()
const database = require('../database')

router.route('/')
// get all the files (accessed at GET http://localhost:8080/api/v1/files)
.get(function (req, res) {
  database.query('SELECT * FROM filedownloads', (err, results, fields) => {
    if (err) {
      // If there is error, we send the error in the error section with 500 status
      res.send(JSON.stringify({'status': 500, 'error': err, 'response': null}))
    } else {
      // If there is no error, all is good and response is 200OK.
      res.send(JSON.stringify({'status': 200, 'error': null, 'response': results}))
    }
  })
})
  // create a file (accessed at POST http://localhost:8080/files, x-www-form-urlencoded)
.post(function (req, res) {
  var data = {
    'file': req.bodyString('file'), // req.body.file,
    'filepath': req.bodyString('filepath'), // req.body.filepath,
    'filesize': req.bodyInt('filesize'), // req.body.filesize,
    'checksum': req.bodyString('checksum') // req.body.checksum
  }
  var sql = 'INSERT INTO filedownloads SET ?'
  database.query(sql, data, (err, results) => {
    if (err) {
      // If there is error, we send the error in the error section with 500 status
      res.send(JSON.stringify({'status': 500, 'error': err, 'response': null}))
    } else {
      // If there is no error, all is good and response is 200OK.
      res.send(JSON.stringify({'status': 200, 'error': null, 'response': results}))
    }
  })
})
// update a file (accessed at PUT http://localhost:8080/files, x-www-form-urlencoded)
.put(function (req, res) {
  var data = [
    {
      'file': req.bodyString('file'),
      'filepath': req.bodyString('filepath'),
      'filesize': req.bodyInt('filesize'),
      'checksum': req.bodyString('checksum')
    },
    {
      'id': req.bodyInt('id') // req.body.id
    }
  ]
  var sql = 'UPDATE filedownloads SET ? WHERE ?'
  database.query(sql, data, (err, results) => {
    if (err) {
      // If there is error, we send the error in the error section with 500 status
      res.send(JSON.stringify({'status': 500, 'error': err, 'response': null}))
    } else {
      // If there is no error, all is good and response is 200OK.
      res.send(JSON.stringify({'status': 200, 'error': null, 'response': results}))
    }
  })
})
// delete a file (accessed at DELETE http://localhost:8080/files, x-www-form-urlencoded)
.delete(function (req, res) {
  var data = [
    req.bodyInt('id')
  ]
  var sql = 'DELETE FROM filedownloads WHERE id = ?'
  database.query(sql, data, (err, results) => {
    if (err) {
      // If there is error, we send the error in the error section with 500 status
      res.send(JSON.stringify({'status': 500, 'error': err, 'response': null}))
    } else {
      // If there is no error, all is good and response is 200OK.
      res.send(JSON.stringify({'status': 200, 'error': null, 'response': results}))
    }
  })
})

module.exports = router
