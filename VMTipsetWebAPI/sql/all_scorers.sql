SELECT
    u.UserSign,
    s.ScorerName,
    s.ScorerGoals
FROM tp_users AS u
JOIN tp_user_tip_scorers AS us ON us.UserID = u.UserID
JOIN tp_scorers AS s ON s.ScorerID = us.ScorerID AND s.CompID = us.CompID
WHERE s.CompID = (SELECT MAX(CompID) FROM tp_competitions)
