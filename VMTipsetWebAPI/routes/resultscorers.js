var express = require('express');
var router = express.Router();

/* GET scorer results. */
router.get('/', function(req, res, next) {
    connection.query(`Select U.UserSign,
                        Round(Sum(S.ScorerGoals),2) ScorerResult
                    From TP_USERS AS U
                    Inner Join TP_USER_TIP_SCORERS AS US on US.UserID = U.UserID 
                    Inner Join TP_SCORERS AS S on S.CompID = US.CompID and S.ScorerID = US.ScorerID
                    Where US.CompID = (Select max(CompID) from TP_COMPETITIONS)
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
