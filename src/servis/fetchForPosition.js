import { fetchWithAuth } from "./fetchWithAuth";

export  async function fetchForPosition(number) {
    const position = positionNumberToName(number);
    console.log(position)
    const data = await fetchWithAuth(`http://localhost:8080/players/jugadores/${position}`)
    return data;
}

function positionNumberToName(number) {
    const positionNumber = ""
    switch (number) {
        case 1:
            return "PILAR";
        case 2:
            return "HOOKER";
        case 3:
            return "PILAR";
        case 4:
            return "SEGUNDA_LINEA";
        case 5:
            return "SEGUNDA_LINEA";
        case 6:
            return "ALA";
        case 7:
            return "ALA";
        case 8:
            return "OCTAVO";
        case 9:
            return "MEDIOSCRUM";
        case 10:
            return "APERTURA";
        case 11:
            return "WING";
        case 12:
            return "WING";
        case 13:
            return "CENTRO";
        case 14:
            return "WING";
        case 15:
            return "FULLBACK";
        default:
            throw new Error('Posición desconocida');
    }

}

export default fetchForPosition;