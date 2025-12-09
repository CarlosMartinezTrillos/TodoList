import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import KanbanView from "./pages/KanbanView";
import ListView from "./pages/ListView";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";      
import Register from "./pages/Register"; 

import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user, loading } = useAuth(); // incluimos loading para esperar verificación de sesión

  if (loading) return <div>Cargando...</div>; // evita renderizar rutas antes de verificar

  return (
    <div className="app-root">
      <Navbar />
      <main className="container">
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Home />} />

          {/* Login y Registro */}
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

          {/* Rutas protegidas */}
          <Route path="/kanban" element={user ? <KanbanView /> : <Navigate to="/login" />} />
          <Route path="/list" element={user ? <ListView /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}
