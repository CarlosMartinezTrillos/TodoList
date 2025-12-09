// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import * as api from "../api/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // útil para verificar sesión al iniciar

  // Verifica si hay token en localStorage al iniciar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.getMe(token)
        .then((data) => {
          setUser(data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login
  const login = async (email, password) => {
    const { user: loggedUser, token } = await api.login(email, password);
    setUser(loggedUser);
    localStorage.setItem("token", token);
  };

  // Registro
  const register = async (username, email, password) => {
    const { user: newUser, token } = await api.register(username, email, password);
    setUser(newUser);
    localStorage.setItem("token", token);
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto
export function useAuth() {
  return useContext(AuthContext);
}
