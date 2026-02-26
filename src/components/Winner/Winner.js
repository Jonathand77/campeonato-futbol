import React from 'react';
import { FaCrown, FaTrophy } from 'react-icons/fa';
import SectionCard from '../SectionCard';
import './Winner.css';

const Winner = ({ winner }) => {
  if (!winner) {
    return null;
  }

  return (
    <SectionCard title="Campeón" icon={<FaTrophy />} description="La gloria del torneo ya tiene dueño." className="winner-card">
      <div className="winner">
        <h1><FaCrown /> ¡Campeón del torneo!</h1>
        <p>{winner.name}</p>
      </div>
    </SectionCard>
  );
};

export default Winner;