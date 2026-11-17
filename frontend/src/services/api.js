const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api";

async function postUserRequest(endpoint, payload) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}/users/${endpoint}`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    } catch {
        throw new Error("Cannot reach the server. Make sure the backend is running and try again.");
    }

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.message || data.error || `${endpoint === "register" ? "Registration" : "Login"} failed.`);
    }
    return data;
}

export const registerUser = (userData) => postUserRequest("register", userData);
export const loginUser = (loginData) => postUserRequest("login", loginData);
