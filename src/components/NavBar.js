import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../assets/img/LogoTorneoFC24.png';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/KnockoutStage">SemiFinal</Link>
        </li>
        <li>
          <Link to="/semifinal">Final</Link>
        </li>
        <li>
          <Link to="/winner">Ganador</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
