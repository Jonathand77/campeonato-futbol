import React, { useState } from 'react';
import { FaPlusCircle, FaUsers } from 'react-icons/fa';
import './GroupForm.css';

const GroupForm = ({ onAddGroup }) => {
  const [groupName, setGroupName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim()) {
      return;
    }
    onAddGroup(groupName);
    setGroupName('');
  };

  return (
    <div className="group-form">
      <form onSubmit={handleSubmit} className="form-card form-card--inline">
        <h3 className="form-card__title"><FaUsers /> Crear grupo</h3>
        <input
          type="text"
          placeholder="Nombre del Grupo"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button type="submit" className="btn btn--primary"><FaPlusCircle /> Agregar grupo</button>
      </form>
    </div>
  );
};

export default GroupForm;