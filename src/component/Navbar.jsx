import { useNavigate } from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';
import './css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/login', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  };

  return (
    <header className="app-navbar">
      <div className="navbar-left" onClick={() => navigate('/home', { replace: true })}>
        <span className="navbar-logo">Gran DT</span>
        <span className="navbar-tag">Rugby</span>
      </div>
      <div className="navbar-right">
        <div className="navbar-links">
          <button type="button" onClick={() => navigate('/home', { replace: true })}>
            Inicio
          </button>
          <button type="button" onClick={() => navigate('/dashboard', { replace: true })}>
            Dashboard
          </button>
        </div>
        <div className="navbar-session">
          {isAuthenticated ? (
            <span className="navbar-user">Hola, {userName || 'Jugador'}</span>
          ) : (
            <span className="navbar-user">Bienvenido</span>
          )}
          <button className="navbar-button" onClick={handleAuthClick}>
            {isAuthenticated ? 'Cerrar sesión' : 'Iniciar sesión'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
