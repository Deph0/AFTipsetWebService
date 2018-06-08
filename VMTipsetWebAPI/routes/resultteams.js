var express = require('express');
var router = express.Router();

/* GET teams results. */
router.get('/', function(req, res, next) {
    connection.query(`Select U.UserSign,
                        Round(Sum(
                            CASE T.StageQualify1 WHEN UT.StageQualify1 THEN T.StageOdds1 ELSE 0 END +
                            CASE T.StageQualify2 WHEN UT.StageQualify2 THEN T.StageOdds2 ELSE 0 END +
                            CASE T.StageQualify3 WHEN UT.StageQualify3 THEN T.StageOdds3 ELSE 0 END +
                            CASE T.StageQualify4 WHEN UT.StageQualify4 THEN T.StageOdds4 ELSE 0 END +
                            CASE T.StageQualify5 WHEN UT.StageQualify5 THEN T.StageOdds5 ELSE 0 END
                        ),2) TeamResult
                    From TP_USERS AS U
                    Inner Join TP_USER_TIP_TEAMS AS UT on UT.UserID = U.UserID 
                    Inner Join TP_TEAMS AS T on T.CompID = UT.CompID and T.TeamNo = UT.TeamNo
                    Where UT.CompID = (Select max(CompID) from TP_COMPETITIONS)
                    Group By U.UserSign
                    Order By 2 desc`, function (error, results, fields) {
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
