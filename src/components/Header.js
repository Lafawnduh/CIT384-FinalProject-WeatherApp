import React from 'react';
import '../styles/Header.css';
import logo from '../images/matador.png';


function Header() {
  return (
    <header className="header">
      <h1 className="header-title">Matador Weather</h1>
      <img className="header-logo" src={logo} alt="University Logo" />
    </header>
  );
}

export default Header;
