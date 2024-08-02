import React, { useState } from 'react';

const TeamForm = ({ groupNames, onAddTeam }) => {
  const [teamName, setTeamName] = useState('');
  const [groupName, setGroupName] = useState(groupNames[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTeam(groupName, teamName);
    setTeamName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={groupName} onChange={(e) => setGroupName(e.target.value)}>
        {groupNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Nombre del Equipo"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <button type="submit">Agregar Equipo</button>
    </form>
  );
};

export default TeamForm;
