import React from 'react';

const Match = ({ match }) => (
  <div>
    <p>{match.team1} vs {match.team2}</p>
    <p>Score: {match.score1} - {match.score2}</p>
  </div>
);

export default Match;
