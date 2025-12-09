import React, { useState } from "react";
import { useTasksState, useTasksActions } from "../context/TasksContext";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import TaskCard from "../components/TaskCard";
import "../css/ListView.module.css";

export default function ListView() {
  const { tasks } = useTasksState();
  const { load, create, edit, remove } = useTasksActions();
  const [editing, setEditing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleSave = async (payload) => {
    if (editing) {
      await edit(editing.id, payload);
      setEditing(null);
    } else {
      await create(payload);
    }
    await load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Eliminar tarea?")) return;
    await remove(id);
    await load();
  };

  const handleEdit = (task) => setEditing(task);

  const handleSearch = (q) => setSearchQuery(q);

  const handleQuickFilter = (status) => setFilterStatus(status);

  const handleClearFilters = () => {
    setSearchQuery("");
    setFilterStatus("");
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesQuery = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus ? task.status === filterStatus : true;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="page list-page">
      <div className="list-controls">
        <TaskForm
          onSave={handleSave}
          editing={editing}
          onCancel={() => setEditing(null)}
        />
        <TaskFilters
          onSearch={handleSearch}
          onQuickFilter={handleQuickFilter}
          onClear={handleClearFilters}
          activeFilter={filterStatus} // <--- aquí se pasa el filtro activo
        />
      </div>

      <div className="list-results grid-two">
        {filteredTasks.length === 0 ? (
          <p>No hay tareas</p>
        ) : (
          filteredTasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
