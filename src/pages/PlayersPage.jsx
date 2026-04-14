import React, { useState } from "react";
import "./PlayersPage.css";
import { fetchForPosition } from "../servis/fetchForPosition";
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

const mockPlayersByNumber = {
  1: [],
  2: ["Hooker 1", "Hooker 2"],
  3: ["Pilar derecho 1", "Pilar derecho 2"],
  4: ["Segunda línea 1", "Segunda línea 2"],
  5: ["Segunda línea 3", "Segunda línea 4"],
  6: ["Ala izquierdo 1", "Ala izquierdo 2"],
  7: ["Ala derecho 1", "Ala derecho 2"],
  8: ["Octavo 1", "Octavo 2"],
  9: ["Medio scrum 1", "Medio scrum 2"],
  10: ["Apertura 1", "Apertura 2"],
  11: ["Wing izquierdo 1", "Wing izquierdo 2"],
  12: ["Centro interior 1", "Centro interior 2"],
  13: ["Centro exterior 1", "Centro exterior 2"],
  14: ["Wing derecho 1", "Wing derecho 2"],
  15: ["Fullback 1", "Fullback 2"],
};

const PlayersPage = () => {
  const [selectedNumber, setSelectedNumber] = useState(0);

  const selectedPlayers = mockPlayersByNumber[selectedNumber] || [];

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
                  const lista=fetchForPosition(player.number)
                  console.log(lista)
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