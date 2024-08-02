import React, { useState } from 'react';

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
    onAddResult(matchIndex, results[matchIndex]);
  };

  return (
    <div className='semifinal'>
      <h1>Gran Final !</h1>
      {semifinalMatches.map((match, index) => (
        <div key={index}>
          <p>
            {match.team1.name} vs {match.team2.name}
          </p>
          <input
            type="number"
            placeholder={`${match.team1.name} Goles`}
            onChange={(e) => handleChange(index, 'team1', parseInt(e.target.value))}
          />
          <input
            type="number"
            placeholder={`${match.team2.name} Goles`}
            onChange={(e) => handleChange(index, 'team2', parseInt(e.target.value))}
          />
          <button onClick={() => handleSubmit(index)}>Añadir Resultado</button>
        </div>
      ))}
    </div>
  );
};

export default SemifinalStage;
