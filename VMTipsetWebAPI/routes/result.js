var express = require('express');
var router = express.Router();

/* GET all results. */
router.get('/', function(req, res, next) {
    connection.query(`Select X.UserSign,
                        Round(Sum(X.MatchResult),2) MatchResult,
                        Round(Sum(X.TeamResult),2) TeamResult,
                        Round(Sum(X.ScorerResult),2) ScorerResult,
                        Round(Sum(X.MatchResult + X.TeamResult + X.ScorerResult),2) TotalResult
                    From (
                    Select U.UserSign,
                        CASE M.Result1X2
                        WHEN '1' Then M.OddsResult1
                        WHEN 'X' Then M.OddsResultX
                        WHEN '2' Then M.OddsResult2
                        ELSE 0 END MatchResult,
                        0 TeamResult,
                        0 ScorerResult
                    From TP_USERS AS U
                    Inner Join TP_USER_TIP_MATCHES AS UM on UM.UserID = U.UserID 
                    Inner Join TP_MATCHES AS M on M.CompID = UM.CompID and M.MatchNo = UM.MatchNo and M.Result1X2 = UM.MatchTip
                    Where UM.CompID = (Select max(CompID) from TP_COMPETITIONS)
                    Union All
                    Select U.UserSign,
                        0 MatchResult,
                        CASE T.StageQualify1 WHEN UT.StageQualify1 THEN T.StageOdds1 ELSE 0 END +
                        CASE T.StageQualify2 WHEN UT.StageQualify2 THEN T.StageOdds2 ELSE 0 END +
                        CASE T.StageQualify3 WHEN UT.StageQualify3 THEN T.StageOdds3 ELSE 0 END +
                        CASE T.StageQualify4 WHEN UT.StageQualify4 THEN T.StageOdds4 ELSE 0 END +
                        CASE T.StageQualify5 WHEN UT.StageQualify5 THEN T.StageOdds5 ELSE 0 END TeamResult,
                        0 ScorerResult
                    From TP_USERS AS U
                    Inner Join TP_USER_TIP_TEAMS AS UT on UT.UserID = U.UserID 
                    Inner Join TP_TEAMS AS T on T.CompID = UT.CompID and T.TeamNo = UT.TeamNo
                    Where UT.CompID = (Select max(CompID) from TP_COMPETITIONS)
                    Union All
                    Select U.UserSign,
                        0 MatchResult,
                        0 TeamResult,
                        S.ScorerGoals ScorerResult
                    From TP_USERS AS U
                    Inner Join TP_USER_TIP_SCORERS AS US on US.UserID = U.UserID 
                    Inner Join TP_SCORERS AS S on S.CompID = US.CompID and S.ScorerID = US.ScorerID
                    Where US.CompID = (Select max(CompID) from TP_COMPETITIONS)
                    ) X
                    Group By X.UserSign
                    Order By 5 desc`, function (error, results, fields) {
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
