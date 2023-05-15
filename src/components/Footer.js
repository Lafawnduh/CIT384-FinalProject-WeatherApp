import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">
        &copy; Matador Weather {new Date().getFullYear()}<br></br>
        <a href='https://github.com/Lafawnduh/CIT384-FinalProject-WeatherApp' title="GitHub Repositiory">Source Code</a>
      </p>
    </footer>
  );
}

export default Footer;
