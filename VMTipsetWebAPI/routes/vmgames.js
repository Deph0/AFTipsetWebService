const express = require('express')
const router = express.Router()
const database = require('../database')

router.route('/')
 // get all the files (accessed at GET http://localhost:8080/api/v1/games)
 .get(function (req, res) {
   database.query('select MatchNo, MatchDate, tp_teams_home.TeamName as HomeTeam, tp_teams_away.TeamName as AwayTeam from tp_matches inner join tp_teams tp_teams_home on tp_teams_home.TeamNo  = tp_matches.HomeTeamNo and tp_teams_home.CompID = tp_matches.CompID inner join tp_teams tp_teams_away on tp_teams_away.TeamNo  = tp_matches.AwayTeamNo and tp_teams_away.CompID = tp_matches.CompID where tp_matches.CompID = 1 order by MatchNo;', (err, results, fields) => {
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
