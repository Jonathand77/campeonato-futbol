import React from 'react';
import { FaTable } from 'react-icons/fa';
import Team from '../Team';
import { sortTeams } from '../../utils/tournament';
import './GroupTable.css';

const GroupTable = ({ group }) => {
  const sortedTeams = sortTeams(group.teams);

  return (
    <div className="group-table-container">
      <h3 className="group-name"><FaTable /> Grupo {group.name}</h3>
      <table className="data-table">
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
          {sortedTeams.map((team) => (
            <Team key={team.id} team={team} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupTable;