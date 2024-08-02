import React from 'react';

const Winner = ({ winner }) => {
  return (
    <div className="winner">
      <h1>¡¡¡ Ganador !!!</h1>
      <p>{winner.name}</p>
    </div>
  );
};

export default Winner;
