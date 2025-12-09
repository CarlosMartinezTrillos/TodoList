import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

// -------------------- Fetch tasks --------------------
export const fetchTasks = async (q = "", token) => {
  const url = q ? `/tasks/search/${encodeURIComponent(q)}` : "/tasks/";
  const res = await API.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; // backend devuelve solo tareas del usuario logueado
};

// -------------------- Create task --------------------
export const createTask = async (payload, token) => {
  const res = await API.post("/tasks/", payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// -------------------- Update task --------------------
export const updateTask = async (id, payload, token) => {
  const res = await API.put(`/tasks/${id}`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// -------------------- Delete task --------------------
export const deleteTask = async (id, token) => {
  const res = await API.delete(`/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
