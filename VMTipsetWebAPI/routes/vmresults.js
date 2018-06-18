const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const database = require('../database')

router.route('/')
  // get all the files (accessed at GET http://localhost:8080/api/v1/result)
  .get(function (req, res) {
    const sql = fs.readFileSync(path.join(__dirname, '../sql', 'all_results.sql'), 'utf8').toString()
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

router.route('/matches')
  .get((req, res) => {
    const sql = fs.readFileSync(path.join(__dirname, '../sql', 'all_matches.sql'), 'utf8').toString()
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

router.route('/teams')
  .get((req, res) => {
    const sql = fs.readFileSync(path.join(__dirname, '../sql', 'all_teams.sql'), 'utf8').toString()
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

router.route('/scorers')
  .get((req, res) => {
    const sql = fs.readFileSync(path.join(__dirname, '../sql', 'all_scorers.sql'), 'utf8').toString()
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
