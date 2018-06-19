const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const database = require('../database')

router.route('/')
  // get all the files (accessed at GET http://localhost:8080/api/v1/games)
  .get(function (req, res) {
    const sql = fs.readFileSync(path.join(__dirname, '../sql', 'vmgames.sql'), 'utf8').toString()
    database.query(sql, (err, results, fields) => {
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

/*
[x] Match
[ ] Team
[x] Scorer
[N/A] Total
*/
