import { fetchWithAuth } from "../servis/fetchWithAuth";
import { create } from "zustand";
const{VITE_ENDPOINT_urlGetUsers: ENDPOINT_URL_GET_USERS} = import.meta.env;

export const useUserStore = create((set,get) => ({
    users: [],
    loading: false,
    error: null,

    fetchUsers: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetchWithAuth(ENDPOINT_URL_GET_USERS); 
            console.log("Respuesta del servidor:", response);
            set({ users: response, loading: false });
        } catch (error) {
            set({ error: error.message || "Error al cargar usuarios", loading: false });
        }
    },

    clearUsers: () => set({ users: [], error: null }),
}));

export default useUserStore;   
    
    