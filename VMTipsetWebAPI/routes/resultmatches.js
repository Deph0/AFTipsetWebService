var express = require('express');
var router = express.Router();

/* GET matches results. */
router.get('/', function(req, res, next) {
    connection.query(`SELECT U.usersign, 
                        Round(Sum(CASE M.result1x2 
                                    WHEN '1' THEN M.oddsresult1 
                                    WHEN 'X' THEN M.oddsresultx 
                                    WHEN '2' THEN M.oddsresult2 
                                    ELSE 0 
                                end), 2) MatchResult 
                    FROM   tp_users AS U 
                        INNER JOIN tp_user_tip_matches AS UM 
                                ON UM.userid = U.userid 
                        INNER JOIN tp_matches AS M 
                                ON M.compid = UM.compid 
                                AND M.matchno = UM.matchno 
                                AND M.result1x2 = UM.matchtip 
                    WHERE  UM.compid = (SELECT Max(compid) 
                                    FROM   tp_competitions) 
                    GROUP  BY U.usersign 
                    ORDER  BY 2 DESC`, function (error, results, fields) {
	  	if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
  	});
});

module.exports = router;
