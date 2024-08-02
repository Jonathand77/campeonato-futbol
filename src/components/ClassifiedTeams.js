import React from 'react';

const ClassifiedTeams = ({ classifiedTeams }) => {
  return (
    <div className="classified-teams">
      <h1>Clasificados</h1>
      {Object.keys(classifiedTeams).map((groupName) => (
        <div key={groupName}>
          <h3>Grupo {groupName}</h3>
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
