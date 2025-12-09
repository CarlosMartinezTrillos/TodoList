import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaExclamationCircle, FaEnvelope, FaLock } from "react-icons/fa";
import styles from "../css/AuthForm.module.css"; // tu CSS existente

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false); // evita doble submit

  // Validación de inputs
  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = "El email es obligatorio";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Email no válido";

    if (!password.trim()) errs.password = "La contraseña es obligatoria";
    else if (password.length < 6) errs.password = "La contraseña debe tener al menos 6 caracteres";

    return errs;
  };

  // Submit del formulario
  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setServerError(null);
    setLoading(true);

    try {
      await login(email, password); // llama al AuthContext y guarda token
      navigate("/dashboard");       // redirige al dashboard
    } catch (err) {
      setServerError(err.response?.data?.detail || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <form className={styles.authForm} onSubmit={submit}>
        <h2>Iniciar Sesión</h2>

        {/* Email */}
        <div className={styles.inputGroup}>
          <label>Email</label>
          <div className={styles.inputWrapper}>
            <FaEnvelope className={styles.icon} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? styles.errorInput : ""}
            />
          </div>
          {errors.email && (
            <span className={styles.errorMsg}>
              <FaExclamationCircle /> {errors.email}
            </span>
          )}
        </div>

        {/* Contraseña */}
        <div className={styles.inputGroup}>
          <label>Contraseña</label>
          <div className={styles.inputWrapper}>
            <FaLock className={styles.icon} />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? styles.errorInput : ""}
            />
          </div>
          {errors.password && (
            <span className={styles.errorMsg}>
              <FaExclamationCircle /> {errors.password}
            </span>
          )}
        </div>

        {/* Botón */}
        <button type="submit" className={styles.btnPrimary} disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>

        {/* Error de servidor */}
        {serverError && <p className={styles.serverError}>{serverError}</p>}
      </form>
    </div>
  );
}
