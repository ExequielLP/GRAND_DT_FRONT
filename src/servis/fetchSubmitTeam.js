import { fetchWithAuth } from "./fetchWithAuth";
import useAuthStore from "../hooks/useAuthStore";

const { VITE_ENDPOINT_urlPostTeam: ENDPOINT_URL_SUBMIT_TEAM } = import.meta.env;

const fetchSubmitTeam = (teamData) => {
    const { id } = useAuthStore.getState();
    const players = Object.values(teamData);
    return fetchWithAuth(`${ENDPOINT_URL_SUBMIT_TEAM}/${id}`, { method: "POST", body: players });
};

export default fetchSubmitTeam;