import React from 'react';
import KnockoutStage from './KnockoutStage';

const KnockoutSection = ({ knockoutMatches, createKnockoutMatches, addKnockoutResult }) => {
  return (
    <div className="section knockout-section">
      <button onClick={createKnockoutMatches}>Generar Eliminatorias</button>
      <KnockoutStage knockoutMatches={knockoutMatches} onAddResult={addKnockoutResult} />
    </div>
  );
};

export default KnockoutSection;
