import "../component/css/Titulares.css";
const formationOrder = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
];

const labelByNumber = {
  1: "Pilar izquierdo",
  2: "Hooker",
  3: "Pilar derecho",
  4: "Segunda línea izquierda",
  5: "Segunda línea derecha",
  6: "Ala izquierda",
  7: "Ala derecha",
  8: "Octavo",
  9: "Medioscrum",
  10: "Apertura",
  11: "Wing izquierdo",
  12: "Centro interno",
  13: "Centro externo",
  14: "Wing derecho",
  15: "Fullback",
};

const Titulares = ({ selectedTeam, onRemovePlayer }) => {
  return (
    <div className="sidebar-card squad-card">
      <div className="squad-header">
        <span className="sidebar-label">Equipo armado</span>
        <h3>15 titulares</h3>
      </div>

      <div className="selected-squad-list">
        {formationOrder.map((number) => {
          const player = selectedTeam[number] || null;

          return (
            <div
              key={number}
              className={`selected-squad-item ${player ? "filled" : "empty"}`}
            >
              <div className="selected-squad-left">
                <span className="selected-squad-number">#{number}</span>

                <div className="selected-squad-info">
                  <span className="selected-squad-role">
                    {labelByNumber[ number+"" ]}
                  </span>

                  <span className="selected-squad-name">
                    {player 
                      ? ` : ${ player.firstName} ${player.lastName}`
                      : "  Sin seleccionar"}
                  </span>
                </div>
              </div>

              {player && (
                <button
                  type="button"
                  className="remove-player-btn"
                  onClick={() => onRemovePlayer(number)}
                >
                  Quitar
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Titulares;