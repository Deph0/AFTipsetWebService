Select U.UserSign,
    Round(Sum(S.ScorerGoals),2) ScorerResult
From TP_USERS AS U
Inner Join TP_USER_TIP_SCORERS AS US on US.UserID = U.UserID
Inner Join TP_SCORERS AS S on S.CompID = US.CompID and S.ScorerID = US.ScorerID
Where US.CompID = (Select max(CompID) from TP_COMPETITIONS)
Group By U.UserSign
Order By 2 desc
