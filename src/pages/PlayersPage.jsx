import React, { use, useEffect, useState } from "react";
import "./PlayersPage.css";
import usePlayersStore from "../hooks/usePlayerStroe";
import Titulares from "../component/Titulares";

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
  1: "PILAR",
  2: "HOOKER",
  3: "PILAR",
  4: "SEGUNDA_LINEA",
  5: "SEGUNDA_LINEA",
  6: "ALA",
  7: "ALA",
  8: "OCTAVO",
  9: "MEDIOSCRUM",
  10: "APERTURA",
  11: "WING",
  12: "CENTRO",
  13: "CENTRO",
  14: "WING",
  15: "FULLBACK",
};

const PlayersPage = () => {
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [selectedTeam, setSelectedTeam] = useState({});
  const fetchPlayers = usePlayersStore((state) => state.fetchPlayers);
  const playersList = usePlayersStore((state) => state.players);
  const loading = usePlayersStore((state) => state.loading);
  const error = usePlayersStore((state) => state.error);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  const selectedPlayers =
    selectedNumber === 0
      ? []
      : playersList.filter(
        (player) => player.position === positionByNumber[selectedNumber]
      );

  const handleSelectPlayerForTeam = (player) => {
    console.log("Jugador seleccionado para el equipo:", player);
    setSelectedTeam((prev) => ({
      ...prev,
      [selectedNumber]: player,
    }));
console.log("Jugador seleccionado para el equipo:", selectedTeam);

  }

  return (
    <section className="players-page">
      <div className="players-layout">
        <div className="field-card">
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

              {formation.map((player) => (
                <button
                  key={player.number}
                  type="button"
                  className={`player-marker ${selectedNumber === player.number ? "active" : ""
                    }`}
                  style={{ top: player.top, left: player.left }}
                  onClick={() => setSelectedNumber(player.number)}
                >
                  <div className="jersey">
                    <div className="jersey-collar" />
                    <span className="jersey-number">{player.number}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="players-sidebar">
          <div className="sidebar-card">
            <span className="sidebar-label">Posición seleccionada</span>
            <h3>PUESTO #{selectedNumber}</h3>

            {loading && <p>Cargando jugadores...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && (
              <div className="sidebar-list">
                {selectedPlayers.length > 0 ? (
                  selectedPlayers.map((player, index) => (
                    <div key={player.id} className="player-list-item">
                      <span className="player-index">{index + 1}</span>
                      <span className="player-name">
                        {player.firstName} {player.lastName}
                      </span>
                      <button
                        className="player-action"
                        onClick={() => {

                          handleSelectPlayerForTeam(player);
                        }}
                      >
                        Seleccionar
                      </button>
                    </div>
                  ))
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
      <Titulares selectedTeam={selectedTeam}
       // onRemovePlayer={handleRemoveSelectedPlayer} 
        />
    </section>
  );
};
export default PlayersPage;