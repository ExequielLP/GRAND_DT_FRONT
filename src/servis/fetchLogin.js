import useAuthStore from '../hooks/useAuthStore';   
const{
  VITE_ENDPOINT_urlPostLogin: urlPostLogin
} = import.meta.env;
export  const fetchLogin = async (email, password) => {
    const logout = useAuthStore.getState().logout;
  try {
    const response = await fetch(urlPostLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) { logout(); }   
      throw new Error("Error en la autenticación");
    }

    const data = await response.json();
    return data // Suponiendo que el backend devuelve un token
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};