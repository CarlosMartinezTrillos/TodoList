import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app.jsx";
import { TasksProvider } from "./context/TasksContext";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <TasksProvider>
        <App />
      </TasksProvider>
    </BrowserRouter>
  </React.StrictMode>
);
