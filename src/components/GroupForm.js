import React, { useState } from 'react';

const GroupForm = ({ onAddGroup }) => {
  const [groupName, setGroupName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGroup(groupName);
    setGroupName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del Grupo"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <button type="submit">Agregar Grupo</button>
    </form>
  );
};

export default GroupForm;
