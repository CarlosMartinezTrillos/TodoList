import React, { useMemo } from "react";
import { useTasksState } from "../context/TasksContext";
import "../css/Dashboard.css";

export default function Dashboard() {
  const { tasks } = useTasksState();

  const resumen = useMemo(() => {
    const porEstado = tasks.reduce((acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {});
    const porPrioridad = tasks.reduce((acc, t) => {
      acc[t.priority] = (acc[t.priority] || 0) + 1;
      return acc;
    }, {});
    return { porEstado, porPrioridad };
  }, [tasks]);

  const totalTareas = tasks.length;

  const porcentaje = (valor, total) => (total === 0 ? 0 : Math.min(100, Math.round((valor / total) * 100)));

  const estadoColors = {
    pending: "#ffd966",
    in_progress: "#236AB9",
    completed: "#4caf50",
    cancelled: "#e04545",
  };

  let acumulado = 0;
  const pastelEstilos = Object.entries(resumen.porEstado).map(([estado, cantidad]) => {
    const start = acumulado;
    const end = acumulado + (cantidad / totalTareas) * 360;
    acumulado = end;
    return `${estadoColors[estado]} ${start}deg ${end}deg`;
  }).join(", ");

  return (
    <div className="page dashboard">
      <h2>Tablero de Tareas</h2>
      <div className="cards">

        {/* Gráfico de Pastel */}
        <div className="card pie-card">
          <h3>Distribución por Estado</h3>
          {totalTareas > 0 ? (
            <>
              <div className="pie-chart-wrapper">
                <div
                  className="pie-chart"
                  style={{ background: `conic-gradient(${pastelEstilos})` }}
                ></div>
                <div className="pie-center">{totalTareas}</div>
              </div>

              {/* Leyenda debajo */}
              <div className="pie-legend">
                {Object.entries(resumen.porEstado).map(([estado, cantidad]) => (
                  <div key={estado} className="legend-item">
                    <span
                      className="legend-color"
                      style={{ backgroundColor: estadoColors[estado] }}
                    ></span>
                    <span className="legend-label">
                      {estado.charAt(0).toUpperCase() + estado.slice(1)}: {cantidad}
                    </span>
                  </div>
                ))}
                <div className="legend-total">
                  <strong>Total: {totalTareas}</strong>
                </div>
              </div>
            </>
          ) : (
            <p>No hay tareas</p>
          )}
        </div>

        {/* Barras por Prioridad */}
        <div className="card">
          <h3>Por Prioridad</h3>
          {Object.entries(resumen.porPrioridad).map(([prioridad, cantidad]) => (
            <div key={prioridad} className="bar-container">
              <span className="bar-label">{prioridad.charAt(0).toUpperCase() + prioridad.slice(1)}</span>
              <div className="bar-background">
                <div
                  className={`bar-fill ${prioridad}`}
                  style={{ width: `${porcentaje(cantidad, totalTareas)}%` }}
                >
                  {cantidad}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
