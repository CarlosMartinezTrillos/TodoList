import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import styles from "../css/TaskCard.module.css"; // CSS Module

export default function TaskCard({ task, onEdit, onDelete }) {
  // Evitar undefined si la prioridad o status no existe
  const colorPrioridad = {
    high: styles.alta,
    medium: styles.media,
    low: styles.baja,
  }[task.priority || "medium"] || "";

  const estadoClase = {
    pending: styles.pending,
    in_progress: styles.in_progress,
    completed: styles.completed,
    cancelled: styles.cancelled,
  }[task.status || "pending"] || "";

  return (
    <div className={`${styles.taskCard} ${estadoClase}`}>
      <div className={styles.header}>
        <h4 className={styles.titulo}>{task.title}</h4>
        <span className={`${styles.chip} ${colorPrioridad}`}>
          {task.priority ?? "media"}
        </span>
      </div>
      <p className={styles.descripcion}>{task.description || "Sin descripción"}</p>
      <div className={styles.meta}>
        <small>Categoría: {task.category}</small>
        <small>Vence: {task.due_date ?? "—"}</small>
      </div>
      <div className={styles.acciones}>
        <button
          onClick={() => onEdit(task)}
          className={`${styles.btn} ${styles.editar}`}
        >
          <FiEdit /> Editar
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className={`${styles.btn} ${styles.eliminar}`}
        >
          <FiTrash2 /> Eliminar
        </button>
      </div>
    </div>
  );
}
