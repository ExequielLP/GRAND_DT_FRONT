import { useEffect, useState } from 'react'
import usePlayersStore from '../hooks/usePlayerStroe'
import fetchPostResultados from '../servis/fetchPostResultados'
import './css/Resultados.css'

const DIVISIONS = ['Primera', 'Intermedia', 'Pre A', 'Pre B', 'Pre C', 'M-22']

const formation = [
  { number: 1,  label: 'Pilar izquierdo' },
  { number: 2,  label: 'Hooker'          },
  { number: 3,  label: 'Pilar derecho'   },
  { number: 4,  label: 'Lock'            },
  { number: 5,  label: 'Lock'            },
  { number: 6,  label: 'Ala'             },
  { number: 7,  label: 'Ala'             },
  { number: 8,  label: 'Octavo'          },
  { number: 9,  label: 'Medio Scrum'     },
  { number: 10, label: 'Apertura'        },
  { number: 11, label: 'Wing'            },
  { number: 12, label: 'Centro'          },
  { number: 13, label: 'Centro'          },
  { number: 14, label: 'Wing'            },
  { number: 15, label: 'Fullback'        },
]

const positionByNumber = {
  1: 'PRIMERA_LINEA', 2: 'PRIMERA_LINEA', 3: 'PRIMERA_LINEA',
  4: 'SEGUNDA_LINEA', 5: 'SEGUNDA_LINEA',
  6: 'TERCERA_LINEA', 7: 'TERCERA_LINEA', 8: 'TERCERA_LINEA',
  9: 'MEDIOSCRUM', 10: 'APERTURA',
  11: 'WING', 12: 'CENTRO', 13: 'CENTRO', 14: 'WING', 15: 'FULLBACK',
}

const SCORING_EVENTS = [
  { key: 'victoria',     label: 'Victoria del equipo', pts:  1, type: 'bool',    mod: 'pos', max: null },
  { key: 'tries',        label: 'Try',                 pts:  5, type: 'counter', mod: 'pos', max: null },
  { key: 'conversiones', label: 'Conversión',          pts:  2, type: 'counter', mod: 'pos', max: null },
  { key: 'penales',      label: 'Penal',               pts:  3, type: 'counter', mod: 'pos', max: null },
  { key: 'amarilla',     label: 'Tarjeta Amarilla',    pts: -3, type: 'counter', mod: 'neg', max: 2    },
  { key: 'roja',         label: 'Tarjeta Roja',        pts: -6, type: 'bool',    mod: 'neg', max: null },
  { key: 'debut',        label: 'Debut en Primera',    pts: 20, type: 'bool',    mod: 'pos', max: null },
]

const DEFAULT_SCORE = { victoria: false, tries: 0, conversiones: 0, penales: 0, amarilla: 0, roja: false, debut: false, capitan: false }

const calcPoints = (s) => {
  if (!s) return 0
  const base = 2 // titularidad
    + (s.victoria ? 1 : 0)
    + s.tries * 5
    + s.conversiones * 2
    + s.penales * 3
    + s.amarilla * -3
    + (s.roja ? -6 : 0)
    + (s.debut ? 20 : 0)
  return s.capitan ? base * 2 : base
}

const PLAYERS_PER_PAGE = 6

const Resultados = () => {
  const fetchPlayers = usePlayersStore((state) => state.fetchPlayers)
  const players     = usePlayersStore((state) => state.players)
  const loading     = usePlayersStore((state) => state.loading)

  const [division,     setDivision]     = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [allTeams,     setAllTeams]     = useState({})
  const [allScores,    setAllScores]    = useState({})
  const [page,          setPage]          = useState(0)
  const [search,        setSearch]        = useState('')
  const [scoringSlot,   setScoringSlot]   = useState(null)
  const [dupWarning,    setDupWarning]    = useState('')

  useEffect(() => { fetchPlayers() }, [fetchPlayers])

  const team   = division ? (allTeams[division]  ?? {}) : {}
  const scores = division ? (allScores[division] ?? {}) : {}

  const setTeam = (updater) =>
    setAllTeams(prev => ({ ...prev, [division]: updater(prev[division] ?? {}) }))

  const setScores = (updater) =>
    setAllScores(prev => ({ ...prev, [division]: updater(prev[division] ?? {}) }))

  const usedElsewhere = new Set(
    DIVISIONS
      .filter(div => div !== division)
      .flatMap(div => Object.values(allTeams[div] ?? {}).map(p => p.id))
  )

  const eligible = search.trim()
    ? players.filter(p => !usedElsewhere.has(p.id) && `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase()))
    : selectedSlot
      ? players.filter(p => !usedElsewhere.has(p.id) && p.position === positionByNumber[selectedSlot])
      : []

  const totalPages = Math.ceil(eligible.length / PLAYERS_PER_PAGE)
  const paged      = eligible.slice(page * PLAYERS_PER_PAGE, (page + 1) * PLAYERS_PER_PAGE)

  const selectSlot = (num) => {
    setSelectedSlot(num)
    setScoringSlot(null)
    setSearch('')
    setPage(0)
  }

  const isPlayerUsedElsewhere = (playerId) =>
    DIVISIONS.some(div =>
      div !== division &&
      Object.values(allTeams[div] ?? {}).some(p => p.id === playerId)
    )

  const selectPlayer = (player) => {
    if (isPlayerUsedElsewhere(player.id)) {
      const usedIn = DIVISIONS.find(div =>
        div !== division &&
        Object.values(allTeams[div] ?? {}).some(p => p.id === player.id)
      )
      setDupWarning(`${player.firstName} ${player.lastName} ya está en ${usedIn}`)
      setTimeout(() => setDupWarning(''), 3000)
      return
    }

    const usedInSameTeam = Object.entries(team).some(
      ([slot, p]) => p.id === player.id && Number(slot) !== selectedSlot
    )
    if (usedInSameTeam) {
      setDupWarning(`${player.firstName} ${player.lastName} ya está en este equipo`)
      setTimeout(() => setDupWarning(''), 3000)
      return
    }

    setDupWarning('')
    setTeam(prev => ({ ...prev, [selectedSlot]: player }))
    setScores(prev => ({ ...prev, [selectedSlot]: { ...(prev[selectedSlot] ?? DEFAULT_SCORE) } }))
  }

  const buildPayload = () => {
    const result = []
    DIVISIONS.forEach(div => {
      const t = allTeams[div]  ?? {}
      const s = allScores[div] ?? {}
      Object.entries(t).forEach(([slot, player]) => {
        result.push({
          id:        player.id,
          firstName: player.firstName,
          lastName:  player.lastName,
          position:  player.position,
          puntaje:   calcPoints(s[slot] ?? DEFAULT_SCORE),
        })
      })
    })
    return result
  }

  const openScoring = (num) => {
    setScoringSlot(num)
    setSelectedSlot(num)
  }

  const closeScoring = () => setScoringSlot(null)

  const toggleBool = (slot, key) => {
    setScores(prev => ({
      ...prev,
      [slot]: { ...prev[slot], [key]: !prev[slot][key] }
    }))
  }

  const changeCounter = (slot, key, delta) => {
    const event = SCORING_EVENTS.find(e => e.key === key)
    setScores(prev => {
      const current = prev[slot]?.[key] ?? 0
      const next    = Math.max(0, current + delta)
      const capped  = event?.max != null ? Math.min(next, event.max) : next
      return { ...prev, [slot]: { ...prev[slot], [key]: capped } }
    })
  }

  const toggleCapitan = (slot) => {
    setScores(prev => {
      const isCap  = prev[slot]?.capitan
      const updated = {}
      Object.keys(prev).forEach(k => { updated[k] = { ...prev[k], capitan: false } })
      updated[slot] = { ...updated[slot], capitan: !isCap }
      return updated
    })
  }

  const changeDivision = (div) => {
    setDivision(div)
    setSelectedSlot(null)
    setScoringSlot(null)
    setSearch('')
    setPage(0)
  }

  const filled = Object.keys(team).length

  const allComplete = DIVISIONS.every(div => Object.keys(allTeams[div] ?? {}).length === 15)

  const handleSubmitAll = async () => {
    await fetchPostResultados(buildPayload())
  }

  return (
    <div className="res-page">
      <div className="res-container">

        <div className="res-header">
          <div>
            <span className="res-badge">PANEL ADMINISTRADOR</span>
            <h1>Carga de equipos</h1>
            <p>Seleccioná una división, completá los 15 puestos y sumá los puntos</p>
          </div>
          {division && (
            <div className="res-progress">
              <span className="res-progress-label">{filled} / 15</span>
              <div className="res-progress-bar">
                <div className="res-progress-fill" style={{ width: `${(filled / 15) * 100}%` }} />
              </div>
            </div>
          )}
        </div>

        <div className="res-divisions">
          {DIVISIONS.map(div => {
            const divFilled = Object.keys(allTeams[div] ?? {}).length
            return (
              <button
                key={div}
                className={`res-div-btn ${division === div ? 'active' : ''} ${divFilled > 0 && division !== div ? 'has-data' : ''}`}
                onClick={() => changeDivision(div)}
              >
                {div}
                {divFilled > 0 && <span className="res-div-count">{divFilled}/15</span>}
              </button>
            )
          })}
        </div>

        {!division && (
          <div className="res-empty-state">
            <span>Seleccioná una división para comenzar</span>
          </div>
        )}

        {division && (
          <div className="res-layout">

            {/* SLOTS */}
            <div className="res-slots">
              <div className="res-slots-head">
                <span className="res-slots-title">{division}</span>
                <span className="res-slots-count">{filled} / 15 jugadores</span>
              </div>
              <div className="res-slots-list">
                {formation.map(pos => {
                  const player = team[pos.number]
                  const pts    = player ? calcPoints(scores[pos.number]) : null
                  return (
                    <div
                      key={pos.number}
                      className={`res-slot ${selectedSlot === pos.number ? 'active' : ''} ${player ? 'filled' : ''}`}
                    >
                      <button className="res-slot-main" onClick={() => selectSlot(pos.number)}>
                        <span className="res-slot-num">{pos.number}</span>
                        <div className="res-slot-info">
                          <span className="res-slot-label">{pos.label}</span>
                          {player && (
                            <span className="res-slot-player">
                              {player.firstName} {player.lastName}
                            </span>
                          )}
                        </div>
                        {player ? (
                          <span className="res-slot-pts">
                            {scores[pos.number]?.capitan && <span className="res-cap-icon">⚑ </span>}
                            {pts} pts
                          </span>
                        ) : (
                          <span className="res-slot-status">·</span>
                        )}
                      </button>
                      {player && (
                        <button
                          className={`res-puntuar-btn ${scoringSlot === pos.number ? 'active' : ''}`}
                          onClick={() => scoringSlot === pos.number ? closeScoring() : openScoring(pos.number)}
                        >
                          {scoringSlot === pos.number ? 'Cerrar' : 'Puntuar'}
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="res-picker">
              {scoringSlot ? (
                <>
                  <div className="res-picker-head">
                    <div className="res-picker-head-top">
                      <h3>Puntuando — {team[scoringSlot]?.firstName} {team[scoringSlot]?.lastName}</h3>
                      <span className="res-picker-pts-badge">{calcPoints(scores[scoringSlot])} pts</span>
                    </div>
                  </div>

                  <div className="res-scoring-body">
                    <div className={`res-scoring-row res-scoring-capitan ${scores[scoringSlot]?.capitan ? 'active' : ''}`}>
                      <span className="res-scoring-label">⚑ Capitán</span>
                      <span className="res-scoring-pts pos">× 2 total</span>
                      <button
                        className={`res-toggle ${scores[scoringSlot]?.capitan ? 'on pos' : ''}`}
                        onClick={() => toggleCapitan(scoringSlot)}
                      >
                        {scores[scoringSlot]?.capitan ? 'Es capitán' : 'Designar'}
                      </button>
                    </div>

                    <div className="res-scoring-row res-scoring-auto">
                      <span className="res-scoring-label">Titularidad</span>
                      <span className="res-scoring-pts pos">+2 pts</span>
                      <span className="res-scoring-applied">✓ Aplicado</span>
                    </div>

                    {SCORING_EVENTS.map(item => (
                      <div key={item.key} className="res-scoring-row">
                        <span className="res-scoring-label">{item.label}</span>
                        <span className={`res-scoring-pts ${item.mod}`}>
                          {item.pts > 0 ? '+' : ''}{item.pts} pts
                        </span>
                        {item.type === 'bool' ? (
                          <button
                            className={`res-toggle ${scores[scoringSlot]?.[item.key] ? 'on' : ''} ${item.mod}`}
                            onClick={() => toggleBool(scoringSlot, item.key)}
                          >
                            {scores[scoringSlot]?.[item.key] ? 'Quitar' : 'Agregar'}
                          </button>
                        ) : (
                          <div className="res-counter">
                            <button onClick={() => changeCounter(scoringSlot, item.key, -1)}>−</button>
                            <span>{scores[scoringSlot]?.[item.key] ?? 0}</span>
                            <button onClick={() => changeCounter(scoringSlot, item.key, 1)}>+</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {!selectedSlot ? (
                    <div className="res-picker-idle">
                      <span>← Seleccioná un puesto</span>
                    </div>
                  ) : (
                    <>
                      <div className="res-picker-head">
                        <div className="res-picker-head-top">
                          <h3>#{selectedSlot} — {formation[selectedSlot - 1].label}</h3>
                          {team[selectedSlot] && (
                            <span className="res-picker-current">
                              {team[selectedSlot].firstName} {team[selectedSlot].lastName}
                            </span>
                          )}
                        </div>
                        {dupWarning && (
                          <span className="res-dup-warning">{dupWarning}</span>
                        )}
                        <input
                          className="res-search"
                          type="text"
                          placeholder="Buscar por nombre…"
                          value={search}
                          onChange={e => { setSearch(e.target.value); setPage(0) }}
                        />
                      </div>

                      {loading ? (
                        <p className="res-picker-loading">Cargando jugadores…</p>
                      ) : paged.length === 0 ? (
                        <p className="res-picker-loading">No hay jugadores para este puesto</p>
                      ) : (
                        <div className="res-picker-list">
                          {paged.map(player => (
                            <button
                              key={player.id}
                              className={`res-picker-item ${team[selectedSlot]?.id === player.id ? 'selected' : ''}`}
                              onClick={() => selectPlayer(player)}
                            >
                              <span className="res-picker-name">
                                {player.firstName} {player.lastName}
                              </span>
                              {team[selectedSlot]?.id === player.id && (
                                <span className="res-picker-check">✓</span>
                              )}
                            </button>
                          ))}

                          {totalPages > 1 && (
                            <div className="res-pagination">
                              <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>‹</button>
                              <span>{page + 1} / {totalPages}</span>
                              <button disabled={page === totalPages - 1} onClick={() => setPage(p => p + 1)}>›</button>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

          </div>
        )}

        <div className="res-submit-wrapper">
          <button
            className={`res-submit-btn ${allComplete ? 'active' : ''}`}
            disabled={!allComplete}
            onClick={handleSubmitAll}
          >
            Enviar todos los resultados
          </button>
          {!allComplete && (
            <p className="res-submit-hint">
              {DIVISIONS.filter(div => Object.keys(allTeams[div] ?? {}).length < 15).map(div => {
                const missing = 15 - Object.keys(allTeams[div] ?? {}).length
                return `${div}: faltan ${missing}`
              }).join(' · ')}
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default Resultados
