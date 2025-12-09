import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../css/Navbar.module.css";
import { useAuth } from "../context/AuthContext"; // contexto de usuario

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirige a home al cerrar sesión
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <h1 className={styles.brand}>Mis Tareas</h1>

        <div className={styles.navLinks}>
          {!user ? (
            <>
              <NavLink 
                to="/login"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Iniciar Sesión
              </NavLink>

              <NavLink 
                to="/register"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Registrarse
              </NavLink>
            </>
          ) : (
            <>
              <NavLink 
                to="/kanban"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Kanban
              </NavLink>

              <NavLink 
                to="/list"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Lista
              </NavLink>

              <NavLink 
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                Tablero
              </NavLink>

              <button 
                onClick={handleLogout} 
                className={`${styles.link} ${styles.logoutButton}`}
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
