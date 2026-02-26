import React from 'react';
import './Match.css';

const Match = ({ match }) => (
  <div className="match-item">
    <p>{match.team1} vs {match.team2}</p>
    <p>Score: {match.score1} - {match.score2}</p>
  </div>
);

export default Match;