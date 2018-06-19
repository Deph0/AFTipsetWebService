SELECT U.UserSign
    , UM.MatchTip
    , M.Result1X2
    , M.MatchNo
    , TH.TeamName
    , TA.TeamName
FROM tp_users AS U
JOIN tp_user_tip_matches AS UM ON UM.UserID = U.UserID
JOIN tp_matches AS M ON M.MatchNo = UM.MatchNo  AND M.CompID = UM.CompID /*AND M.result1x2 = UM.MatchTip*/
JOIN tp_teams as TH on TH.TeamNo = M.HomeTeamNo and TH.CompID = UM.CompID
JOIN tp_teams as TA on TA.TeamNo = M.AwayTeamNo and TA.CompID = UM.CompID
WHERE UM.CompID = (SELECT Max(CompID) FROM tp_competitions)
order by M.MatchNo
