import React from 'react';
import './SectionCard.css';

const SectionCard = ({ title, icon, description, actions, children, className = '' }) => {
  return (
    <section className={`section-card ${className}`.trim()}>
      <header className="section-card__header">
        <h2 className="section-card__title">
          {icon && <span className="section-card__icon">{icon}</span>}
          {title}
        </h2>
        {description && <p className="section-card__description">{description}</p>}
      </header>
      {actions && <div className="section-card__actions">{actions}</div>}
      <div className="section-card__content">{children}</div>
    </section>
  );
};

export default SectionCard;