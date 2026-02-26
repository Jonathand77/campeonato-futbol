import React from 'react';
import KnockoutStage from '../KnockoutStage';
import './KnockoutSection.css';

const KnockoutSection = ({ knockoutMatches, createKnockoutMatches, addKnockoutResult }) => {
  return (
    <div className="section knockout-section">
      <button className="btn btn--primary" onClick={createKnockoutMatches}>Generar Eliminatorias</button>
      <KnockoutStage knockoutMatches={knockoutMatches} onAddResult={addKnockoutResult} />
    </div>
  );
};

export default KnockoutSection;