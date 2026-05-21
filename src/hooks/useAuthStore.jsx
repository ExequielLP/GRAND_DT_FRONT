import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchLogin } from '../servis/fetchLogin';
const{
  VITE_ENDPOINT_urlPostRegister: urlPostRegister
} = import.meta.env;

const useAuthStore = create(
  persist(
    (set) => ({
      id: null,
      userName: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      rol: null,
      jwt: null,
      email: null,
      submittedTeam: null,

      login: async ({ email, password }) => {
        set({ loading: true, error: null });

        try {
          const data = await fetchLogin(email, password);

          set({
            id: data.id,
            userName: data.firstName,
            rol: data.rol?.replace(/[\[\]]/g, '').trim(),
            jwt: data.jwt,
            email: data.email,
            isAuthenticated: true,
            loading: false,
          });


          return true;
        } catch (err) {
          set({
            error: err.message,
            loading: false,
            isAuthenticated: false,
          });

          return false;
        }
      },
      register: async (formRegister ) => {
        console.log("Form Register:", formRegister);
        const response = await fetch(urlPostRegister, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formRegister)
        });
        return response.ok;
      }
      ,
      setSubmittedTeam: (team) => set({ submittedTeam: team }),

      logout: () => {
        set({
          id: null,
          userName: null,
          isAuthenticated: false,
          rol: null,
          jwt: null,
          email: null,
          error: null,
          submittedTeam: null,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        id: state.id,
        userName: state.userName,
        isAuthenticated: state.isAuthenticated,
        rol: state.rol,
        jwt: state.jwt,
        email: state.email,
        submittedTeam: state.submittedTeam,
      }),
    }
  )
);

export default useAuthStore;