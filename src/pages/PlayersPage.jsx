import React, { use, useEffect, useState } from "react";
import "./PlayersPage.css";
import usePlayersStore from "../hooks/usePlayerStroe";

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



const PlayersPage = () => {
  const [selectedNumber, setSelectedNumber] = useState(0);
 const listAllPlayers = usePlayersStore((state) => state.fetchPlayers);

const playersList = usePlayersStore((state) => state.players);
 
 const mockPlayersByNumber = {
  1: playersList.map(p => p.position === "PILAR" ? p.firstName : null).filter(Boolean)[0] || "Pilar 1",
  2: playersList.map(p => p.position === "HOOKER" ? p.firstName : null).filter(Boolean)[0] || "Hooker",
  3: playersList.map(p => p.position === "PILAR" ? p.firstName : null).filter(Boolean)[1] || "Pilar 2",
  4: playersList.map(p => p.position === "SEGUNDA_LINEA" ? p.firstName : null).filter(Boolean)[0] || "2da línea 1",
  5: playersList.map(p => p.position === "SEGUNDA_LINEA" ? p.firstName : null).filter(Boolean)[1] || "2da línea 2",
  6: playersList.map(p => p.position === "ALA" ? p.firstName : null).filter(Boolean)[0] || "Ala 1",
  7: playersList.map(p => p.position === "ALA" ? p.firstName : null).filter(Boolean)[1] || "Ala 2",
  8: playersList.map(p => p.position === "OCTAVO" ? p.firstName : null).filter(Boolean)[0] || "Octavo",
  9: playersList.map(p => p.position === "MEDIOSCRUM" ? p.firstName : null).filter(Boolean)[0] || "Medio scrum",
  10: playersList.map(p => p.position === "APERTURA" ? p.firstName : null).filter(Boolean)[0] || "Apertura",
  11: playersList.map(p => p.position === "WING" ? p.firstName : null).filter(Boolean)[0] || "Wing 1",
  12: playersList.map(p => p.position === "CENTRO" ? p.firstName : null).filter(Boolean)[0] || "Centro 1",
  13: playersList.map(p => p.position === "CENTRO" ? p.firstName : null).filter(Boolean)[1] || "Centro 2",
  14: playersList.map(p => p.position === "WING" ? p.firstName : null).filter(Boolean)[1] || "Wing 2",
  15: playersList.map(p => p.position === "FULLBACK" ? p.firstName : null).filter(Boolean)[0] || "Fullback",
};
 const selectedPlayers = mockPlayersByNumber[selectedNumber] || [];
  useEffect(() => {
   listAllPlayers()
  }, []);

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
                  className={`player-marker ${
                    selectedNumber === player.number ? "active" : ""
                  }`}
                  style={{ top: player.top, left: player.left }}
                  onClick={() =>{ 
                    setSelectedNumber(player.number)
                  
                 
                }
                }
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

            <div className="sidebar-list">
              {selectedPlayers.map((name, index) => (
                <div key={index} className="player-list-item">
                  <span className="player-index">{index + 1}</span>
                  <span className="player-name">{name}</span>
                  <button className="player-action">
                    Seleccionar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default PlayersPage;