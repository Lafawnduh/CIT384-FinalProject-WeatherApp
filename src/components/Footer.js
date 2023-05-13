import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">&copy; CIT 384 Web App Project {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
