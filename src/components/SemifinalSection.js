import React from 'react';
import Semifinal from './SemiFinal';

const SemifinalSection = ({ semifinalMatches, addSemifinalResult }) => {
  return (
    <div className="section semifinal-section">
      <Semifinal semifinalMatches={semifinalMatches} onAddResult={addSemifinalResult} />
    </div>
  );
};

export default SemifinalSection;
