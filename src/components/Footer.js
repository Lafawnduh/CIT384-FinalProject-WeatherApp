import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-text">
        <p>&copy; Matador Weather {new Date().getFullYear()}</p>
        <a href='https://github.com/Lafawnduh/CIT384-FinalProject-WeatherApp' target="_blank" rel="noopener noreferrer" title="GitHub Repository">Source Code</a>
      </div>
    </footer>
  );
}

export default Footer;
