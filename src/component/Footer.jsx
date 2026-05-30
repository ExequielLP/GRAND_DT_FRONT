import React from 'react'
import './css/footer.css'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="site-footer-top">

          <div className="footer-brand">
            <p className="footer-kicker">GRAN DT RUGBY</p>
            <h3 className="footer-club-name">La Plata Rugby Club</h3>
            <p className="footer-text">
              Una experiencia pensada para vivir el rugby con estrategia,
              competencia y pasión en cada fecha.
            </p>
          </div>

          <div className="footer-links-group">
            <h4>Navegación</h4>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li><a href="/login">Ingresar</a></li>
              <li><a href="/register">Registrarse</a></li>
              <li><a href="/players">Jugadores</a></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Torneo</h4>
            <ul>
              <li><a href="https://www.google.com/search?q=tabla+de+torneo+urba&oq=tabla+de+torneo+urba&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yBwgCEAAY7wUyCggDEAAYogQYiQUyBwgEEAAY7wUyBwgFEAAY7wXSAQg1MDczajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#cobssid=s&sie=lg;/g/11mzn_tq2p;8;/m/0cc5613;st;fp;1;;;;0" target="_blank" rel="noreferrer">Tabla de torneo</a></li>
              <li><a href="https://www.instagram.com/p/DXKgM_xgaWB/?img_index=1" target="_blank" rel="noreferrer">Próximos partidos</a></li>
              <li><a href="/login">Ingresar</a></li>
              <li><a href="/register">Registrarse</a></li>
            </ul>
          </div>

        </div>

        <div className="site-footer-bottom">
          <p>© 2026 Gran DT Rugby. Todos los derechos reservados.</p>
          <p>Diseñado para competir con mentalidad de rugby.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer