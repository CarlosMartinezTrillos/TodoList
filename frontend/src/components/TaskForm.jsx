import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt, FaExclamationCircle } from "react-icons/fa";
import styles from "../css/TaskForm.module.css";

const defaultForm = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  due_date: "",
  category: "general",
};

const validStatus = ["pending", "in_progress", "completed", "cancelled"];
const validPriority = ["high", "medium", "low"];

export default function TaskForm({ onSave, editing, onCancel }) {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title ?? "",
        description: editing.description ?? "",
        status: editing.status ?? "pending",
        priority: editing.priority ?? "medium",
        due_date: editing.due_date ?? "",
        category: editing.category ?? "general",
      });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
  }, [editing]);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "El título es obligatorio";
    else if (form.title.length > 50) errs.title = "Máximo 50 caracteres";

    if (form.description.length > 200)
      errs.description = "Máximo 200 caracteres";

    if (form.due_date) {
      const fechaHoy = new Date(new Date().toISOString().split("T")[0]);
      const fechaForm = new Date(form.due_date);
      if (fechaForm < fechaHoy) errs.due_date = "La fecha no puede ser menor al día actual";
    }

    return errs;
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      status: validStatus.includes(form.status) ? form.status : "pending",
      priority: validPriority.includes(form.priority) ? form.priority : "medium",
      due_date: form.due_date || null,
      category: form.category.trim() || "general",
    };

    onSave(payload);

    setForm(defaultForm);
    setErrors({});
    setAlert("Tarea guardada con éxito!");
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <>
      {alert && <div className={styles.alert}>{alert}</div>}

      <form className={styles.taskForm} onSubmit={submit}>
        <div className={styles.inputGroup}>
          <label>Título</label>
          <input
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handle}
            className={errors.title ? styles.errorInput : ""}
            maxLength={50}
            required
          />
          {errors.title && (
            <span className={styles.errorMsg}>
              <FaExclamationCircle /> {errors.title}
            </span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label>Descripción</label>
          <textarea
            name="description"
            placeholder="Descripción"
            value={form.description}
            onChange={handle}
            className={errors.description ? styles.errorInput : ""}
            maxLength={200}
          />
          {errors.description && (
            <span className={styles.errorMsg}>
              <FaExclamationCircle /> {errors.description}
            </span>
          )}
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Status</label>
            <select name="status" value={form.status} onChange={handle}>
              <option value="pending">Pendiente</option>
              <option value="in_progress">En progreso</option>
              <option value="completed">Completada</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Prioridad</label>
            <select name="priority" value={form.priority} onChange={handle}>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>
              Fecha <FaRegCalendarAlt />
            </label>
            <input
              type="date"
              name="due_date"
              value={form.due_date ?? ""}
              onChange={handle}
              className={errors.due_date ? styles.errorInput : ""}
            />
            {errors.due_date && (
              <span className={styles.errorMsg}>
                <FaExclamationCircle /> {errors.due_date}
              </span>
            )}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Categoría</label>
          <input
            name="category"
            placeholder="Categoría"
            value={form.category}
            onChange={handle}
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={`${styles.btn} ${styles.primary}`}>
            Guardar
          </button>
          {editing && (
            <button
              type="button"
              onClick={onCancel}
              className={`${styles.btn} ${styles.ghost}`}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </>
  );
}
