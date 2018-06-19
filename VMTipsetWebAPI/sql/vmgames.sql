select
  MatchNo
  , MatchDate
  , teams_home.TeamName as HomeTeam
  , teams_away.TeamName as AwayTeam
from tp_matches
join tp_teams AS teams_home on teams_home.TeamNo = tp_matches.HomeTeamNo and teams_home.CompID = tp_matches.CompID
join tp_teams AS teams_away on teams_away.TeamNo  = tp_matches.AwayTeamNo and teams_away.CompID = tp_matches.CompID
where tp_matches.CompID = (SELECT  MAX(CompID) FROM tp_competitions)
order by MatchNo
