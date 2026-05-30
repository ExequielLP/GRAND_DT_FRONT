import { create } from "zustand";
import { fetchWithAuth } from "../servis/fetchWithAuth";
const {
  VITE_ENDPOINT_urlGetPlayers: ENDPOINT_URL_GET_PLAYERS,
  VITE_ENDPOINT_urlPostPlayer: ENDPOINT_URL_POST_PLAYER,
} = import.meta.env;
export const usePlayersStore = create((set, get) => ({
    players: [],
    loading: false,
    error: null,
    fetched: false,

    fetchPlayers: async () => {
        if (get().loading) return;
        if (get().fetched) return; // evita pedirlos 20 veces

        set({ loading: true, error: null });

        try {
            const data = await fetchWithAuth(ENDPOINT_URL_GET_PLAYERS);
            set({
                players: data,
                loading: false,
                error: null,
                fetched: true,
            });
        } catch (error) {
            set({
                loading: false,
                error: error.message || "Error al cargar jugadores",
            });
        }
    },

    createPlayer: async (dto) => {
        const data = await fetchWithAuth(ENDPOINT_URL_POST_PLAYER, {
            method: 'POST',
            body: dto,
        });
        // agrega el nuevo jugador a la lista local sin refetch
        set((state) => ({ players: [...state.players, data] }));
        return data;
    },

    clearPlayers: () => set({ players: [], fetched: false, error: null }),

    getPlayerById: (id) => get().players.find((p) => p.id === id),
}));
export default usePlayersStore;