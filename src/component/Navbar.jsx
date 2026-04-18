import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';
import './css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/login', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
    setMenuOpen(false);
  };

  const goTo = (path) => {
    navigate(path, { replace: true });
    setMenuOpen(false);
  };

  return (
    <header className="app-navbar">
      <div className="navbar-top-row">
        <div
          className="navbar-left"
          onClick={() => goTo('/home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') goTo('/home');
          }}
        >
          <span className="navbar-logo">Gran DT</span>
          <span className="navbar-tag">La Plata Rugby</span>
        </div>

        <button
          type="button"
          className={`navbar-menu-toggle ${menuOpen ? 'active' : ''}`}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`navbar-right ${menuOpen ? 'open' : ''}`}>
        <div className="navbar-links">
          <button type="button" onClick={() => goTo('/home')}>
            Inicio
          </button>

          {isAuthenticated ? (
            <button type="button" onClick={() => goTo('/dashboard')}>
              Dashboard
            </button>
          ) : null}
        </div>

        <div className="navbar-session">
          {isAuthenticated ? (
            <span className="navbar-user-pill">Hola {userName || 'Jugador'}</span>
          ) : (
            <button
              className="navbar-button navbar-secondary"
              type="button"
              onClick={() => goTo('/register')}
            >
              Registrarse
            </button>
          )}

          <button className="navbar-button" type="button" onClick={handleAuthClick}>
            {isAuthenticated ? 'Cerrar sesión' : 'Iniciar sesión'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;