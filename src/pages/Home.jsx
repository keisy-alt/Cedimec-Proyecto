import React from "react";
import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const navigate = useNavigate(); // Hook para navegar
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = () => {
    // Aquí puedes implementar la lógica de autenticación
    if (username === "admin" && password === "admin123") {
      navigate("/AdminPanel");
    } else {
      // Login fallido
      if (username === "recep" && password === "recep123") {
        navigate("/TurnosRep");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    }
  };
  return (
    <div className="cedimec-container">
      <div className="login-link">
        <button
          className="iniciar-sesion-link"
          onClick={() => setShowModal(true)}
        >
          Iniciar Sesión
        </button>
      </div>

      <div className="cedimec-content">
        <h1 className="cedimec-title">CEDIMEC</h1>

        <div className="cedimec-buttons">
          <button
            className="cedimec-button"
            onClick={() => {
              navigate("/generarTurno");
            }}
          >
            Generar turno
          </button>

          <button
            className="cedimec-button"
            onClick={() => {
              navigate("/VistaTurnos");
            }}
          >
            Lista de espera
          </button>
        </div>
      </div>

      {/* Modal de inicio de sesión */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Iniciar Sesión</h2>
              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleLogin}>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                  <label htmlFor="username">Usuario:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="login-button">
                    Ingresar
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
