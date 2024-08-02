import React from 'react';

const Team = ({ team }) => (
  <tr>
    <td>{team.name}</td>
    <td>{team.played}</td>
    <td>{team.won}</td>
    <td>{team.drawn}</td>
    <td>{team.lost}</td>
    <td>{team.points}</td>
    <td>{team.goalDifference}</td>
  </tr>
);

export default Team;
