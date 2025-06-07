import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import '../css/NavBar.css';

const NavBar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-text">MovieVerse</span>
        </Link>
        
        <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <div className="view-toggle">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/favorite" 
              className={`nav-link ${location.pathname === '/favorite' ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;