import React from "react";
import { FaTasks, FaFilter, FaChartBar, FaUserFriends } from "react-icons/fa";
import "../css/Home.css";

export default function Home() {
  const features = [
    {
      icon: <FaTasks />,
      title: "Crear Tareas",
      description: "Agrega nuevas tareas con prioridad, categoría y fecha límite.",
      color: "red",
    },
    {
      icon: <FaFilter />,
      title: "Organizar y Filtrar",
      description: "Filtra tus tareas por estado y busca rápidamente por título.",
      color: "green",
    },
    {
      icon: <FaChartBar />,
      title: "Dashboard Visual",
      description: "Visualiza tus tareas por estado y prioridad con gráficos interactivos.",
      color: "blue",
    },
    {
      icon: <FaUserFriends />,
      title: "Gestión de Usuarios",
      description: "Cada usuario puede tener sus propias tareas y cuentas seguras.",
      color: "yellow",
    },
  ];

  const testimonials = [
    {
      name: "Carlos M.",
      feedback: "Esta app me ayudó a organizar todas mis tareas y proyectos diarios.",
    },
    {
      name: "Laura R.",
      feedback: "Me encanta la interfaz, es clara y fácil de usar.",
    },
    {
      name: "Javier T.",
      feedback: "Ahora puedo priorizar mis tareas y no se me escapa nada.",
    },
  ];

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <h1>Bienvenido a Todo App</h1>
        <p>Organiza tus tareas de forma rápida, sencilla y eficiente.</p>
        <a href="/register" className="btn-primary">
          Comenzar Ahora
        </a>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Nuestras Funcionalidades</h2>
        <div className="features-grid">
          {features.map((f, idx) => (
            <div key={idx} className={`feature-card feature-${f.color}`}>
              <div className="icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Carrusel/Testimonios */}
      <section className="testimonials">
        <h2>Qué dicen nuestros usuarios</h2>
        <div className="carousel">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <p>"{t.feedback}"</p>
              <span>- {t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Empieza a organizar tu vida hoy</h2>
        <p>Regístrate y descubre lo fácil que es gestionar tus tareas.</p>
        <a href="/register" className="btn-primary">
          Registrarse
        </a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Todo App. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
