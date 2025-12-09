import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import KanbanView from "./pages/KanbanView";
import ListView from "./pages/ListView";
import Dashboard from "./pages/Dashboard";
import "./styles/components.css";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<KanbanView />} />
          <Route path="/list" element={<ListView />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}
