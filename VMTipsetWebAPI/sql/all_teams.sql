Select U.UserSign,
    Round(Sum(
        CASE T.StageQualify1 WHEN UT.StageQualify1 THEN T.StageOdds1 ELSE 0 END +
        CASE T.StageQualify2 WHEN UT.StageQualify2 THEN T.StageOdds2 ELSE 0 END +
        CASE T.StageQualify3 WHEN UT.StageQualify3 THEN T.StageOdds3 ELSE 0 END +
        CASE T.StageQualify4 WHEN UT.StageQualify4 THEN T.StageOdds4 ELSE 0 END +
        CASE T.StageQualify5 WHEN UT.StageQualify5 THEN T.StageOdds5 ELSE 0 END
    ),2) AS TeamResult
From TP_USERS AS U
Inner Join TP_USER_TIP_TEAMS AS UT on UT.UserID = U.UserID
Inner Join TP_TEAMS AS T on T.CompID = UT.CompID and T.TeamNo = UT.TeamNo
Where UT.CompID = (Select max(CompID) from TP_COMPETITIONS)
Group By U.UserSign
Order By 2 desc
