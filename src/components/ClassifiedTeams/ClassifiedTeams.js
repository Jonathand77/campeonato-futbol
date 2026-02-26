import React from 'react';
import { FaMedal, FaStar } from 'react-icons/fa';
import './ClassifiedTeams.css';

const ClassifiedTeams = ({ classifiedTeams }) => {
  const groupKeys = Object.keys(classifiedTeams);

  if (!groupKeys.length) {
    return (
      <div className="empty-state">
        <h3><FaMedal /> Sin clasificados</h3>
        <p>Completa partidos de grupos para calcular clasificados.</p>
      </div>
    );
  }

  return (
    <div className="classified-teams">
      {groupKeys.map((groupName) => (
        <div key={groupName} className="classified-teams__group">
          <h3><FaStar /> Grupo {groupName}</h3>
          <ol>
            {classifiedTeams[groupName].map((team) => (
              <li key={team.id}>{team.name}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default ClassifiedTeams;