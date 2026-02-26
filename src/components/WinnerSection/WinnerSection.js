import React from 'react';
import Winner from '../Winner';
import './WinnerSection.css';

const WinnerSection = ({ winner }) => {
  return (
    <div className="section winner-section">
      {winner && <Winner winner={winner} />}
    </div>
  );
};

export default WinnerSection;