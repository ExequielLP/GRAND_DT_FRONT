import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../hooks/useAuthStore'
import './css/dashboard.css'

const positionLabel = {
  PRIMERA_LINEA: 'Primera Línea',
  SEGUNDA_LINEA: 'Segunda Línea',
  TERCERA_LINEA: 'Tercera Línea',
  MEDIOSCRUM: 'Medio Scrum',
  APERTURA: 'Apertura',
  WING: 'Wing',
  CENTRO: 'Centro',
  FULLBACK: 'Fullback',
}

const positionByNumber = {
  1: 'PRIMERA_LINEA', 2: 'PRIMERA_LINEA', 3: 'PRIMERA_LINEA',
  4: 'SEGUNDA_LINEA', 5: 'SEGUNDA_LINEA',
  6: 'TERCERA_LINEA', 7: 'TERCERA_LINEA', 8: 'TERCERA_LINEA',
  9: 'MEDIOSCRUM', 10: 'APERTURA',
  11: 'WING', 12: 'CENTRO', 13: 'CENTRO', 14: 'WING', 15: 'FULLBACK',
}

const Dashboard = () => {
  const userName = useAuthStore((state) => state.userName) || 'Jugador'
  const submittedTeam = useAuthStore((state) => state.submittedTeam)

  return (
    <div className="dashboard-page">
      <div className="dashboard-layout">
        <section className="dashboard-hero-grid">
          <article className="dashboard-card dashboard-hero-info">
            <div className="dashboard-card-body dashboard-hero-content">
              <span className="dashboard-badge">Temporada 2026</span>

              <h1>Hola, {userName}</h1>

              <p>
                Armá tu equipo de 15 jugadores, seguí las fechas del torneo y competí por premios.
              </p>

              <div className="dashboard-actions">
                <Link to="/players" className="dashboard-btn dashboard-btn-primary">
                  Armar equipo
                </Link>

                <Link to="/home" className="dashboard-btn dashboard-btn-secondary">
                  Resultados
                </Link>
              </div>
            </div>
          </article>

          <article className="dashboard-card dashboard-hero-image-card">
            <header className="dashboard-card-header">
              <h2>LPRC</h2>
              <p>Acción y equipo</p>
            </header>

            <div className="dashboard-image-frame">
              <img src="/canacha1.png" alt="Rugby players" />
              <span className="dashboard-image-label">LPRC action</span>
            </div>
          </article>
        </section>

        <section className="dashboard-grid dashboard-grid-top">
          <article className="dashboard-card">
            <header className="dashboard-card-header">
              <h2>Elegí tu XV ideal</h2>
              <p>Combiná estrategia y rendimiento</p>
            </header>

            <div className="dashboard-card-body">
              <div className="dashboard-mini-grid">
                <div className="dashboard-mini-card">
                  <h3>Forwards</h3>
                  <p>Scrum, defensa y contacto</p>
                </div>

                <div className="dashboard-mini-card">
                  <h3>Backs</h3>
                  <p>Velocidad y tries</p>
                </div>

                <div className="dashboard-mini-card">
                  <h3>Capitán</h3>
                  <p>Jugador clave</p>
                </div>
              </div>
            </div>
          </article>

          <article className="dashboard-card">
            <header className="dashboard-card-header">
              <h2>Publicidad</h2>
              <p>Viví el rugby</p>
            </header>

            <div className="dashboard-advert-images">
              <img src="/bysl.jpeg" alt="stadium" />
              <img
                src="patadaSL.png"
                alt="rugby"
              />
            </div>
          </article>
        </section>

        <section className="dashboard-card">
          {submittedTeam ? (
            <>
              <header className="dashboard-card-header">
                <h2>Tu equipo</h2>
                <p>15 / 15 jugadores seleccionados</p>
              </header>
              <div className="dashboard-card-body">
                <div className="dashboard-team-list">
                  {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => {
                    const player = submittedTeam[num]
                    if (!player) return null
                    return (
                      <div key={num} className="dashboard-team-row">
                        <span className="dashboard-team-number">{num}</span>
                        <span className="dashboard-team-name">
                          {player.firstName} {player.lastName}
                        </span>
                        <span className="dashboard-team-position">
                          {positionLabel[positionByNumber[num]]}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <header className="dashboard-card-header">
                <h2>Armá tu equipo</h2>
                <p>0 / 15 jugadores</p>
              </header>
              <div className="dashboard-card-body">
                <div className="dashboard-mini-grid">
                  <div className="dashboard-mini-card">
                    <h3>Primera línea</h3>
                    <p>Pilares y hooker</p>
                  </div>
                  <div className="dashboard-mini-card">
                    <h3>Segunda</h3>
                    <p>Fuerza y obtención</p>
                  </div>
                  <div className="dashboard-mini-card">
                    <h3>Backs</h3>
                    <p>Creatividad y ataque</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

        <section className="dashboard-grid dashboard-grid-bottom">
          <article className="dashboard-card">
            <header className="dashboard-card-header">
              <h2>Premios</h2>
            </header>

            <div className="dashboard-card-body">
              <ul className="dashboard-list">
                <li>Kit rugby</li>
                <li>Entradas</li>
                <li>Experiencia VIP</li>
              </ul>
            </div>
          </article>

          <article className="dashboard-card">
            <header className="dashboard-card-header">
              <h2>Cómo jugar</h2>
            </header>

            <div className="dashboard-card-body">
              <ul className="dashboard-list">
                <li>Registrate</li>
                <li>Armá equipo</li>
                <li>Sumá puntos</li>
              </ul>
            </div>
          </article>
        </section>
      </div>
    </div>
  )
}

export default Dashboard