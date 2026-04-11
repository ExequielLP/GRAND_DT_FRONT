import useAuthStore from "../hooks/useAuthStore";
export const fetchWithAuth = async (url, options = {}) => {

    const jwt = useAuthStore.getState().jwt;
    const logout = useAuthStore.getState().logout;

    const response = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: jwt ? `Bearer ${jwt}` : '',
            ...options.headers,
        },
    });

    if (response.status === 401 || response.status === 403) {
        logout();
        throw new Error('Token inválido o sesión expirada');
    }

    return response;
}           