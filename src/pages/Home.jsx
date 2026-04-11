import React from 'react'
import useAuthStore from '../hooks/useAuthStore'
import './css/home.css'

const Home = () => {
  const userName = useAuthStore((state) => state.userName)

  return (
    <div className="home-page">
      <article className="home-card">
        <header className="home-header">
          <div>
            <p className="home-badge">Gran DT | Torneo 2026</p>
            <h1>Bienvenido{userName ? `, ${userName}` : ""}!</h1>
            <p className="home-subtitle">
              Este es tu panel de usuario para seguir el torneo y ganar premios.
            </p>
          </div>
        </header>

        <section className="home-intro">
          <div className="home-info-card">
            <h2>Próximo partido</h2>
            <p>River vs Boca · Sábado 20:00</p>
          </div>
          <div className="home-info-card">
            <h2>Tu posición</h2>
            <p>4° lugar en la tabla general</p>
          </div>
          <div className="home-info-card">
            <h2>Puntos</h2>
            <p>1.940 puntos acumulados</p>
          </div>
        </section>

        <section className="home-prizes">
          <h2>Premios del torneo Gran DT</h2>
          <div className="prize-list">
            <article className="prize-card">
              <strong>Copa Grand Champion</strong>
              <p>Para el líder del torneo al final de la jornada.</p>
            </article>
            <article className="prize-card">
              <strong>Vale por indumentaria</strong>
              <p>Kit oficial de la próxima temporada para los 3 primeros.</p>
            </article>
            <article className="prize-card">
              <strong>Socio premium</strong>
              <p>Acceso privilegiado a contenido exclusivo y eventos.</p>
            </article>
          </div>
        </section>
      </article>
    </div>
  )
}

export default Home