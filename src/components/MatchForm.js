import React, { useState } from 'react';

const MatchForm = ({ onAddMatch }) => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMatch({ team1, team2, score1: parseInt(score1, 10), score2: parseInt(score2, 10) });
    setTeam1('');
    setTeam2('');
    setScore1('');
    setScore2('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Equipo 1"
        value={team1}
        onChange={(e) => setTeam1(e.target.value)}
      />
      <input
        type="number"
        placeholder="Goles Equipo 1"
        value={score1}
        onChange={(e) => setScore1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Equipo 2"
        value={team2}
        onChange={(e) => setTeam2(e.target.value)}
      />
      <input
        type="number"
        placeholder="Goles Equipo 2"
        value={score2}
        onChange={(e) => setScore2(e.target.value)}
      />
      <button type="submit">Agregar Partido</button>
    </form>
  );
};

export default MatchForm;
