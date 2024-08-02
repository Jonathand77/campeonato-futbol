import React from 'react';
import Team from './Team';

const GroupTable = ({ group }) => {
  const sortedTeams = group.teams.sort((a, b) => {
    if (b.points === a.points) {
      return b.goalDifference - a.goalDifference;
    }
    return b.points - a.points;
  });

  return (
    <div className="group-table-container">
      <h2 className="group-name">Grupo {group.name}</h2>
      <table>
        <thead>
          <tr>
            <th>Equipo</th>
            <th>Jugados</th>
            <th>Ganados</th>
            <th>Empatados</th>
            <th>Perdidos</th>
            <th>Puntos</th>
            <th>Diferencia de Gol</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map(team => (
            <Team key={team.id} team={team} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupTable;
