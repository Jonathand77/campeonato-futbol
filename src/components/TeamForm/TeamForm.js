import React, { useState } from 'react';
import { FaFutbol, FaPlusCircle, FaSitemap } from 'react-icons/fa';
import './TeamForm.css';

const TeamForm = ({ groupNames, onAddTeam }) => {
  const [teamName, setTeamName] = useState('');
  const [groupName, setGroupName] = useState(groupNames[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName || !teamName.trim()) {
      return;
    }
    onAddTeam(groupName, teamName);
    setTeamName('');
  };

  if (!groupNames.length) {
    return null;
  }

  return (
    <div className="team-form">
      <form onSubmit={handleSubmit} className="form-card form-card--inline">
        <h3 className="form-card__title"><FaFutbol /> Agregar equipo</h3>
        <label htmlFor="group-select" className="sr-only">Selecciona grupo</label>
        <select id="group-select" value={groupName} onChange={(e) => setGroupName(e.target.value)}>
          {groupNames.map((name) => (
            <option key={name} value={name}>
              Grupo {name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Nombre del Equipo"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <button type="submit" className="btn btn--accent"><FaPlusCircle /> Registrar equipo</button>
        <span className="form-card__hint"><FaSitemap /> Equipos asociados al grupo seleccionado</span>
      </form>
    </div>
  );
};

export default TeamForm;