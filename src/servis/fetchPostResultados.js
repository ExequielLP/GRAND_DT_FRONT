import { fetchWithAuth } from "./fetchWithAuth";

const { VITE_ENDPOINT_URL_GET_USERS: ENDPOINT_URL } = import.meta.env;

const fetchPostResultados = (players) => {
    return fetchWithAuth(ENDPOINT_URL, { method: "POST", body: players });
};

export default fetchPostResultados;
