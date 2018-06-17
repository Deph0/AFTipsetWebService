const express = require('express')
const router = express.Router()
const database = require('../database')

router.route('/')
 // get all the files (accessed at GET http://localhost:8080/api/v1/users)
 .get(function (req, res) {
   database.query('SELECT * FROM tp_users', (err, results, fields) => {
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
