import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../hooks/useAuthStore'
import './css/dashboard.css'

const Dashboard = () => {
  const userName = useAuthStore((state) => state.userName) || 'Jugador'
  const [selectedPlayers, setSelectedPlayers] = useState([])

  const players = [
    {
      id: 1,
      name: 'Santiago Alarcón',
      position: 'Hooker',
      team: 'Los Cóndores',
      image:
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      name: 'Martín Rojas',
      position: 'Ala',
      team: 'Pumas',
      image:
        'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      name: 'Federico Moro',
      position: 'Segunda línea',
      team: 'Tigres',
      image:
        'https://images.unsplash.com/photo-1549046887-3668d8fcb0a9?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 4,
      name: 'Luciano Pérez',
      position: 'Centro',
      team: 'Jaguares',
      image:
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 5,
      name: 'Hernán Díaz',
      position: 'Fullback',
      team: 'Cóndores',
      image:
        'https://images.unsplash.com/photo-1534367612443-8d9b9b7f63dd?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 6,
      name: 'Nicolás Bravo',
      position: 'Pilar',
      team: 'Tiburones',
      image:
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80',
    },
  ]

  const togglePlayer = (playerId) => {
    setSelectedPlayers((current) => {
      if (current.includes(playerId)) {
        return current.filter((id) => id !== playerId)
      }
      if (current.length >= 15) return current
      return [...current, playerId]
    })
  }

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <span className="dashboard-tag">Gran DT Rugby</span>
          <h1>Hola{userName ? `, ${userName}` : ''}</h1>
          <p>
            Bienvenido al panel principal del Gran DT Rugby. Arma tu equipo de 15
            jugadores, seguí las fechas del torneo y ganá premios si acertás con las reglas.
          </p>
          <div className="dashboard-actions">
            <Link to="/players" className="dashboard-btn dashboard-btn-primary">
              Armar mi equipo
            </Link>
            <Link to="/home" className="dashboard-btn dashboard-btn-secondary">
              Mi panel de resultados
            </Link>
          </div>
        </div>

        <div className="dashboard-hero-image">
          <div className="dashboard-image-card">
            <img
              src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80"
              alt="Rugby players"
            />
            <div className="dashboard-image-tag">LPRC action</div>
          </div>
        </div>
      </section>

      <section className="dashboard-advert">
        <div className="advert-card advert-card-primary">
          <h2>Elegí tu XV ideal</h2>
          <p>
            Seleccioná los 15 jugadores que más creas que rendirán en la próxima fecha.
            Arma una estrategia ganadora con delanteros, backs y un capitán clave.
          </p>
        </div>
        <div className="advert-card advert-card-secondary">
          <h3>Publicidad LPRC</h3>
          <p>Miralo en vivo. Viví la pasión del rugby y arma tu equipo con los mejores nombres.</p>
          <div className="advert-images">
            <img
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=500&q=80"
              alt="Rugby stadium"
            />
            <img
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=500&q=80"
              alt="Rugby crowd"
            />
          </div>
        </div>
      </section>

      <section className="dashboard-builder">
        <div className="builder-intro">
          <h2>Armá tu equipo favorito</h2>
          <p>
            En Gran DT Rugby podés elegir tus 15 jugadores favoritos en cada posición.
            Si tus predicciones son correctas, entrás en el podio y recibís premios.
          </p>
        </div>

        <div className="builder-grid">
          <article className="builder-card">
            <h3>Forwards</h3>
            <p>Elegí tus pilares y segundas líneas con buena defensa y scrum.</p>
          </article>
          <article className="builder-card">
            <h3>Backs</h3>
            <p>Seleccioná abiertos y fullbacks capaces de sumar tries y asistencias.</p>
          </article>
          <article className="builder-card">
            <h3>Capitán</h3>
            <p>Designá el jugador con mayor impacto para ganar puntos extra cada fecha.</p>
          </article>
        </div>
      </section>

      <section className="dashboard-team-builder">
        <div className="builder-header">
          <div>
            <h2>Equipos favoritos</h2>
            <p>
              Seleccioná entre nuestros jugadores destacados y empezá a armar tu equipo de 15.
            </p>
          </div>
          <div className="builder-status">
            <span>Jugadores elegidos</span>
            <strong>{selectedPlayers.length} / 15</strong>
          </div>
        </div>

        <div className="player-grid">
          {players.map((player) => {
            const active = selectedPlayers.includes(player.id)
            return (
              <article
                key={player.id}
                className={`player-card ${active ? 'selected' : ''}`}
              >
                <img src={player.image} alt={player.name} />
                <div className="player-card-body">
                  <div>
                    <h3>{player.name}</h3>
                    <p>{player.position}</p>
                    <span>{player.team}</span>
                  </div>
                  <button
                    type="button"
                    className={active ? 'player-btn active' : 'player-btn'}
                    onClick={() => togglePlayer(player.id)}
                  >
                    {active ? 'Quitar' : 'Seleccionar'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="dashboard-details">
        <div className="details-grid">
          <article className="detail-card">
            <h2>Premios Gran DT</h2>
            <ul>
              <li>Torneo completo: kit exclusivo de rugby</li>
              <li>Fecha destacada: entradas para partido LPRC</li>
              <li>Mejor capitán: experiencia VIP</li>
            </ul>
          </article>
          <article className="detail-card">
            <h2>Cómo participar</h2>
            <ul>
              <li>Registrate y armá tu equipo.</li>
              <li>Seguí los resultados del torneo.</li>
              <li>Comparte tus picks y subí en el ranking.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="dashboard-sponsors">
        <h2>Publicidad oficial LPRC</h2>
        <div className="sponsor-grid">
          <div className="sponsor-card">
            <img
              src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=80"
              alt="Rugby ad"
            />
            <span>Jugá con los mejores</span>
          </div>
          <div className="sponsor-card">
            <img
              src="https://images.unsplash.com/photo-1503687364878-19b2ac9f5f46?auto=format&fit=crop&w=600&q=80"
              alt="Rugby banner"
            />
            <span>LPRC en cada match</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard