import React, { createContext, useContext, useEffect, useReducer } from "react";
import * as api from "../api/tasks";
import { useAuth } from "./AuthContext";

const TasksStateContext = createContext();
const TasksDispatchContext = createContext();

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filter: { status: null, priority: null, category: null, q: "" },
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "SET_TASKS":
      return { ...state, loading: false, tasks: action.payload };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_FILTER":
      return { ...state, filter: { ...state.filter, ...action.payload } };
    default:
      return state;
  }
}

export function TasksProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth();

  // -------------------- Load tasks --------------------
const load = async (q = "") => {
  if (!user) return;
  dispatch({ type: "LOADING" });
  try {
    const token = localStorage.getItem("token");
    const data = await api.fetchTasks(q, token); // backend ya filtra tareas
    dispatch({ type: "SET_TASKS", payload: data }); // ✅ sin filtrar en frontend
  } catch (err) {
    dispatch({ type: "SET_ERROR", payload: err.message });
  }
};


  // -------------------- Create task --------------------
  const create = async (payload) => {
    if (!user) return;
    dispatch({ type: "LOADING" });
    try {
      const token = localStorage.getItem("token");
      await api.createTask(payload, token); // backend asigna user_id automáticamente
      await load(state.filter.q);
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  // -------------------- Edit task --------------------
  const edit = async (id, payload) => {
    if (!user) return;
    dispatch({ type: "LOADING" });
    try {
      const token = localStorage.getItem("token");
      await api.updateTask(id, payload, token);
      await load(state.filter.q);
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  // -------------------- Delete task --------------------
  const remove = async (id) => {
    if (!user) return;
    dispatch({ type: "LOADING" });
    try {
      const token = localStorage.getItem("token");
      await api.deleteTask(id, token);
      await load(state.filter.q);
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    }
  };

  // -------------------- Load tasks al montar --------------------
  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [user]);

  return (
    <TasksDispatchContext.Provider value={{ load, create, edit, remove, dispatch }}>
      <TasksStateContext.Provider value={state}>
        {children}
      </TasksStateContext.Provider>
    </TasksDispatchContext.Provider>
  );
}

// -------------------- Hooks --------------------
export function useTasksState() {
  return useContext(TasksStateContext);
}

export function useTasksActions() {
  return useContext(TasksDispatchContext);
}
