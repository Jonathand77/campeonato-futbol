import React, { useState } from 'react';
import { FaCheckCircle, FaRegCalendarAlt } from 'react-icons/fa';
import { parseScore } from '../../utils/tournament';
import './MatchForm.css';

const MatchForm = ({ onAddMatch, groups }) => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');

  const allTeams = groups.flatMap((group) => group.teams.map((team) => team.name));

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedScore1 = parseScore(score1);
    const parsedScore2 = parseScore(score2);
    if (!team1 || !team2 || team1 === team2 || parsedScore1 === null || parsedScore2 === null) {
      return;
    }

    onAddMatch({ team1, team2, score1: parsedScore1, score2: parsedScore2 });
    setTeam1('');
    setTeam2('');
    setScore1('');
    setScore2('');
  };

  if (allTeams.length < 2) {
    return (
      <div className="empty-state">
        <h3><FaRegCalendarAlt /> Jornada no disponible</h3>
        <p>Registra al menos dos equipos en el mismo grupo para cargar un partido.</p>
      </div>
    );
  }

  return (
    <div className="match-form">
      <form onSubmit={handleSubmit} className="form-card form-card--match">
        <h3 className="form-card__title"><FaRegCalendarAlt /> Registrar resultado</h3>
        <select value={team1} onChange={(e) => setTeam1(e.target.value)}>
          <option value="">Equipo local</option>
          {allTeams.map((name) => (
            <option key={`team1-${name}`} value={name}>{name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Goles Equipo 1"
          value={score1}
          onChange={(e) => setScore1(e.target.value)}
          min="0"
        />
        <select value={team2} onChange={(e) => setTeam2(e.target.value)}>
          <option value="">Equipo visitante</option>
          {allTeams.map((name) => (
            <option key={`team2-${name}`} value={name}>{name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Goles Equipo 2"
          value={score2}
          onChange={(e) => setScore2(e.target.value)}
          min="0"
        />
        <button type="submit" className="btn btn--primary"><FaCheckCircle /> Guardar partido</button>
      </form>
    </div>
  );
};

export default MatchForm;