import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">&copy; Matador Weather {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
