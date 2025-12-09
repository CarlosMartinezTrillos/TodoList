import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { TasksProvider } from "./context/TasksContext";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>            {/* 🔹 Agregado */}
        <TasksProvider>
          <div className="page">
            <App />
          </div>
        </TasksProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
