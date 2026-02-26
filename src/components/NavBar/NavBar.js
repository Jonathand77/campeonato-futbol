import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaFlagCheckered, FaTrophy } from 'react-icons/fa';
import './NavBar.css';
import logo from '../../assets/img/LogoTorneoFC.png';

const NavBar = () => {
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Inicio', icon: <FaHome /> },
    { to: '/knockout', label: 'Eliminatorias', icon: <FaProjectDiagram /> },
    { to: '/semifinal', label: 'Final', icon: <FaFlagCheckered /> },
    { to: '/winner', label: 'Ganador', icon: <FaTrophy /> },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo Torneo FC" />
        <span>Torneo FC 26</span>
      </div>
      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className={pathname === link.to ? 'active' : ''}>
              {link.icon}
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;