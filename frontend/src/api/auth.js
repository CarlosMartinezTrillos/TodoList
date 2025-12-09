import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

// Login: devuelve { user, token }
export const login = async (email, password) => {
  const res = await API.post("/auth/login", { email, password });
  return res.data;
};

// Registro: devuelve { user, token }
export const register = async (username, email, password) => {
  const res = await API.post("/auth/register", { username, email, password });
  return res.data;
};

// Obtener info del usuario logueado (JWT)
export const getMe = async (token) => {
  const res = await API.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
