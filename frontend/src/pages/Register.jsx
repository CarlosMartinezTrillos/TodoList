import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaExclamationCircle, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import styles from "../css/AuthForm.module.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false); // evita doble submit

  // Validación de inputs
  const validate = () => {
    const errs = {};

    if (!name.trim()) errs.name = "El nombre completo es obligatorio";

    if (!email.trim()) errs.email = "El email es obligatorio";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Email no válido";

    if (!password.trim()) errs.password = "La contraseña es obligatoria";
    else if (password.length < 6) errs.password = "Debe tener al menos 6 caracteres";

    if (!confirmPassword.trim()) errs.confirmPassword = "Confirme su contraseña";
    else if (password !== confirmPassword) errs.confirmPassword = "Las contraseñas no coinciden";

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
      await register(name, email, password); // registra usuario
      navigate("/login");                     // ✅ redirige al login en vez del dashboard
    } catch (err) {
      setServerError(err.response?.data?.detail || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <form className={styles.authForm} onSubmit={submit}>
        <h2>Registro</h2>

        {/* Nombre completo */}
        <div className={styles.inputGroup}>
          <label>Nombre completo</label>
          <div className={styles.inputWrapper}>
            <FaUser className={styles.icon} />
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? styles.errorInput : ""}
            />
          </div>
          {errors.name && (
            <span className={styles.errorMsg}>
              <FaExclamationCircle /> {errors.name}
            </span>
          )}
        </div>

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

        {/* Confirmar contraseña */}
        <div className={styles.inputGroup}>
          <label>Confirmar Contraseña</label>
          <div className={styles.inputWrapper}>
            <FaLock className={styles.icon} />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? styles.errorInput : ""}
            />
          </div>
          {errors.confirmPassword && (
            <span className={styles.errorMsg}>
              <FaExclamationCircle /> {errors.confirmPassword}
            </span>
          )}
        </div>

        {/* Botón */}
        <button type="submit" className={styles.btnPrimary} disabled={loading}>
          {loading ? "Cargando..." : "Registrarse"}
        </button>

        {/* Error de servidor */}
        {serverError && <p className={styles.serverError}>{serverError}</p>}
      </form>
    </div>
  );
}
