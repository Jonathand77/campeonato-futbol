import React, { useState } from 'react';
import { FaFlagCheckered, FaFutbol, FaRegClock } from 'react-icons/fa';
import SectionCard from '../SectionCard';
import { parseScore } from '../../utils/tournament';
import './SemiFinal.css';

const SemifinalStage = ({ semifinalMatches, onAddResult }) => {
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

  if (!semifinalMatches.length) {
    return (
      <SectionCard title="Gran final" icon={<FaFlagCheckered />} description="Los finalistas aparecerán automáticamente.">
        <div className="empty-state">
          <h3><FaRegClock /> Fase pendiente</h3>
          <p>Completa las eliminatorias para habilitar la final.</p>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Gran final" icon={<FaFlagCheckered />} description="Un solo partido define al campeón.">
      {semifinalMatches.map((match, index) => (
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
          <button type="button" className="btn btn--primary" onClick={() => handleSubmit(index)}>Cerrar final</button>
        </div>
      ))}
    </SectionCard>
  );
};

export default SemifinalStage;