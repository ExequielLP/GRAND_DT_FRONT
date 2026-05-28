import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./css/PlayersPage.css";
import usePlayersStore from "../hooks/usePlayerStroe";
import useAuthStore from "../hooks/useAuthStore";
import fetchSubmitTeam from "../servis/fetchSubmitTeam";
const formation = [
  { number: 1, top: "8%", left: "24%" },
  { number: 2, top: "8%", left: "50%" },
  { number: 3, top: "8%", left: "76%" },

  { number: 4, top: "20%", left: "37%" },
  { number: 5, top: "20%", left: "63%" },

  { number: 6, top: "32%", left: "22%" },
  { number: 8, top: "32%", left: "50%" },
  { number: 7, top: "32%", left: "78%" },

  { number: 9, top: "44%", left: "34%" },

  { number: 10, top: "56%", left: "50%" },

  { number: 13, top: "68%", left: "32%" },
  { number: 12, top: "68%", left: "68%" },

  { number: 11, top: "82%", left: "16%" },
  { number: 15, top: "80%", left: "50%" },
  { number: 14, top: "82%", left: "84%" },
];

const positionByNumber = {
  1: "PRIMERA_LINEA",
  2: "PRIMERA_LINEA",
  3: "PRIMERA_LINEA",
  4: "SEGUNDA_LINEA",
  5: "SEGUNDA_LINEA",
  6: "TERCERA_LINEA",
  7: "TERCERA_LINEA",
  8: "TERCERA_LINEA",
  9: "MEDIOSCRUM",
  10: "APERTURA",
  11: "WING",
  12: "CENTRO",
  13: "CENTRO",
  14: "WING",
  15: "FULLBACK",
};

const PLAYERS_PER_PAGE = 5;

const PlayersPage = () => {
  const navigate = useNavigate();
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [pendingPlayer, setPendingPlayer] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [search, setSearch] = useState("");
  const sidebarRef = useRef(null);
  const fieldRef   = useRef(null);
  const fetchPlayers = usePlayersStore((state) => state.fetchPlayers);
  const playersList = usePlayersStore((state) => state.players);
  const loading = usePlayersStore((state) => state.loading);
  const error = usePlayersStore((state) => state.error);
  const setSubmittedTeam = useAuthStore((state) => state.setSubmittedTeam);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const selectedPlayers = search.trim()
    ? playersList.filter((p) =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase())
      )
    : selectedNumber === 0
      ? []
      : playersList.filter(
          (player) => player.position === positionByNumber[selectedNumber]
        );

  const totalPages = Math.ceil(selectedPlayers.length / PLAYERS_PER_PAGE);
  const pagedPlayers = selectedPlayers.slice(
    currentPage * PLAYERS_PER_PAGE,
    (currentPage + 1) * PLAYERS_PER_PAGE
  );

  const handleSelectNumber = (number) => {
    setSelectedNumber(number);
    setCurrentPage(0);
    setSearch("");
    setTimeout(() => {
      sidebarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleSelectPlayerForTeam = (player) => {
    setSelectedTeam((prev) => ({
      ...prev,
      [selectedNumber]: player,
    }));
    setTimeout(() => {
      fieldRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const isIassi = (p) => p?.firstName === 'Isidro' && p?.lastName === 'Iassi';

  const cancelPending = () => {
    setPendingPlayer(null);
    setShowWarning(false);
  };

  const confirmPlayer = () => {
    if (isIassi(pendingPlayer) && !showWarning) {
      setShowWarning(true);
      return;
    }
    handleSelectPlayerForTeam(pendingPlayer);
    cancelPending();
  };

  const allPositionsFilled = formation.every((pos) => selectedTeam[pos.number]);
  const noRepeatedPlayers =
    new Set(Object.values(selectedTeam).map((p) => p.id)).size ===
    Object.keys(selectedTeam).length;
  const canSubmit = allPositionsFilled && noRepeatedPlayers;

  const handleSubmitTeam = async (event) => {
    event.preventDefault();
    try {
      await fetchSubmitTeam(selectedTeam);
      setSubmittedTeam(selectedTeam);
      setSubmitted(true);
      setTimeout(() => navigate("/dashboard", { replace: true }), 3000);
    } catch {
      // fetchWithAuth ya maneja errores
    }
  };

  if (submitted) {
    return (
      <section className="players-page players-page--center">
        <div className="submit-success-card">
          <span className="submit-success-icon">🏉</span>
          <h2>¡Gracias por participar del Gran DT LPRC!</h2>
          <p>Tu equipo fue enviado correctamente. Redirigiendo al dashboard…</p>
          <div className="submit-success-bar">
            <div className="submit-success-bar-fill" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="players-page">
      <div className="players-layout">
        <div className="field-card" ref={fieldRef}>
          <div className="field-header">
            <div>
              <span className="field-badge">XV Inicial</span>
              <h2>Formación titular</h2>
              <p>Seleccioná una posición para ver los jugadores disponibles</p>
            </div>
          </div>

          <div className="rugby-field">
            <div className="field-surface">
              <div className="field-lines">
                <div className="goal-line top" />
                <div className="line line-1" />
                <div className="line line-2" />
                <div className="mid-line" />
                <div className="line line-3" />
                <div className="line line-4" />
                <div className="goal-line bottom" />

                <div className="try-area top-area" />
                <div className="try-area bottom-area" />
              </div>

              {formation.map((pos) => (
                <button
                  key={pos.number}
                  type="button"
                  className={`player-marker ${selectedNumber === pos.number ? "active" : ""}`}
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => handleSelectNumber(pos.number)}
                >
                  <div className="jersey">
                    <img src="/camisetalprc_nobg.png" className="jersey-img" alt="" />
                    <span className="jersey-number">{pos.number}</span>
                  </div>
                  {selectedTeam[pos.number] && (
                    <span className="player-name-on-field">
                      {selectedTeam[pos.number].lastName}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="submit-team-wrapper">
            <button
              className={`submit-team-btn ${canSubmit ? "submit-team-btn--active" : ""}`}
              disabled={!canSubmit}
              onClick={handleSubmitTeam}
            >
              <span className="submit-team-icon">▶</span>
              ENVIAR EQUIPO COMPLETO
            </button>
            {!allPositionsFilled && (
              <p className="submit-team-hint">
                {15 - Object.keys(selectedTeam).length} posición/es sin cubrir
              </p>
            )}
            {allPositionsFilled && !noRepeatedPlayers && (
              <p className="submit-team-hint submit-team-hint--warn">
                Hay jugadores repetidos en el equipo
              </p>
            )}
          </div>
        </div>

        <aside className="players-sidebar" ref={sidebarRef}>
          <div className="sidebar-card">
            <span className="sidebar-label">Posición seleccionada</span>
            <h3>PUESTO #{selectedNumber}</h3>

            <input
              className="sidebar-search"
              type="text"
              placeholder="Buscar jugador por nombre…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(0); }}
            />

            {loading && <p>Cargando jugadores...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && (
              <div className="sidebar-list">
                {selectedPlayers.length > 0 ? (
                  <>
                    {pagedPlayers.map((player, index) => (
                      <div key={player.id} className="player-list-item">
                        <span className="player-index">
                          {currentPage * PLAYERS_PER_PAGE + index + 1}
                        </span>
                        <span className="player-name">
                          {player.firstName} {player.lastName}
                        </span>
                        <button
                          className="player-action"
                          onClick={() => {
                            if (player.firstName === 'Isidro' && player.lastName === 'Iassi') {
                              setPendingPlayer(player);
                            } else {
                              handleSelectPlayerForTeam(player);
                            }
                          }}
                        >
                          Seleccionar
                        </button>
                      </div>
                    ))}

                    {totalPages > 1 && (
                      <div className="pagination">
                        <button
                          className="pagination-btn"
                          disabled={currentPage === 0}
                          onClick={() => setCurrentPage((p) => p - 1)}
                        >
                          ‹
                        </button>
                        <span className="pagination-info">
                          {currentPage + 1} / {totalPages}
                        </span>
                        <button
                          className="pagination-btn"
                          disabled={currentPage === totalPages - 1}
                          onClick={() => setCurrentPage((p) => p + 1)}
                        >
                          ›
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="player-list-item">
                    <span className="player-name">
                      {selectedNumber === 0
                        ? "Seleccioná una posición"
                        : "No hay jugadores para este puesto"}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
      {pendingPlayer && (
        <div className="confirm-overlay" onClick={cancelPending}>
          <div className="confirm-card" onClick={(e) => e.stopPropagation()}>
            {showWarning ? (
              <>
                <p className="confirm-question">
                  ⚠️ <strong>¡Mirá que es malísimo!</strong>
                  <br />¿Seguís queriendo ponerlo?
                </p>
                <div className="confirm-actions">
                  <button className="confirm-btn confirm-btn--yes" onClick={confirmPlayer}>
                    Sí
                  </button>
                  <button className="confirm-btn confirm-btn--no" onClick={cancelPending}>
                    No
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="confirm-question">
                  ¿Está seleccionando a{' '}
                  <strong>{pendingPlayer.firstName} {pendingPlayer.lastName}</strong>?
                </p>
                <div className="confirm-actions">
                  <button className="confirm-btn confirm-btn--yes" onClick={confirmPlayer}>
                    Sí
                  </button>
                  <button className="confirm-btn confirm-btn--no" onClick={cancelPending}>
                    No
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
     
  );
};
export default PlayersPage;