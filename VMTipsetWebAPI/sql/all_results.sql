Select X.UserSign,
    Round(Sum(X.MatchResult),2) AS MatchResult,
    Round(Sum(X.TeamResult),2) AS TeamResult,
    Round(Sum(X.ScorerResult),2) AS ScorerResult,
    Round(Sum(X.MatchResult + X.TeamResult + X.ScorerResult),2) AS TotalResult
From (
  Select U.UserSign,
      (CASE M.Result1X2
      WHEN '1' Then M.OddsResult1
      WHEN 'X' Then M.OddsResultX
      WHEN '2' Then M.OddsResult2
      ELSE  0  END) AS MatchResult,
      0 AS TeamResult,
      0 AS ScorerResult
  From TP_USERS AS U
  Inner Join TP_USER_TIP_MATCHES AS UM on UM.UserID = U.UserID
  Inner Join TP_MATCHES AS M on M.CompID = UM.CompID and M.MatchNo = UM.MatchNo and M.Result1X2 = UM.MatchTip
  Where UM.CompID = (Select max(CompID) from TP_COMPETITIONS)
  Union All
  Select U.UserSign,
      0 AS MatchResult,
      CASE T.StageQualify1 WHEN UT.StageQualify1 THEN T.StageOdds1 ELSE 0 END +
      CASE T.StageQualify2 WHEN UT.StageQualify2 THEN T.StageOdds2 ELSE 0 END +
      CASE T.StageQualify3 WHEN UT.StageQualify3 THEN T.StageOdds3 ELSE 0 END +
      CASE T.StageQualify4 WHEN UT.StageQualify4 THEN T.StageOdds4 ELSE 0 END +
      CASE T.StageQualify5 WHEN UT.StageQualify5 THEN T.StageOdds5 ELSE 0 END AS TeamResult,
      0 AS ScorerResult
  From TP_USERS AS U
  Inner Join TP_USER_TIP_TEAMS AS UT on UT.UserID = U.UserID
  Inner Join TP_TEAMS AS T on T.CompID = UT.CompID and T.TeamNo = UT.TeamNo
  Where UT.CompID = (Select max(CompID) from TP_COMPETITIONS)
  Union All
  Select U.UserSign,
      0 AS MatchResult,
      0 AS TeamResult,
      S.ScorerGoals AS ScorerResult
  From TP_USERS AS U
  Inner Join TP_USER_TIP_SCORERS AS US on US.UserID = U.UserID
  Inner Join TP_SCORERS AS S on S.CompID = US.CompID and S.ScorerID = US.ScorerID
  Where US.CompID = (Select max(CompID) from TP_COMPETITIONS)
) AS X
Group By X.UserSign
Order By 5 desc
