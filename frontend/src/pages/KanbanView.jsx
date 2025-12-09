import React, { useMemo, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useTasksState, useTasksActions } from "../context/TasksContext";
import KanbanColumn from "../components/KanbanColumn";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import styles from "../css/KanbanView.module.css";

export default function KanbanView() {
  const { tasks } = useTasksState();
  const { load, edit, create, remove } = useTasksActions();
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Filtro de búsqueda y estado
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesQuery = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus ? task.status === filterStatus : true;
      return matchesQuery && matchesStatus;
    });
  }, [tasks, searchQuery, filterStatus]);

  // Columnas siempre presentes aunque no tengan tareas
  const columns = useMemo(() => ({
    pending: filteredTasks.filter(t => t.status === "pending"),
    in_progress: filteredTasks.filter(t => t.status === "in_progress"),
    completed: filteredTasks.filter(t => t.status === "completed"),
    cancelled: filteredTasks.filter(t => t.status === "cancelled"),
  }), [filteredTasks]);

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const taskId = result.draggableId;
    const destCol = result.destination.droppableId;
    const task = tasks.find(t => String(t.id) === String(taskId));
    if (!task) return;

    const updated = { ...task, status: destCol };
    await edit(task.id, {
      title: updated.title,
      description: updated.description,
      status: updated.status,
      priority: updated.priority,
      due_date: updated.due_date,
      category: updated.category,
    });
    await load();
  };

  const handleSave = async (payload) => {
    if (editing) {
      await edit(editing.id, payload);
      setEditing(null);
    } else {
      await create(payload);
    }
    await load();
  };

  const handleEdit = (task) => setEditing(task);
  const handleDelete = async (id) => {
    if (!confirm("Eliminar tarea?")) return;
    await remove(id);
    await load(); // recarga tareas después de eliminar
  };

  const handleSearch = (q) => setSearchQuery(q);

  const handleQuickFilter = (status) => {
    setFilterStatus(status);
  };

  // Limpiar búsqueda y filtros
  const handleClearFilters = async () => {
    setSearchQuery("");
    setFilterStatus("");
    setEditing(null);
    await load();
  };

  return (
    <div className={styles.container}>
      <div className={styles.filtersWrapper}>
        <TaskFilters
          onSearch={handleSearch}
          onQuickFilter={handleQuickFilter}
          onClear={handleClearFilters}
          activeFilter={filterStatus} // <--- pasamos el filtro activo
        />
      </div>

      <div className={styles.mainContent}>
        <div className={styles.leftPane}>
          <TaskForm onSave={handleSave} editing={editing} onCancel={() => setEditing(null)} />
        </div>

        <div className={styles.rightPane}>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.kanbanBoard}>
              {Object.entries(columns).map(([colId, tasksInCol]) => (
                <KanbanColumn
                  key={colId}
                  columnId={colId}
                  title={colId.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())}
                  tasks={tasksInCol}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
