import React from 'react'
import './css/footer.css'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-container">
        <div className="site-footer-top">

          <div className="footer-brand">
            <p className="footer-kicker">GRAN DT RUGBY</p>
            <h3>Gran DT <span>Rugby</span></h3>
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
              <li><a href="/">Tabla general</a></li>
              <li><a href="/">Próximos partidos</a></li>
              <li><a href="/">Premios</a></li>
              <li><a href="/">Reglamento</a></li>
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