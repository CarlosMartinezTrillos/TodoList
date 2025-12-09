import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import styles from "../css/KanbanColumn.module.css"; // CSS Module

export default function KanbanColumn({ columnId, tasks, onEdit, onDelete }) {
  // Color de fondo según columna (columnId)
  const columnaColor = {
    pending: styles.pendiente,
    in_progress: styles.enProgreso,
    completed: styles.completada,
    cancelled: styles.cancelada,
  }[columnId] || "";

  // Títulos legibles para cada columna
  const tituloColumna = {
    pending: "Pendiente",
    in_progress: "En progreso",
    completed: "Completada",
    cancelled: "Cancelada",
  }[columnId] || "Columna";

  return (
    <div className={`${styles.kanbanColumn} ${columnaColor}`}>
      <h3 className={styles.tituloColumna}>
        {tituloColumna} <span className={styles.count}>{tasks.length}</span>
      </h3>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            className={styles.kanbanList}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, idx) => (
              <Draggable key={task.id} draggableId={String(task.id)} index={idx}>
                {(prov) => (
                  <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                    <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
