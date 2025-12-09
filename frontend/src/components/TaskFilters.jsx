import React, { useState } from "react";
import styles from "../css/TaskFilters.module.css"; // ajusta según tu archivo CSS

export default function TaskFilters({ onSearch, onQuickFilter, loading, noResults, activeFilter }) {
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSearch(q);
  };

  const clearSearch = () => {
    setQ("");
    onSearch("");
  };

  const clearFilter = () => {
    onQuickFilter(""); // limpia el filtro rápido activo
  };

  return (
    <div className={styles.filters}>
      <form onSubmit={submit} className={styles.searchForm}>
        <div className={styles.inputWrapper}>
          <input
            placeholder="Buscar por título..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {q && (
            <span className={styles.clearX} onClick={clearSearch}>
              ×
            </span>
          )}
        </div>
        <button className={`${styles.btn} ${styles.small}`}>Buscar</button>
      </form>

      <div className={styles.quick}>
        <div className={styles.filterItem}>
          <button
            className={`${styles.btn} ${styles.small}`}
            onClick={() => onQuickFilter("pending")}
          >
            Pendientes
          </button>
          {activeFilter === "pending" && (
            <span className={styles.clearX} onClick={clearFilter}>×</span>
          )}
        </div>

        <div className={styles.filterItem}>
          <button
            className={`${styles.btn} ${styles.small}`}
            onClick={() => onQuickFilter("in_progress")}
          >
            En progreso
          </button>
          {activeFilter === "in_progress" && (
            <span className={styles.clearX} onClick={clearFilter}>×</span>
          )}
        </div>

        <div className={styles.filterItem}>
          <button
            className={`${styles.btn} ${styles.small}`}
            onClick={() => onQuickFilter("completed")}
          >
            Completadas
          </button>
          {activeFilter === "completed" && (
            <span className={styles.clearX} onClick={clearFilter}>×</span>
          )}
        </div>
      </div>

      {/* -------------------------------
          Indicadores de carga o no resultados
      ---------------------------------- */}
      <div className={styles.status}>
        {loading && <div className={styles.spinner}></div>}
        {!loading && noResults && <div className={styles.noResults}>No se encontraron tareas</div>}
      </div>
    </div>
  );
}
