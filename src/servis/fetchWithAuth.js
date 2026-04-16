import useAuthStore from "../hooks/useAuthStore";
export const fetchWithAuth = async (url, options = {}) => {
     const { jwt, logout } = useAuthStore.getState();

 
    const {
        method = "GET",
        body,
        headers = {},
        params // 👉 para query params opcionales
    } = options;

    // 👉 construir query params si vienen
    let finalUrl = url;
    if (params) {
        const query = new URLSearchParams(params).toString();
        finalUrl += `?${query}`;
    }

    const config = {
        method,
        headers: {
            ...(jwt && { Authorization: `Bearer ${jwt}` }),
            ...headers,
        },
    };

    // 👉 solo agrega Content-Type y body si corresponde
    if (body && method !== "GET" && method !== "DELETE") {
        config.headers["Content-Type"] = "application/json";
        config.body = typeof body === "string" ? body : JSON.stringify(body);
    }

    console.log("REQUEST:", {
        url: finalUrl,
        method,
        headers: config.headers,
        body: config.body,
    });
    const response = await fetch(finalUrl, config);
console.log("RESPONSE:",    response)

    // 🔐 errores comunes
    if (response.status === 401) {
        logout();
        throw new Error("Sesión expirada o token inválido");
    }

    if (response.status === 403) {
        throw new Error("No autorizado");
    }

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Error en la request");
    }

    // 👉 sin contenido
    if (response.status === 204) {
        return null;
    }

    // 👉 intenta parsear JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return await response.json();
    }

    return await response.text();
   
}           