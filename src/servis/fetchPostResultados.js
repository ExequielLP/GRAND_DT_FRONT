import { fetchWithAuth } from "./fetchWithAuth";

const { VITE_ENDPOINT_urlPostResultados: ENDPOINT_URL } = import.meta.env;

const fetchPostResultados = (players) => {
    return fetchWithAuth(ENDPOINT_URL, { method: "POST", body: players });
};

export default fetchPostResultados;
