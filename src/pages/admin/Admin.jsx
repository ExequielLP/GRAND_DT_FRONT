import React from 'react'
import "./css/admin.css"
import useAuthStore from '../../hooks/useAuthStore'
import { useNavigate } from 'react-router-dom'
const Admin = () => {
  const userName = useAuthStore((state) => state.userName);
    const navigate = useNavigate();
  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <span className="admin-badge">PANEL ADMINISTRADOR</span>
          <h1>Bienvenido, {userName}</h1>
          <p>Desde acá podés gestionar el torneo, los jugadores y los usuarios.</p>
        </div>

        <div className="admin-grid">
          <div className="admin-card" onClick={() => navigate('/listUsers')}>
            <span className="admin-card-icon">👥</span>
            <h3>Usuarios</h3>
            <p>Gestioná los usuarios registrados y sus roles.</p>
          </div>
          <div className="admin-card">
            <span className="admin-card-icon">🏉</span>
            <h3>Jugadores</h3>
            <p>Agregá, editá o eliminá jugadores del torneo.</p>
          </div>
          <button className="admin-card" onClick={() => navigate('/resultados')}>
            <span className="admin-card-icon">📋</span>
            <h3>Resultados</h3>
            <p>Cargá resultados y gestioná la tabla de posiciones.</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Admin
