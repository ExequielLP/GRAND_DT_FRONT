import React from 'react'
import './css/home.css'

const Home = () => {
  return (
    <div className="home-page">
      <div className="container">
        <main className="home-shell">
          <section className="home-hero">
            <div className="home-hero-left">
              <p className="home-badge">GRAN DT RUGBY | TEMPORADA 2026</p>

              <h1 className="home-title">Viví el torneo desde adentro</h1>

              <p className="home-subtitle">
                Seguí la competencia, conocé el rendimiento del club y preparate
                para disputar cada fecha del Gran DT Rugby con toda la intensidad
                del juego.
              </p>

              <div className="home-hero-actions">
                <button className="home-primary-btn" onClick={() => window.location.href = '/login'}>Ver torneo</button >
                <button className="home-secondary-btn">Conocer premios</button>
              </div>
            </div>

            <div className="home-hero-right">
              <div className="hero-top-card">
                <span className="hero-top-label">Posición actual del club</span>
                <strong className="hero-top-rank">3° puesto</strong>
              </div>

              <div className="hero-stats-grid">
                <div className="hero-stat-card">
                  <span>Puntos en la tabla</span>
                  <strong>27</strong>
                </div>

                <div className="hero-stat-card">
                  <span>Fecha actual</span>
                  <strong>Jornada 8</strong>
                </div>
              </div>

              <div className="hero-match-card">
                <span className="hero-match-label">Próximo partido</span>
                <h3>LPRC vs San Luis</h3>
                <p>Sábado · 20:00 hs · Cancha principal</p>
              </div>
            </div>
          </section>

          <section className="home-summary">
            <article className="home-card-block featured">
              <span className="card-kicker">Temporada en juego</span>
              <h2>El club pelea arriba</h2>
              <p>
                La temporada está en marcha y cada fecha puede cambiar la historia.
                Seguí el presente del equipo y viví el torneo con mentalidad competitiva.
              </p>
            </article>

            <article className="home-card-block">
              <span className="card-kicker">Tabla general</span>
              <h2>3° puesto actual</h2>
              <p>
                El club se mantiene en zona alta y sigue firme en la pelea por los
                primeros lugares del campeonato.
              </p>
            </article>

            <article className="home-card-block">
              <span className="card-kicker">Rendimiento</span>
              <h2>Buen momento colectivo</h2>
              <p>
                El equipo llega con una racha positiva y con jugadores clave
                marcando diferencias en cada jornada.
              </p>
            </article>

            <article className="home-card-block">
              <span className="card-kicker">Objetivo</span>
              <h2>Ir por la cima</h2>
              <p>
                La meta es clara: sostener el nivel, sumar en cada fecha y pelear
                hasta el final por el liderazgo del torneo.
              </p>
            </article>
          </section>

          <section className="home-content-grid">
            <div className="home-main-column">
              <section className="home-section-panel">
                <div className="section-header">
                  <div>
                    <p className="section-kicker">Competencia</p>
                    <h2>Premios del torneo</h2>
                  </div>

                  <p className="section-description">
                    Reconocimientos para los mejores managers y para quienes marquen la diferencia a lo largo de la temporada.
                  </p>
                </div>

                <div className="prize-list">
                  <article className="prize-card">
                    <span className="prize-icon">🏆</span>
                    <strong>Copa Grand Champion</strong>
                    <p>
                      Para quien termine la temporada como líder absoluto del torneo y
                      se convierta en el gran campeón del año.
                    </p>
                  </article>

                  <article className="prize-card">
                    <span className="prize-icon">🎽</span>
                    <strong>Indumentaria oficial</strong>
                    <p>
                      Premio especial para los mejores participantes con kit oficial y
                      reconocimiento destacado en la competencia.
                    </p>
                  </article>

                  <article className="prize-card">
                    <span className="prize-icon">⭐</span>
                    <strong>Acceso premium</strong>
                    <p>
                      Beneficios exclusivos, novedades del torneo y experiencias
                      especiales para los participantes destacados.
                    </p>
                  </article>
                </div>
              </section>
            </div>

            <aside className="home-side-column">
              <section className="side-panel">
                <div className="section-header side">
                  <div>
                    <p className="section-kicker">Claves del torneo</p>
                    <h3>Lo que hace grande a cada fecha</h3>
                  </div>
                </div>

                <ul className="home-check-list">
                  <li>Rendimiento individual de los jugadores</li>
                  <li>Resultados del club jornada a jornada</li>
                  <li>Estrategia para sostener regularidad</li>
                  <li>Competencia real hasta el último partido</li>
                </ul>
              </section>

              <section className="side-panel accent">
                <div className="section-header side">
                  <div>
                    <p className="section-kicker">Espíritu de juego</p>
                    <h3>Rugby, estrategia y constancia</h3>
                  </div>
                </div>

                <p className="home-panel-text">
                  Este Gran DT está pensado para vivir el rugby con intensidad,
                  lectura del juego y pasión por la competencia. Cada punto importa,
                  cada fecha cuenta y cada decisión puede acercarte a la cima.
                </p>
              </section>
            </aside>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Home