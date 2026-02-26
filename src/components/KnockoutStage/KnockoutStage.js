import React, { useState } from 'react';
import { FaArrowRight, FaFutbol, FaTrophy } from 'react-icons/fa';
import SectionCard from '../SectionCard';
import { parseScore } from '../../utils/tournament';
import './KnockoutStage.css';

const KnockoutStage = ({ knockoutMatches, onAddResult }) => {
  const [results, setResults] = useState({});

  const handleChange = (matchIndex, team, value) => {
    setResults({
      ...results,
      [matchIndex]: {
        ...results[matchIndex],
        [team]: value,
      },
    });
  };

  const handleSubmit = (matchIndex) => {
    const currentResult = results[matchIndex];
    if (currentResult?.team1 === undefined || currentResult?.team2 === undefined) {
      return;
    }

    if (currentResult.team1 === currentResult.team2) {
      return;
    }

    onAddResult(matchIndex, currentResult);
  };

  if (!knockoutMatches.length) {
    return (
      <SectionCard title="Eliminatorias" icon={<FaTrophy />} description="Genera cruces para habilitar esta fase.">
        <div className="empty-state">
          <h3><FaArrowRight /> Esperando cruces</h3>
          <p>Cuando tengas clasificados, genera eliminatorias desde la sección principal.</p>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Eliminatorias" icon={<FaTrophy />} description="Registra el marcador para definir finalistas.">
      {knockoutMatches.map((match, index) => (
        <div key={`${match.team1?.name}-${match.team2?.name}-${index}`} className="match-card">
          <p className="match-card__title">
            <FaFutbol /> {match.team1?.name || 'Equipo 1'} vs {match.team2?.name || 'Equipo 2'}
          </p>
          <input
            type="number"
            placeholder={`${match.team1?.name || 'Equipo 1'} goles`}
            min="0"
            onChange={(e) => handleChange(index, 'team1', parseScore(e.target.value))}
          />
          <input
            type="number"
            placeholder={`${match.team2?.name || 'Equipo 2'} goles`}
            min="0"
            onChange={(e) => handleChange(index, 'team2', parseScore(e.target.value))}
          />
          <button type="button" className="btn btn--accent" onClick={() => handleSubmit(index)}>Guardar resultado</button>
        </div>
      ))}
    </SectionCard>
  );
};

export default KnockoutStage;